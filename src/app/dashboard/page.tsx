
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


import { CircularProgressBar } from "@/components/ui/circular-progress"
import { LayoutPage } from "./LayoutPage"


export default function DashboardPage() {
    return (
        <LayoutPage>
            <div className="flex-1 space-y-4 p-4 md:p-8 bg-gray-50">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:bg-[#9ff7f7] shadow-md" style={{
                        backgroundImage: "url('/img/wave.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Daily Calories</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-sky-600"
                            >
                                <path d="M12 2v20M2 12h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <CircularProgressBar value={75} color="sky" size="lg" />
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-800">1,840</div>
                                    <p className="text-xs text-gray-500">
                                        of 2,000 cal
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#dcb5f5] shadow-md" style={{
                        backgroundImage: "url('/img/wave.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Protein Intake</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-sky-600"
                            >
                                <path d="M12 2v20M2 12h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <CircularProgressBar value={68} color="sky" size="lg" />
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-800">82g</div>
                                    <p className="text-xs text-gray-500">
                                        of 120g
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-md" style={{
                        backgroundImage: "url('/img/wave.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Body Overview</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-sky-600"
                            >
                                <path d="M12 2v20M2 12h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <CircularProgressBar value={85} color="sky" size="lg" />
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-800">75 kg</div>
                                    <p className="text-xs text-gray-500">
                                        target: 70 kg
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-md" style={{
                        backgroundImage: "url('/img/wave.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Water Intake</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-sky-600"
                            >
                                <path d="M12 2v20M2 12h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <CircularProgressBar value={72} color="sky" size="lg" />
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-800">1.8L</div>
                                    <p className="text-xs text-gray-500">
                                        of 2.5L
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-full lg:col-span-4 bg-[#cdf6f7] shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700">Meal Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {["Breakfast", "Lunch", "Dinner"].map((meal, index) => (
                                    <div key={meal}>
                                        <h4 className="text-sm font-medium text-gray-500 mb-4">{meal} ({["500", "700", "640"][index]} cal)</h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {[
                                                { emoji: "🥣", name: "Oatmeal with Berries", calories: 300 },
                                                { emoji: "🥑", name: "Avocado Toast", calories: 200 },
                                                { emoji: "🥗", name: "Grilled Chicken Salad", calories: 400 },
                                                { emoji: "🍚", name: "Brown Rice", calories: 300 },
                                                { emoji: "🐟", name: "Grilled Salmon", calories: 440 },
                                                { emoji: "🥦", name: "Steamed Vegetables", calories: 200 },
                                            ].slice(index * 2, index * 2 + 2).map((item, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl">
                                                        {item.emoji}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-700">{item.name}</p>
                                                        <p className="text-sm text-gray-500">{item.calories} calories</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-full lg:col-span-3 bg-[#cae0fc] shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700">Calorie Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600">Macronutrients</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { name: "Protein", value: 68, amount: "82g" },
                                            { name: "Carbs", value: 82, amount: "245g" },
                                            { name: "Fat", value: 52, amount: "62g" },
                                        ].map((item) => (
                                            <div key={item.name} className="flex flex-col items-center">
                                                <CircularProgressBar value={item.value} color="sky" size="md" />
                                                <span className="mt-2 text-sm text-gray-600">{item.name}</span>
                                                <span className="text-sm font-medium text-gray-700">{item.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600">Daily Target</p>
                                    <div className="space-y-2">
                                        {[
                                            { name: "Calories Remaining", value: "160" },
                                            { name: "Water Intake", value: "1.8L / 2.5L" },
                                            { name: "Steps", value: "8,439 / 10,000" },
                                        ].map((item) => (
                                            <div key={item.name} className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">{item.name}</span>
                                                <span className="font-medium text-gray-700">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LayoutPage>
    )
}

