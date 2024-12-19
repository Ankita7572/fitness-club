import { doc, getDoc, query, setDoc, where, collection, getDocs, updateDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";
export interface User{
   userId: string;
    email: string;
    displayName?:string;
    photoURL?:string;
    createdAt?:Timestamp;
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
   
    userImage: string;
}
async function getUserDetailsFromCollection(uid: string): Promise<Partial<User>> {
    try {
        const userDocRef = doc(db, "users", uid);
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
        
        if (!user) {
            throw new Error("No authenticated user found");
        }

        // First, try to get additional user details from users collection
        const userCollectionDetails = await getUserDetailsFromCollection(user.uid);

        const cleanedData = Object.fromEntries(
            Object.entries({
                ...userData,
                email: userCollectionDetails.email || user.email || "",
                displayName: userCollectionDetails.displayName || user.displayName || "",
                userId: user.uid,
                userImage: userCollectionDetails.photoURL || user.photoURL || "",
                timestamp: new Date()
            }).filter(([_, value]) => value !== undefined)
        );

        const userDataRef = doc(db, "user_data", user.uid);
        
        await setDoc(userDataRef, cleanedData, { merge: true });
        
        console.log("User data saved successfully");
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
         
            userImage: userData.userImage || "",
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