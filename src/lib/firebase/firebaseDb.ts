import { doc, getDoc, query, setDoc, where, collection, getDocs, updateDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { toast } from "sonner";
export interface User{
   userId: string;
    email: string;
    displayName?:string;
  
    createdAt?:Timestamp;
}
export interface MealItem {
  title: string;
  description: string;
}

export interface MealPlan {
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
  snacks: MealItem[];
}

export interface DailyPlan {
  dayNumber: number;
  meals: MealPlan;
  exercises: Array<{ title: string;
        description: string;
        duration?: string;
        sets?: number;
        reps?: number; }>;
}

export interface WeeklyIntake {
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  calories: number;
}

export interface Plan {
  email: string;
  days: DailyPlan[];
  weeklyIntake: WeeklyIntake;
  createdAt: Date | Timestamp;
  lastUpdated: Date | Timestamp;
}

export interface UserData {
     
    gender: string;
    mainGoal: string;
    age: number;
    heightUnit: string;
    heightCm?: number;
    heightFeet?: number;
    heightInches?: number;
    weight: number;
    trainingLevel: string;
    activities: string[];
    bmi: number;
    bmiCategory: string;
    timestamp: Date;
    email: string;
    displayName: string;
   
    
}




export async function getUserDetailsFromCollection(email: string): Promise<Partial<User>> {
    try {
        const userDocRef = doc(db, "users", email);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            console.log("No user found in users collection");
            return {};
        }

        return userDocSnapshot.data() as Partial<User>;
    } catch (error) {
        console.error("Error fetching user details from users collection:", error);
        return {};
    }
}
// Function to save user data
export async function saveUserData(userData: Partial<UserData>) {
    try {
        const user = auth.currentUser;
        
        if (!user || !user.email) {
            throw new Error("No authenticated user found or email missing");
        }

        // First, get user details from users collection
        const userCollectionDetails = await getUserDetailsFromCollection(user.email);

        // Use displayName from users collection if available, otherwise fallback to auth user's displayName
        const displayName = userCollectionDetails.displayName || user.displayName || "";

        const cleanedData = Object.fromEntries(
            Object.entries({
                ...userData,
                email: user.email,
                // Explicitly set displayName from users collection
                displayName: displayName,
               
                timestamp: new Date()
            }).filter(([_, value]) => value !== undefined)
        );

        const userDataRef = doc(db, "user_data", user.email);
        
        await setDoc(userDataRef, cleanedData, { merge: true });
        
        console.log("User data saved successfully with displayName:", displayName);
        return true;
    } catch (error) {
        console.error("Error saving user data:", error);
        throw error;
    }
}


export async function getUserDataByEmail(email: string): Promise<UserData | null> {
    try {
        const userDocRef = doc(db, "user_data", email);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            console.log("No user found with the given email");
            return null;
        }

        const userData = userDocSnapshot.data() as UserData;

        // Ensure all fields are present, use default values if not
        const completeUserData: UserData = {
            gender: userData.gender || "",
            mainGoal: userData.mainGoal || "",
            age: userData.age || 0,
            heightUnit: userData.heightUnit || "",
            heightCm: userData.heightCm,
            heightFeet: userData.heightFeet,
            heightInches: userData.heightInches,
            weight: userData.weight || 0,
            trainingLevel: userData.trainingLevel || "",
            activities: userData.activities || [],
            bmi: userData.bmi || 0,
            bmiCategory: userData.bmiCategory || "",
            timestamp: userData.timestamp ? new Date(userData.timestamp) : new Date(),
            email: userData.email || "",
            displayName: userData.displayName || "",
         
           
        };

        return completeUserData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function UpdateUserData(data:UserData) {
    try {
     const docRef = query(
            collection(db, "user_data"),
            where("email", "==", data.email)
        );
    const docSnap = await getDocs(docRef);
    if (docSnap.docs.length > 0) {
      const doc = docSnap.docs[0];
      const { email, ...updateData } = data;
      await updateDoc(doc.ref, updateData);
    } else {
      // If the document doesn't exist, create a new one
      await setDoc(doc(collection(db, "user_data"), data.email), data);
    }
  } catch (error) {
    console.error("Error updating profile: ", error);
    toast.error("Error updating profile");
  }
}

export async function saveFitnessPlan(email: string, plan: Plan) {
    try {
        const planDocRef = doc(db, "fitness_plan", email);
        const planToSave = {
            ...plan,
            lastUpdated: new Date()
        };
        await setDoc(planDocRef, planToSave);
        toast.success("Fitness plan saved successfully");
        return true;
    } catch (error) {
        console.error("Error saving fitness plan:", error);
        toast.error("Failed to save fitness plan");
        throw error;
    }
}

export async function getFitnessPlan(email: string): Promise<Plan | null> {
    try {
        const planDocRef = doc(db, "fitness_plan", email);
        const planDocSnapshot = await getDoc(planDocRef);

        if (!planDocSnapshot.exists()) {
            return null;
        }

        const planData = planDocSnapshot.data() as Plan;
        
        // Ensure the plan data structure is complete
        return {
            ...planData,
            days: planData.days.map((day, index) => ({
                ...day,
                dayNumber: index + 1,
                meals: {
                    breakfast: day.meals.breakfast || { title: '', description: '' },
                    lunch: day.meals.lunch || { title: '', description: '' },
                    dinner: day.meals.dinner || { title: '', description: '' },
                    snacks: day.meals.snacks || []
                },
                exercises: Array.isArray(day.exercises) ? day.exercises : []
            })),
            weeklyIntake: {
                protein: planData.weeklyIntake?.protein || 0,
                carbs: planData.weeklyIntake?.carbs || 0,
                fat: planData.weeklyIntake?.fat || 0,
                water: planData.weeklyIntake?.water || 0,
                calories: planData.weeklyIntake?.calories || 0
            },
            lastUpdated: planData.lastUpdated || planData.createdAt
        };
    } catch (error) {
        console.error("Error fetching fitness plan:", error);
        throw error;
    }
}

export function calculateWeeklyIntake(bmi: number): WeeklyIntake {
  let baseCalories: number;
  let proteinMultiplier: number;
  let carbsMultiplier: number;
  let fatMultiplier: number;

  if (bmi < 18.5) {
    // Underweight
    baseCalories = 2500;
    proteinMultiplier = 2.2;
    carbsMultiplier = 3;
    fatMultiplier = 0.8;
  } else if (bmi >= 18.5 && bmi < 25) {
    // Normal weight
    baseCalories = 2200;
    proteinMultiplier = 1.8;
    carbsMultiplier = 2.5;
    fatMultiplier = 0.7;
  } else if (bmi >= 25 && bmi < 30) {
    // Overweight
    baseCalories = 2000;
    proteinMultiplier = 1.6;
    carbsMultiplier = 2;
    fatMultiplier = 0.6;
  } else {
    // Obese
    baseCalories = 1800;
    proteinMultiplier = 1.4;
    carbsMultiplier = 1.5;
    fatMultiplier = 0.5;
  }

  const weeklyCalories = baseCalories * 7;
  const weeklyProtein = Math.round(proteinMultiplier * 7 * 70); // Assuming 70kg as a base weight
  const weeklyCarbs = Math.round(carbsMultiplier * 7 * 70);
  const weeklyFat = Math.round(fatMultiplier * 7 * 70);
  const weeklyWater = 2000 * 7; // 2 liters per day

  return {
    protein: weeklyProtein,
    carbs: weeklyCarbs,
    fat: weeklyFat,
    water: weeklyWater,
    calories: weeklyCalories
  };
}

