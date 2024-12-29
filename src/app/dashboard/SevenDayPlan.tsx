import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plan, MealPlan } from '@/lib/firebase/firebaseDb'
import AvatarCircles from '@/components/ui/avatar-circles'

interface SevenDayPlanProps {
    plan: Plan
}

export function SevenDayPlan({ plan }: SevenDayPlanProps) {
    const [activeDay, setActiveDay] = useState("1")

    const formatMeals = (meals: MealPlan) => {
        return (
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-sm">Breakfast</h4>
                    <p className="text-sm">{meals.breakfast.title}: {meals.breakfast.description}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-sm">Lunch</h4>
                    <p className="text-sm">{meals.lunch.title}: {meals.lunch.description}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-sm">Dinner</h4>
                    <p className="text-sm">{meals.dinner.title}: {meals.dinner.description}</p>
                </div>
                {meals.snacks.map((snack, index) => (
                    <div key={index}>
                        <h4 className="font-semibold text-sm">Snack {index + 1}</h4>
                        <p className="text-sm">{snack.title}: {snack.description}</p>
                    </div>
                ))}
            </div>
        )
    }

    const formatExercises = (exercises: Array<{ title: string; description: string }>) => {
        return exercises.map((exercise, index) => (
            <li key={index} className="text-sm">
                <span className="font-semibold">{exercise.title}:</span> {exercise.description}
            </li>
        ))
    }

    const avatars = [
        { imageUrl: "/img/dashboard/avacado.webp", profileUrl: "#" },
        { imageUrl: "/img/dashboard/lunch1.webp", profileUrl: "#" },
        { imageUrl: "/img/dashboard/dinner2.webp", profileUrl: "#" },
        { imageUrl: "/img/dashboard/breakfast1.webp", profileUrl: "#" },
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Your 7-Day Fitness Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="1" value={activeDay} onValueChange={setActiveDay}>
                    <TabsList className="grid w-full grid-cols-7 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                            <TabsTrigger key={day} value={day.toString()}>
                                Day {day}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {plan.days.map((day, index) => (
                        <TabsContent key={index} value={(index + 1).toString()}>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader className='flex'>
                                        <CardTitle className="text-lg">Meals</CardTitle>
                                        <AvatarCircles numPeople={5} avatarUrls={avatars} />
                                    </CardHeader>
                                    <CardContent>
                                        {formatMeals(day.meals)}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Exercises</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc pl-5 space-y-2">
                                            {formatExercises(day.exercises)}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}

