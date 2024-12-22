"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState, useCallback } from "react";
import { auth } from "@/lib/firebase/config";
import { getUserDataByEmail, UpdateUserData, UserData } from "@/lib/firebase/firebaseDb";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Camera } from 'lucide-react';
import LayoutPage from "../dashboard/LayoutPage";

interface FormData {
    displayName: string;
    email: string;
    gender: string;
    mainGoal: string;
    age: number;
    heightCm: number;
    weight: number;
    trainingLevel: string;
    activities: string[];
    bmi: number;
    bmiCategory: string;

}

function calculateBMI(weight: number, heightCm: number): number {
    const heightM = heightCm / 100;
    return Number((weight / (heightM * heightM)).toFixed(1));
}

function getBMICategory(bmi: number): string {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}


const ProfilePage = () => {
    const [user, setUser] = useState<any | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { handleSubmit, setValue, control, watch } = useForm<FormData>({
        defaultValues: {
            displayName: "",
            email: "",
            gender: "",
            mainGoal: "",
            age: 0,
            heightCm: 0,
            weight: 0,
            trainingLevel: "",
            activities: [],
            bmi: 0,
            bmiCategory: "",

        }
    });

    const recalculateBMI = useCallback((weight: number, heightCm: number) => {
        const bmi = calculateBMI(weight, heightCm);
        setValue("bmi", bmi);
        setValue("bmiCategory", getBMICategory(bmi));
    }, [setValue]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser && currentUser.email) {  // Add check for email
                const userData = await getUserDataByEmail(currentUser.email);
                if (userData) {
                    setValue("displayName", userData.displayName || "");
                    setValue("email", userData.email || "");
                    setValue("gender", userData.gender || "");
                    setValue("mainGoal", userData.mainGoal || "");
                    setValue("age", userData.age || 0);
                    setValue("heightCm", userData.heightCm || 0);
                    setValue("weight", userData.weight || 0);
                    setValue("trainingLevel", userData.trainingLevel || "");
                    setValue("activities", userData.activities || []);


                    if (userData.weight && userData.heightCm) {
                        const bmi = calculateBMI(userData.weight, userData.heightCm);
                        setValue("bmi", bmi);
                        setValue("bmiCategory", getBMICategory(bmi));
                    }
                }
            }
        });

        return () => unsubscribe();
    }, [setValue]);

    const onSubmit = async (data: FormData) => {
        const user = auth.currentUser;
        if (user) {
            try {
                const updateData: UserData = {

                    displayName: data.displayName,
                    email: data.email,
                    gender: data.gender,
                    mainGoal: data.mainGoal,
                    age: data.age,
                    heightCm: data.heightCm,
                    weight: data.weight,
                    trainingLevel: data.trainingLevel,
                    activities: data.activities,
                    bmi: data.bmi,
                    bmiCategory: data.bmiCategory,

                    heightUnit: "cm",
                    timestamp: new Date()
                };

                await UpdateUserData(updateData);
                setIsEditing(false);
                toast.success("Profile updated successfully");
            } catch (error) {
                console.error("Error updating profile:", error);
                toast.error("Failed to update profile");
            }
        }
    };



    return (
        <LayoutPage>
            <div className="container mx-auto p-8">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="displayName">Name</Label>
                            <Controller
                                name="displayName"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} className="mt-1" />
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} disabled className="mt-1 bg-gray-100" />
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} type="number" className="mt-1" />
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Controller
                                name="weight"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        className="mt-1"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            const heightCm = watch("heightCm");
                                            if (heightCm) {
                                                recalculateBMI(Number(e.target.value), heightCm);
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="heightCm">Height (cm)</Label>
                            <Controller
                                name="heightCm"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        className="mt-1"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            const weight = watch("weight");
                                            if (weight) {
                                                recalculateBMI(weight, Number(e.target.value));
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="trainingLevel">Training Level</Label>
                            <Controller
                                name="trainingLevel"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select training level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="mainGoal">Main Goal</Label>
                            <Controller
                                name="mainGoal"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select main goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                            <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                            <SelectItem value="endurance">Endurance</SelectItem>
                                            <SelectItem value="flexibility">Flexibility</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="bmi">BMI</Label>
                            <Controller
                                name="bmi"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} disabled className="mt-1 bg-gray-100" />
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="bmiCategory">BMI Category</Label>
                            <Controller
                                name="bmiCategory"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} disabled className="mt-1 bg-gray-100" />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-sky-600 hover:bg-sky-500">Save Changes</Button>
                    </div>
                </form>

            </div>
        </LayoutPage>
    );
}

export default ProfilePage;

