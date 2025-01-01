"use client"
import { useState, useEffect } from 'react';
import { DailyPlan, getUserDataByEmail, MealPlan, Plan, saveFitnessPlan, calculateWeeklyIntake } from '@/lib/firebase/firebaseDb';
import { auth, db } from '@/lib/firebase/config';
import { CohereClient } from 'cohere-ai';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

// The API key should be in environment variables
const cohere = new CohereClient({
    token: "MEjWAKX9UH75w4RPSZpSvJrziJbYDwREgEu5Qear",
});

const parseMealFromText = (text: string): { title: string; description: string } => {
    const [title, ...descriptionParts] = text.split(':').map(s => s.trim());
    return {
        title: title || '',
        description: descriptionParts.join(':').trim()
    };
};

const parseMealsFromText = (text: string): MealPlan => {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const mealPlan: MealPlan = {
        breakfast: { title: '', description: '' },
        lunch: { title: '', description: '' },
        dinner: { title: '', description: '' },
        snacks: []
    };

    let currentSection = '';
    lines.forEach(line => {
        if (line.toLowerCase().startsWith('breakfast')) {
            currentSection = 'breakfast';
            mealPlan.breakfast = parseMealFromText(line.substring(9));
        } else if (line.toLowerCase().startsWith('lunch')) {
            currentSection = 'lunch';
            mealPlan.lunch = parseMealFromText(line.substring(6));
        } else if (line.toLowerCase().startsWith('dinner')) {
            currentSection = 'dinner';
            mealPlan.dinner = parseMealFromText(line.substring(7));
        } else if (line.toLowerCase().includes('snack')) {
            mealPlan.snacks.push(parseMealFromText(line));
        }
    });

    return mealPlan;
};

const parseExercisesFromText = (text: string): Array<{ title: string; description: string }> => {
    if (!text) return [];

    return text.split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .map(exercise => {
            const [title, ...descriptionParts] = exercise.split(':').map(s => s.trim());
            return {
                title: title || '',
                description: descriptionParts.join(':').trim() || exercise
            };
        });
};

const parsePlanFromText = (text: string, email: string, bmi: number): Plan => {
    const dayRegex = /Day (\d+):([\s\S]*?)(?=Day \d+:|$)/g;
    const days: DailyPlan[] = [];
    let match;

    while ((match = dayRegex.exec(text)) !== null) {
        const [, dayNumber, content] = match;
        const [mealsText, exercisesText] = content.split(/Exercise:/i);

        days.push({
            dayNumber: parseInt(dayNumber),
            meals: parseMealsFromText(mealsText),
            exercises: parseExercisesFromText(exercisesText),
            additionalInfo: []
        });
    }

    // Ensure we have 7 days
    while (days.length < 7) {
        days.push({
            dayNumber: days.length + 1,
            meals: {
                breakfast: { title: '', description: '' },
                lunch: { title: '', description: '' },
                dinner: { title: '', description: '' },
                snacks: []
            },
            exercises: [],
            additionalInfo: []
        });
    }

    // Calculate weekly intake based on BMI
    const weeklyIntake = calculateWeeklyIntake(bmi);

    return {
        email,
        days,
        weeklyIntake,
        createdAt: new Date(),
        lastUpdated: new Date()
    };
};

const getEmail = (): string | null => {
    const user = auth.currentUser;
    if (user?.email) return user.email;

    if (typeof window === 'undefined') return null;

    try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const parsed = JSON.parse(userInfo);
            if (parsed.email) return parsed.email;
        }

        const user_info = localStorage.getItem("user_info");
        if (user_info) {
            const parsed = JSON.parse(user_info);
            if (parsed.email) return parsed.email;
        }
    } catch (e) {
        console.error('Error parsing stored data:', e);
    }

    return null;
};


export async function PlanGenerator(): Promise<boolean> {
    const email = getEmail();

    if (!email) {
        toast.error('Please log in to generate a plan');
        return false;
    }

    try {
        const userData = await getUserDataByEmail(email);
        if (!userData) {
            toast.error("Please complete your profile first");
            return false;
        }

        const prompt = `Create a detailed 7-day fitness plan for a ${userData.age}-year-old ${userData.gender} with BMI ${userData.bmi.toFixed(1)} (${userData.bmiCategory}). Goal: ${userData.mainGoal}. Training level: ${userData.trainingLevel}. Preferred activities: ${userData.activities.join(', ')}.

        Format for each day:
        Day [1-7]:
        Breakfast: [Meal Name]: [Detailed description including portions]
        Morning Snack: [Snack Name]: [Description]
        Lunch: [Meal Name]: [Detailed description including portions]
        Afternoon Snack: [Snack Name]: [Description]
        Dinner: [Meal Name]: [Detailed description including portions]
        Exercise:
        [Exercise Name 1]: [Detailed description including sets, reps, or duration]
        [Exercise Name 2]: [Detailed description including sets, reps, or duration]
        [Exercise Name 3]: [Detailed description including sets, reps, or duration]
        [Exercise Name 4]: [Detailed description including sets, reps, or duration]
        [Continue with 5-6 more exercises]
Include any necessary rest periods or additional information as separate items.
        `;

        const response = await cohere.generate({
            model: 'command',
            prompt: prompt,
            maxTokens: 70000,
            temperature: 0.7,
        });

        const generatedText = response.generations[0].text;
        const parsedPlan = parsePlanFromText(generatedText, email, userData.bmi);
        await saveFitnessPlan(email, parsedPlan);

        return true;
    } catch (err: any) {
        console.error('Error generating or saving plan:', err);
        toast.error(err.message || 'Failed to generate or save plan');
        return false;
    }
}

