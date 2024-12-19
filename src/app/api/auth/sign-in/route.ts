import { db } from '@/lib/firebase/config';
import { createSessionCookie } from '@/lib/firebase/firebase-admin';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import { NextRequest, NextResponse } from 'next/server';


// Define the type for API responses
type APIResponse<T> = {
  success: boolean;
  data: T;
};

// Define the cookies function (replace with your actual implementation)
async function cookies() {
  //Implementation for getting cookies
  return {
    set: (name: string, value: string, options: any) => {
      //Implementation for setting cookies
      console.log(`Setting cookie ${name} with value ${value} and options:`, options);
    }
  }
}


export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as { idToken: string; email: string };
  const { idToken, email } = reqBody;

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  // Check if the user exists in the 'users' collection
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return NextResponse.json<APIResponse<string>>({ success: false, data: "User not found in our records." }, { status: 404 });
  }

  const sessionCookie = await createSessionCookie(idToken, { expiresIn });

  // Set the session cookie
  (await cookies()).set("__session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });

  return NextResponse.json<APIResponse<string>>({ success: true, data: "Signed in successfully." });
}

