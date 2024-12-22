"use client"
import { useState, useEffect } from 'react';
import { DailyPlan, getUserDataByEmail, Plan } from '@/lib/firebase/firebaseDb';
import { auth, db } from '@/lib/firebase/config';
import { CohereClient } from 'cohere-ai';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

// The API key should be in environment variables
const cohere = new CohereClient({
    token: "MEjWAKX9UH75w4RPSZpSvJrziJbYDwREgEu5Qear",
});

export async function PlanGenerator(): Promise<boolean> {
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

    const parsePlanFromText = (text: string, email: string): Plan => {
        const dayRegex = /Day (\d+):([\s\S]*?)(?=Day \d+:|$)/g;
        const days: DailyPlan[] = [];
        let match;

        while ((match = dayRegex.exec(text)) !== null) {
            const [, , content] = match;
            const [meals, exercises] = content.split(/Exercise:/i);
            days.push({
                meals: meals.trim(),
                exercises: exercises ? exercises.trim() : '',
            });
        }

        return {
            email,
            days,
            proteinIntake: parseInt(text.match(/Protein: (\d+)g/)?.[1] || '0'),
            carboIntake: parseInt(text.match(/Carbs: (\d+)g/)?.[1] || '0'),
            fatIntake: parseInt(text.match(/Fat: (\d+)g/)?.[1] || '0'),
            waterIntake: parseInt(text.match(/Water: (\d+)ml/)?.[1] || '0'),
            calorieIntake: parseInt(text.match(/Calories: (\d+)kcal/)?.[1] || '0'),
            createdAt: new Date(),
        };
    };

    const savePlanToFirebase = async (plan: Plan): Promise<void> => {
        try {
            const planDocRef = doc(db, "fitness_plan", plan.email);
            await setDoc(planDocRef, plan);
            toast.success("Plan saved successfully!");
        } catch (error) {
            console.error("Error saving plan to Firebase:", error);
            toast.error("Failed to save plan. Please try again.");
            throw error;
        }
    };

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

        const prompt = `Generate a 6-day meal plan and daily exercise routine for a ${userData.age}-year-old ${userData.gender} with a BMI of ${userData.bmi.toFixed(1)} (${userData.bmiCategory}). Their main goal is ${userData.mainGoal}, and their training level is ${userData.trainingLevel}. Include daily protein, carb, fat, water, and calorie intake recommendations.

        Format the response as follows:
        Day 1: [Meals for day 1]
        Exercise: [Exercises for day 1]
        Day 2: [Meals for day 2]
        Exercise: [Exercises for day 2]
        Day 3: [Meals for day 3]
        Exercise: [Exercises for day 3]
        Day 4: [Meals for day 4]
        Exercise: [Exercises for day 4]
        Day 5: [Meals for day 5]
        Exercise: [Exercises for day 5]
        Day 6: [Meals for day 6]
        Exercise: [Exercises for day 6]
        
        Daily Intake:
        Protein: [X]g
        Carbs: [X]g
        Fat: [X]g
        Water: [X]ml
        Calories: [X]kcal`;

        const response = await cohere.generate({
            model: 'command',
            prompt: prompt,
            maxTokens: 10000,
            temperature: 0.7,
        });

        const generatedText = response.generations[0].text;
        const parsedPlan = parsePlanFromText(generatedText, email);

        await savePlanToFirebase(parsedPlan);
        return true;
    } catch (err: any) {
        console.error('Error generating or saving plan:', err);
        toast.error(err.message || 'Failed to generate or save plan. Please try again later.');
        return false;
    }
}

