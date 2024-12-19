import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { APIResponse } from "@/types";
import { auth, db } from "./firebase";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
// import { toast } from "sonner";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(auth, provider);
    const user = userCreds.user;
    const idToken = await user.getIdToken();

    // Check if user exists in 'users' collection
    const userDoc = await getDoc(doc(db, "users", user.email ?? ""));

    if (userDoc.exists()) {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const resBody = await response.json();
      if (response.ok && resBody.success) {
        return { success: true };
      }
    } else {
      // User doesn't exist in 'users' collection
      await auth.signOut();
      return { success: false, error: "User not found in our records" };
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
    if (
      error instanceof FirebaseError &&
      error.code === "auth/account-exists-with-different-credential"
    ) {
      return {
        success: false,
        error:
          "Account already exists with a different provider. Try logging in with another provider and link your account",
      };
    }
    return { success: false, error: "An error occurred during sign in" };
  }
}

export async function signOut() {
  try {
    await auth.signOut();

    const response = await fetch("/api/auth/sign-out", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json()) as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else {
      console.error(
        "Sign out failed:",
        !resBody.success ? resBody.error : "Unknown error",
      );
      return false;
    }
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
}
