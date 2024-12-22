"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LayoutPage from "./LayoutPage"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Droplet, FlameIcon as Fire, Loader2, Scale } from 'lucide-react'
import { ActivityCard } from "./activity-card"
import { auth } from "@/lib/firebase/config"
import { getFitnessPlan, Plan } from "@/lib/firebase/firebaseDb"
import { useEffect, useState } from "react"
import { SixDayPlanDisplay } from "./SixDayPlanDisplay"
import Image from "next/image"
import { PlanGenerator } from "./plan-generator"


export default function DashboardPage() {
    const [plan, setPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

    useEffect(() => {
        async function fetchOrGeneratePlan() {
            const user = auth.currentUser;
            let email = user?.email;

            if (!email) {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo) {
                    const parsed = JSON.parse(userInfo);
                    email = parsed.email;
                }

                if (!email) {
                    const user_info = localStorage.getItem("user_info");
                    if (user_info) {
                        const parsed = JSON.parse(user_info);
                        email = parsed.email;
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
                    setLoading(false);
                }
            } else {
                setError("No user email found. Please log in.");
                setLoading(false);
            }
        }

        fetchOrGeneratePlan();
    }, []);

    if (loading || isGeneratingPlan) {
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
                            <div className="text-2xl md:text-4xl font-bold mt-2">1450 kcal</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {[
                                { label: "Protein", value: plan.proteinIntake, color: "sky" },
                                { label: "Carbs", value: plan.carboIntake, color: "yellow" },
                                { label: "Fat", value: plan.fatIntake, color: "red" }
                            ].map((item, index) => (
                                <div key={index} className="text-center">
                                    <CircularProgress
                                        value={item.value}
                                        color={item.color as "sky" | "yellow" | "red"}
                                        showValue
                                        size="lg"
                                    />
                                    <div className="mt-1 md:mt-2 text-xs md:text-sm">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Daily Targets */}
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-lg md:text-xl font-semibold">My Daily Target</h2>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {[
                                { icon: Droplet, label: "Water", value: `2956 ml`, subLabel: "Daily Target" },
                                { icon: Fire, label: "Calories", value: `1847 kCal`, subLabel: "Daily Target" },
                                { icon: Scale, label: "Protein", value: `${plan.proteinIntake}g`, subLabel: "Daily Target" },
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

                {/* 6-Day Plan Display */}
                <SixDayPlanDisplay plan={plan} />

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
                            image="/img/dashboard/music.jpg"
                            className="bg-[#008DDA] text-white"
                            link="/fitness-music"
                        />
                        <ActivityCard
                            title="Daily Exercise"
                            description="A simple daily workout to keep you fit and full of energy."
                            image="/img/dashboard/exercise.jpg"
                            className="bg-[#41C9E2]"
                            link="#"
                        />
                        <ActivityCard
                            title="Consultant Expert Physiotherapist "
                            description="Connect with experts for personalized care and effective recovery solutions"
                            image="/img/dashboard/consultant.jpg"
                            className="bg-[#ACE2E1] text-black"
                            link="/consultancy"
                        />
                    </div>
                </div>
            </div>
        </LayoutPage>
    )
}

