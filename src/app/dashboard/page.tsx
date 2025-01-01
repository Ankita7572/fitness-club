"use client"

import { Card, CardContent } from "@/components/ui/card"
import LayoutPage from "./LayoutPage"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Droplet, FlameIcon as Fire, Loader2, Scale } from 'lucide-react'
import { ActivityCard } from "./activity-card"
import { auth } from "@/lib/firebase/config"
import { getFitnessPlan, Plan } from "@/lib/firebase/firebaseDb"
import { useEffect, useState } from "react"
import { SevenDayPlan } from "./SevenDayPlan"
import { PlanGenerator } from "./plan-generator"
import { useAuthState } from 'react-firebase-hooks/auth';
export default function DashboardPage() {
    const [user, loading, authError] = useAuthState(auth);
    const [plan, setPlan] = useState<Plan | null>(null);
    const [planLoading, setPlanLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

    useEffect(() => {
        async function fetchOrGeneratePlan() {
            if (loading) return;

            let email = user?.email;

            if (!email) {
                const storageKeys = ["userInfo", "user_info"];
                for (const key of storageKeys) {
                    const storedInfo = localStorage.getItem(key);
                    if (storedInfo) {
                        const parsed = JSON.parse(storedInfo);
                        email = parsed.email;
                        if (email) break;
                    }
                }
            }

            if (email) {
                try {
                    let fetchedPlan = await getFitnessPlan(email);
                    if (!fetchedPlan) {
                        setIsGeneratingPlan(true);
                        await PlanGenerator();
                        fetchedPlan = await getFitnessPlan(email);
                        setIsGeneratingPlan(false);
                    }
                    setPlan(fetchedPlan);
                } catch (err) {
                    setError("Failed to fetch or generate fitness plan. Please try again later.");
                    console.error("Error fetching or generating fitness plan:", err);
                } finally {
                    setPlanLoading(false);
                }
            } else {
                setError("No user email found. Please log in.");
                setPlanLoading(false);
            }
        }

        fetchOrGeneratePlan();
    }, [user, loading]);

    if (loading || planLoading || isGeneratingPlan) {
        return (
            <LayoutPage>
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <div className="text-2xl font-semibold">
                        {isGeneratingPlan ? "Generating your fitness plan..." : "Loading your fitness data..."}
                    </div>
                </div>
            </LayoutPage>
        );
    }

    if (authError) {
        return (
            <LayoutPage>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-2xl font-semibold text-red-500">Authentication error. Please try logging in again.</div>
                </div>
            </LayoutPage>
        );
    }

    if (error) {
        return (
            <LayoutPage>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-2xl font-semibold text-red-500">{error}</div>
                </div>
            </LayoutPage>
        );
    }

    if (!plan) {
        return (
            <LayoutPage>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-2xl font-semibold">No fitness plan found. Please generate a plan first.</div>
                </div>
            </LayoutPage>
        );
    }

    const weeklyIntake = plan.weeklyIntake;
    const dailyIntake = {
        calories: Math.round(weeklyIntake.calories / 7),
        protein: Math.round(weeklyIntake.protein / 7),
        carbs: Math.round(weeklyIntake.carbs / 7),
        fat: Math.round(weeklyIntake.fat / 7),
        water: Math.round(weeklyIntake.water / 7)
    };

    return (
        <LayoutPage>
            <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6">
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                    {/* Body Overview Card */}
                    <Card className="p-4 md:p-6 bg-zinc-900 text-white rounded-3xl">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Body Overview</h2>
                        <div className="mb-4 md:mb-6">
                            <div className="text-[#51acee] mb-2 text-sm md:text-base">Your daily calorie target</div>
                            <div className="text-gray-400 text-sm">Recommended intake</div>
                            <div className="text-2xl md:text-4xl font-bold mt-2">{dailyIntake.calories} kcal</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {(() => {
                                const total = dailyIntake.protein + dailyIntake.carbs + dailyIntake.fat;
                                return [
                                    { label: "Protein", value: (dailyIntake.protein / total) * 100, actual: dailyIntake.protein, color: "sky" },
                                    { label: "Carbs", value: (dailyIntake.carbs / total) * 100, actual: dailyIntake.carbs, color: "yellow" },
                                    { label: "Fat", value: (dailyIntake.fat / total) * 100, actual: dailyIntake.fat, color: "red" }
                                ];
                            })().map((item, index) => (
                                <div key={index} className="text-center">
                                    <CircularProgress
                                        value={parseFloat(item.value.toFixed(2))}
                                        color={item.color as "sky" | "yellow" | "red"}
                                        showValue
                                        size="lg"
                                    // Show percentage inside the circle
                                    />
                                    <div className="mt-1 md:mt-2 text-xs md:text-sm">
                                        {item.label}: {item.actual}g
                                    </div>
                                </div>
                            ))}
                        </div>


                    </Card>

                    {/* Daily Targets */}
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-lg md:text-xl font-semibold">My Daily Target</h2>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {[
                                { icon: Droplet, label: "Water", value: `${dailyIntake.water} ml`, subLabel: "Daily Target" },
                                { icon: Fire, label: "Calories", value: `${dailyIntake.calories} kCal`, subLabel: "Daily Target" },
                                { icon: Scale, label: "Protein", value: `${dailyIntake.protein}g`, subLabel: "Daily Target" },
                            ].map((item, index) => (
                                <Card key={index} className="p-3 md:p-4 rounded-3xl">
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="p-2 rounded-full bg-gray-100">
                                            <item.icon className="h-4 w-4 md:h-5 md:w-5 text-[#257ebe]" />
                                        </div>
                                        <div>
                                            <div className="text-xs md:text-sm text-gray-500">{item.label}</div>
                                            <div className="text-sm md:text-base font-semibold">{item.value}</div>
                                            <div className="text-xs text-gray-500">{item.subLabel}</div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 7-Day Plan Display */}
                <SevenDayPlan plan={plan} />

                {/* New Activity Section */}
                <div className="mt-6 md:mt-8">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <h2 className="text-lg md:text-xl font-semibold">New Activity</h2>
                        <button className="text-xs md:text-sm invisible text-gray-500">See All Suggestions</button>
                    </div>
                    <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                        <ActivityCard
                            title="Motivational Music"
                            description="Lift your spirits with music that inspires and energizes your day!"
                            image="/img/dashboard/music.webp"
                            className="bg-[#008DDA] text-white"
                            link="/fitness-music"
                        />
                        <ActivityCard
                            title="Daily Exercise"
                            description="A simple daily workout to keep you fit and full of energy."
                            image="/img/dashboard/exercise.webp"
                            className="bg-[#41C9E2]"
                            link="#"
                        />
                        <ActivityCard
                            title="Consultant Expert Physiotherapist "
                            description="Connect with experts for personalized care and effective recovery solutions"
                            image="/img/dashboard/consultant.webp"
                            className="bg-[#ACE2E1] text-black"
                            link="/consultancy"
                        />
                    </div>
                </div>
            </div>
        </LayoutPage>
    )
}

