
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LayoutPage from "./LayoutPage"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Droplet, Heart, FlameIcon as Fire, Scale } from "lucide-react"
import { ActivityCard } from "./activity-card"





export default function DashboardPage() {
    return (
        <LayoutPage>
            <div className="max-w-7xl mx-auto">
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                    {/* Body Overview Card */}
                    <Card className="p-4 md:p-6 bg-zinc-900 text-white rounded-3xl">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Body Overview</h2>
                        <div className="mb-4 md:mb-6">
                            <div className="text-[#51acee] mb-2 text-sm md:text-base">You&apos;ve gained 2kg in a month keep it up!</div>
                            <div className="text-gray-400 text-sm">Still need to gain</div>
                            <div className="text-2xl md:text-4xl font-bold mt-2">950 kcal</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {[
                                { label: "Protein", value: 35, color: "sky" },
                                { label: "Carbo", value: 65, color: "yellow" },
                                { label: "Fat", value: 65, color: "red" }
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
                                { icon: Droplet, label: "Water", value: "2300ml", subLabel: "Total Cons" },
                                { icon: Fire, label: "Calories", value: "890 kCal", subLabel: "Total Cons" },
                                { icon: Scale, label: "Weight", value: "62 Kg", subLabel: "My Weight" },
                                { icon: Heart, label: "BPM", value: "110 BPM", subLabel: "BPM" }
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
                        />
                        <ActivityCard
                            title="Daily Exercise"
                            description="A simple daily workout to keep you fit and full of energy."
                            image="/img/dashboard/exercise.jpg"
                            className="bg-[#41C9E2]"
                        />
                        <ActivityCard
                            title="Consultant Expert Physiotherapist "
                            description="Connect with experts for personalized care and effective recovery solutions"
                            image="/img/dashboard/consultant.jpg"
                            className="bg-[#ACE2E1] text-black"
                        />
                    </div>
                </div>

                {/* Meal Plan */}
                {/* <div className="mt-6 md:mt-8">
                    <MealPlan />
                </div> */}
            </div>
      
        </LayoutPage>
    )
}

