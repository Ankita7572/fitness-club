"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Step {
    title: string
    image: string
}

const steps: Step[] = [
    {
        title: "Choose gender",
        image: "/img/faq1.png",
    },
    {
        title: "Choose main goal",
        image: "/img/faq2.png",
    },
    {
        title: "Add your Age",
        image: "/img/faq3.png",
    },
    {
        title: "How tall are you?",
        image: "/img/faq1.png",
    },
    {
        title: "What is your weight?",
        image: "/img/faq5.png",
    },
    {
        title: "Choose training level",
        image: "/img/faq6.png",
    },
    {
        title: "Choose activities that interest",
        image: "/img/faq4.png",
    },
    {
        title: "Your BMI Results",
        image: "/img/faq2.png",
    },
]

export default function OnboardingForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const [heightUnit, setHeightUnit] = useState("cm")
    const [heightCm, setHeightCm] = useState(168)
    const [heightFeet, setHeightFeet] = useState(5)
    const [heightInches, setHeightInches] = useState(6)
    const [mounted, setMounted] = useState(false)
    const [age, setAge] = useState(10)
    const [trainingLevel, setTrainingLevel] = useState("")
    const [activity, setActivity] = useState("")
    const [gender, setGender] = useState("")
    const [mainGoal, setMainGoal] = useState("")
    const [weight, setWeight] = useState(60)

    const calculateBMI = useCallback(() => {
        if (heightUnit === "cm") {
            return (weight / Math.pow(heightCm / 100, 2)).toFixed(1)
        } else {
            const heightInMeters = ((heightFeet * 12 + heightInches) * 2.54) / 100
            return (weight / Math.pow(heightInMeters, 2)).toFixed(1)
        }
    }, [weight, heightUnit, heightCm, heightFeet, heightInches])

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row dark:bg-gray-900">
            {/* Left section - Image carousel */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <Image
                    src={steps[currentStep].image}
                    alt="Fitness"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="flex absolute z-30 justify-between items-center">
                    <Image
                        src="/img/logo.png"
                        alt="Fitness-club"
                        width={100}
                        height={60}
                        className="h-[53px] w-16 mb-0 mt-8 ml-12"
                    />
                    <span className="text-[#288cbe] italic font-extrabold font-serif mt-8 text-3xl">Fitness Club</span>
                </div>
            </div>

            {/* Right section - form */}
            <div className="flex-1 flex items-center justify-center px-8 -mt-32 max-sm:mt-0 overflow-y-auto">
                <div className="w-full max-w-md space-y-4">
                    <div className="space-y-2">
                        <div className="mb-0 -mt-4 text-center">
                            <div className="flex justify-between">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mb-4 text-gray-500 dark:text-gray-400"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-semibold mt-2 text-gray-500 dark:text-white">
                                    Step {currentStep + 1} of {steps.length - 1}
                                </span>
                                <span className="mt-1 text-gray-500 bg-transparent border-none dark:text-gray-400">Skip</span>
                            </div>
                            <div className="max-w-[20rem] mx-auto">
                                {currentStep === 0 && (
                                    <>
                                        <h1 className="text-black dark:text-gray-300 text-2xl mb-4 text-center font-bold">Choose Gender</h1>
                                        <RadioGroup value={gender} onValueChange={(value) => setGender(value)} className="grid gap-4">
                                            <Label
                                                htmlFor="woman"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${gender === "woman" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="woman" id="woman" />
                                                <span className="text-lg flex"> <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">👩</span>
                                                    Woman</span>
                                            </Label>
                                            <Label
                                                htmlFor="man"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${gender === "man" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="man" id="man" />
                                                <span className="text-lg flex">
                                                    <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">👨</span>Man</span>
                                            </Label>
                                            <Label
                                                htmlFor="neutral"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${gender === "neutral" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}>
                                                <RadioGroupItem value="neutral" id="neutral" />
                                                <span className="text-lg flex"> <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">😊</span> Gender neutral</span>
                                            </Label>
                                        </RadioGroup>
                                    </>
                                )}

                                {currentStep === 1 && (
                                    <>
                                        <h1 className="text-black dark:text-gray-300 text-2xl mb-4 text-center font-bold">Choose Main Goal</h1>
                                        <RadioGroup value={mainGoal} onValueChange={(value) => setMainGoal(value)} className="grid gap-4">
                                            <Label
                                                htmlFor="lose-weight"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${mainGoal === "lose-weight" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="lose-weight" id="lose-weight" />
                                                <span className="text-lg flex"><span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">⚖️</span> Lose weight</span>
                                            </Label>
                                            <Label
                                                htmlFor="keep-fit"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${mainGoal === "keep-fit" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="keep-fit" id="keep-fit" />
                                                <span className="text-lg flex"> <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">🎯</span> Keep fit</span>
                                            </Label>
                                            <Label
                                                htmlFor="get-stronger"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${mainGoal === "get-stronger" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="get-stronger" id="get-stronger" />
                                                <span className="text-lg flex"><span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">💪</span> Get stronger</span>
                                            </Label>
                                            <Label
                                                htmlFor="gain-muscle"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${mainGoal === "gain-muscle" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="gain-muscle" id="gain-muscle" />
                                                <span className="text-lg flex"><span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">🏋️</span> Gain muscle mass</span>
                                            </Label>
                                        </RadioGroup>
                                    </>
                                )}

                                {currentStep === 2 && (
                                    <>
                                        <h1 className="text-black dark:text-gray-300 text-2xl mb-4 text-center font-bold">Add Your Age</h1>
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <input
                                                type="number"
                                                id="age"
                                                name="age"
                                                value={age}
                                                onChange={(e) => setAge(Number(e.target.value))}
                                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 dark:focus:ring-gray-700 transition-colors duration-300"
                                            />
                                        </div>
                                    </>
                                )}

                                {currentStep === 3 && (
                                    <>
                                        <h1 className="text-black dark:text-gray-300 text-2xl mb-4 text-center font-bold">How tall are you?</h1>
                                        <Tabs defaultValue="cm" className="w-full max-w-[300px]" onValueChange={(value) => setHeightUnit(value)}>
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="cm">Centimetre</TabsTrigger>
                                                <TabsTrigger value="ft">Feet</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="cm" className="mt-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={heightCm}
                                                        onChange={(e) => setHeightCm(Number(e.target.value))}
                                                        className="w-24 text-center text-2xl font-bold"
                                                    />
                                                    <span className="text-lg">cm</span>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="ft" className="mt-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={heightFeet}
                                                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                                                        className="w-16 text-center text-2xl font-bold"
                                                    />
                                                    <span className="text-lg">ft</span>
                                                    <Input
                                                        type="number"
                                                        value={heightInches}
                                                        onChange={(e) => setHeightInches(Number(e.target.value))}
                                                        className="w-16 text-center text-2xl font-bold"
                                                    />
                                                    <span className="text-lg">in</span>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </>
                                )}

                                {currentStep === 4 && (
                                    <>
                                        <h1 className="text-black dark:text-gray-300 text-2xl mb-4 text-center font-bold">
                                            What is your weight?
                                        </h1>
                                        <input
                                            type="number"
                                            className="w-24 p-2 text-center text-2xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                                            value={weight}
                                            onChange={(e) => setWeight(Number(e.target.value))}
                                        />
                                        <span className="ml-2">kg</span>
                                    </>
                                )}

                                {currentStep === 5 && (
                                    <>
                                        <h1 className="text-black dark:text-gray-300 text-2xl mb-4 text-center font-bold">
                                            Choose training level
                                        </h1>
                                        <RadioGroup
                                            value={trainingLevel}
                                            onValueChange={(value) => setTrainingLevel(value)}
                                            className="grid gap-4"
                                        >
                                            <Label
                                                htmlFor="beginner"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${trainingLevel === "beginner" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="beginner" id="beginner" className="hidden border border-sky-500" />
                                                <span className="text-sm grid text-left">
                                                    <span className="text-black dark:text-white text-lg">Beginner</span>
                                                    I want to start training
                                                </span>
                                            </Label>
                                            <Label
                                                htmlFor="irregular"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                       ${trainingLevel === "irregular" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="irregular" id="irregular" className="hidden" />
                                                <span className="text-sm grid text-left">
                                                    <span className="text-black dark:text-white text-lg">Irregular</span>
                                                    I train 2-3 times a week
                                                </span>
                                            </Label>
                                            <Label
                                                htmlFor="medium"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${trainingLevel === "medium" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="medium" id="medium" className="hidden" />
                                                <span className="text-sm grid text-left">
                                                    <span className="text-black dark:text-white text-lg">Medium</span>
                                                    I train 3-5 times a week
                                                </span>
                                            </Label>
                                            <Label
                                                htmlFor="advanced"
                                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                    ${trainingLevel === "advanced" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <RadioGroupItem value="advanced" id="advanced" className="hidden" />
                                                <span className="text-sm grid text-left">
                                                    <span className="text-black dark:text-white text-lg">Advanced</span>
                                                    I train more than 5 times a week
                                                </span>
                                            </Label>
                                        </RadioGroup>
                                    </>
                                )}

                                {currentStep === 6 && (
                                    <>
                                        <h1 className="text-black dark:text-gray-300 text-2xl mb-4 text-center font-bold">
                                            Choose Activities that Interest You
                                        </h1>
                                        <div className="gap-4 space-y-2">
                                            <Label
                                                htmlFor="cardio"
                                                className={`flex justify-between gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${activity === "cardio" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <span className="text-base font-semibold flex">
                                                    <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">🏃‍♂️‍➡️</span>
                                                    Cardio
                                                </span>
                                                <Checkbox id="cardio" className="mt-1" />
                                            </Label>
                                            <Label
                                                htmlFor="power_training"
                                                className={`flex justify-between gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${activity === "power_training" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <span className="text-base font-semibold flex">
                                                    <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">🏋️‍♂️</span>
                                                    Power Training
                                                </span>
                                                <Checkbox id="power_training" className="mt-1" />
                                            </Label>
                                            <Label
                                                htmlFor="stretch"
                                                className={`flex justify-between gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${activity === "stretch" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <span className="text-base font-semibold flex">
                                                    <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">🤸‍♂️</span>
                                                    Stretch
                                                </span>
                                                <Checkbox id="stretch" className="mt-1" />
                                            </Label>
                                            <Label
                                                htmlFor="dancing"
                                                className={`flex justify-between gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${activity === "dancing" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <span className="text-base font-semibold flex">
                                                    <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">💃</span>
                                                    Dancing
                                                </span>
                                                <Checkbox id="dancing" className="mt-1" />
                                            </Label>
                                            <Label
                                                htmlFor="yoga"
                                                className={`flex justify-between gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                      ${activity === "yoga" ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                            >
                                                <span className="text-base font-semibold flex">
                                                    <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">🧘‍♂️</span>
                                                    Yoga
                                                </span>
                                                <Checkbox id="yoga" className="mt-1" />
                                            </Label>
                                        </div>
                                    </>
                                )}

                                {currentStep === 7 && (
                                    <div className="bmi_calculation">
                                        <div className="text-center space-y-6">
                                            <h1 className="text-black dark:text-gray-300 text-2xl mb-4 font-bold">
                                                We create your training plan
                                            </h1>
                                            <div className="relative w-48 h-48 mx-auto">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-4xl font-bold">{calculateBMI()}</div>
                                                </div>
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="88"
                                                        fill="none"
                                                        stroke="#e5e7eb"
                                                        strokeWidth="12"
                                                    />
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="88"
                                                        fill="none"
                                                        stroke="#7c3aed"
                                                        strokeWidth="12"
                                                        strokeDasharray={553}
                                                        strokeDashoffset={553 * (1 - 0.75)}
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mt-4">
                                                We create a workout according to demographic profile, activity level and interests
                                            </p>
                                            <Button
                                                className="w-full bg-[#2266c5] hover:bg-[#226aa5] text-white font-semibold py-3 px-6 rounded-full"
                                                onClick={() => {
                                                    // Handle workout plan generation
                                                    console.log("Generating workout plan...");
                                                }}
                                            >
                                                Start Training
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {currentStep < 7 && (
                                <Button
                                    className="w-full text-center items-center max-w-[20rem] mx-auto mt-8 bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-sky-700 transition-colors duration-300"
                                    onClick={handleNext}
                                >
                                    Continue
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

