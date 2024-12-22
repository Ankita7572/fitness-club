import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plan } from '@/lib/firebase/firebaseDb'
import AvatarCircles from '@/components/ui/avatar-circles'


interface SixDayPlanDisplayProps {
    plan: Plan
}

export function SixDayPlanDisplay({ plan }: SixDayPlanDisplayProps) {
    const [activeDay, setActiveDay] = useState("1")

    const formatMeals = (meals: string) => {
        const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]
        let formattedMeals = meals.split('\n').filter(meal => meal.trim() !== '')

        return (
            <div className="space-y-4">
                {mealTypes.map((type, index) => (
                    <div key={type}>
                        <h4 className="font-semibold text-sm">{type}</h4>
                        <p className="text-sm">{formattedMeals[index] || 'Not specified'}</p>
                    </div>
                ))}
            </div>
        )
    }

    const formatExercises = (exercises: string) => {
        return exercises.split('\n').filter(exercise => exercise.trim() !== '').map((exercise, index) => (
            <li key={index} className="text-sm">{exercise}</li>
        ))
    }

    const avatars = [
        {
            imageUrl: "/img/dashboard/avacado.webp",
            profileUrl: "#",
        },
        {
            imageUrl: "/img/dashboard/lunch1.webp",
            profileUrl: "#",
        },
        {
            imageUrl: "/img/dashboard/dinner2.webp",
            profileUrl: "#",
        },
        {
            imageUrl: "/img/dashboard/breakfast1.webp",
            profileUrl: "#",
        },
        
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Your 6-Day Fitness Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="1" value={activeDay} onValueChange={setActiveDay}>
                    <TabsList className="grid w-full grid-cols-6 mb-4">
                        {[1, 2, 3, 4, 5, 6].map((day) => (
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

