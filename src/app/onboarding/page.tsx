"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, X } from 'lucide-react'
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { saveUserData } from "@/lib/firebase/firebaseDb"
import { auth } from "@/lib/firebase/config"
import { useRouter } from "next/navigation"

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
    const [heightUnit, setHeightUnit] = useState("cm");
    const [heightCm, setHeightCm] = useState<number | undefined>(undefined)
    const [heightFeet, setHeightFeet] = useState<number | undefined>(undefined)
    const [heightInches, setHeightInches] = useState<number | undefined>(undefined)
    const [mounted, setMounted] = useState(false)
    const [age, setAge] = useState<number | undefined>(undefined)
    const [trainingLevel, setTrainingLevel] = useState("")
    const [activities, setActivities] = useState<string[]>([])
    const [gender, setGender] = useState("")
    const [mainGoal, setMainGoal] = useState("")
    const [weight, setWeight] = useState<number | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter()
    const calculateBMI = useCallback((): number => {
        if (!weight || weight <= 0) return 0;

        let heightInMeters: number;

        if (heightUnit === "cm" && heightCm && heightCm > 0) {
            heightInMeters = heightCm / 100;
        } else if (heightUnit === "feet" && heightFeet && heightInches && heightFeet > 0) {
            heightInMeters = ((heightFeet * 12 + (heightInches || 0)) * 2.54) / 100;
        } else {
            return 0;
        }

        const bmi = weight / Math.pow(heightInMeters, 2);
        return Number(bmi.toFixed(1));
    }, [weight, heightUnit, heightCm, heightFeet, heightInches]);

    const getBMICategory = (bmi: number): string => {
        if (bmi < 18.5) return "underweight";
        if (bmi < 25) return "normal";
        if (bmi < 30) return "overweight";
        return "obese";
    };

    const getBMIAdvice = (category: string): string => {
        switch (category) {
            case "underweight":
                return "Consider increasing your calorie intake with nutrient-dense foods and incorporate strength training exercises to build muscle mass.";
            case "normal":
                return "Maintain your current healthy lifestyle with a balanced diet and regular exercise.";
            case "overweight":
                return "Focus on a balanced diet with portion control and increase your physical activity, aiming for at least 150 minutes of moderate exercise per week.";
            case "obese":
                return "Consult with a healthcare professional for personalized advice. Consider adopting a calorie-controlled diet and gradually increasing your physical activity level.";
            default:
                return "";
        }
    };


    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    const handleNext = () => {
        let isValid = true;
        setErrorMessage("");

        switch (currentStep) {
            case 0:
                if (!gender) {
                    setErrorMessage("Please choose your gender before continuing.");
                    isValid = false;
                }
                break;
            case 1:
                if (!mainGoal) {
                    setErrorMessage("Please choose your main goal before continuing.");
                    isValid = false;
                }
                break;
            case 2:
                if (!age || age < 18 || age > 100) {
                    setErrorMessage("Please enter a valid age between 18 and 100.");
                    isValid = false;
                }
                break;
            case 3:
                if (heightUnit === "cm" ? !heightCm : (!heightFeet || !heightInches)) {
                    setErrorMessage("Please enter your height before continuing.");
                    isValid = false;
                }
                break;
            case 4:
                if (!weight || weight <= 0) {
                    setErrorMessage("Please enter a valid weight before continuing.");
                    isValid = false;
                }
                break;
            case 5:
                if (!trainingLevel) {
                    setErrorMessage("Please choose your training level before continuing.");
                    isValid = false;
                }
                break;
            case 6:
                if (activities.length === 0) {
                    setErrorMessage("Please choose at least one activity that interests you.");
                    isValid = false;
                }
                break;
        }

        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSubmit = async () => {
        if (!auth.currentUser) {
            setErrorMessage("Please sign in to save your data");
            return;
        }

        const bmiValue = calculateBMI();
        const bmiCategory = getBMICategory(Number(bmiValue));

        try {
            // Create base activity data
            const baseUserData = {
                gender,
                mainGoal,
                age,
                heightUnit,
                weight,
                trainingLevel,
                activities,
                bmi: bmiValue,
                bmiCategory,
                timestamp: new Date()
            };

            // Add height measurements based on the selected unit
            const heightData = heightUnit === 'cm'
                ? { heightCm }
                : { heightFeet, heightInches };

            // Combine and clean the data
            const UserData = {
                ...baseUserData,
                ...heightData
            };

            await saveUserData(UserData);
            console.log("Workout plan generated successfully!");

            router.push("/dashboard")
        } catch (error) {
            console.error("Submission error:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row dark:bg-gray-900">
            {/* Left section - Image carousel */}
            <div className="hidden md:block md:w-1/2 relative overflow-hidden">
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
                        className="w-24 h-12 mb-0 mt-8 ml-12"
                    />

                </div>
            </div>

            {/* Right section - form */}
            <div className="flex-1 flex mt-10 max-md:mt-0 items-baseline  justify-center px-4 sm:px-8 py-2 md:py-0 overflow-y-auto">

                {errorMessage && (
                    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded flex items-center justify-between" role="alert">
                        <span className="block text-sm sm:inline">{errorMessage}</span>
                        <button
                            onClick={() => setErrorMessage("")}
                            className="text-red-700 hover:text-red-900 ml-1"
                        >
                            <X size={12} />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                )}
                <div className="w-full max-w-md space-y-4 ">
                    <div className="space-y-2">
                        <div className="mb-0  text-center">
                            <div className=" md:hidden block z-30 justify-between items-center">
                                <Image
                                    src="/img/logo.png"
                                    alt="Fitness-club"
                                    width={100}
                                    height={60}
                                    className="w-24 h-12 mb-0 "
                                />

                            </div>
                            <div className="flex justify-between items-baseline mt-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mb-4 text-gray-500 dark:text-gray-400"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-semibold mt-2 text-gray-700 dark:text-white">
                                    {currentStep === 7 ? '' : `Step ${currentStep + 1} of ${steps.length - 1}`}
                                </span>
                                <span className="mt-1 text-gray-500 invisible bg-transparent border-none dark:text-gray-400">Skip</span>
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
                                            {["cardio", "power_training", "stretch", "dancing", "yoga"].map((act) => (
                                                <Label
                                                    key={act}
                                                    htmlFor={act}
                                                    className={`flex justify-between gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 
                                                          ${activities.includes(act) ? "border-sky-600 dark:border-sky-500" : "border-gray-300 dark:border-gray-700"}`}
                                                >
                                                    <span className="text-base font-semibold flex">
                                                        <span className="px-1 bg-gradient-to-r rounded-md to-sky-600 from-teal-500 mr-2">
                                                            {act === "cardio" ? "🏃‍♂️‍➡️" : act === "power_training" ? "🏋️‍♂️" : act === "stretch" ? "🤸‍♂️" : act === "dancing" ? "💃" : "🧘‍♂️"}
                                                        </span>
                                                        {act.replace('_', ' ').charAt(0).toUpperCase() + act.replace('_', ' ').slice(1)}
                                                    </span>
                                                    <Checkbox
                                                        id={act}
                                                        checked={activities.includes(act)}
                                                        onCheckedChange={(checked) => {
                                                            setActivities(prev =>
                                                                checked
                                                                    ? [...prev, act]
                                                                    : prev.filter(a => a !== act)
                                                            )
                                                        }}
                                                        className="mt-1"
                                                    />
                                                </Label>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {currentStep === 7 && (
                                    <div className="bmi_calculation">
                                        <div className="text-center space-y-6">
                                            <h1 className="text-black dark:text-gray-300 text-2xl mb-4 font-bold">
                                                Your BMI Results
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
                                                        strokeDashoffset={553 * (1 - Number(calculateBMI()) / 40)}
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-xl font-semibold mt-4">
                                                Your BMI category: {getBMICategory(Number(calculateBMI()))}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 mt-4">
                                                {getBMIAdvice(getBMICategory(Number(calculateBMI())))}
                                            </p>
                                            <Button
                                                className="w-full bg-[#2266c5] hover:bg-[#226aa5] text-white font-semibold py-3 px-6 rounded-full"
                                                onClick={handleSubmit}
                                            >
                                                Start Your Personalized Training
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

