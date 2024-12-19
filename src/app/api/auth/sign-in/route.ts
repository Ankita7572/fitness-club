import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db, auth } from '@/lib/firebase/config';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Access Firestore and check if the email exists in the users collection
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return NextResponse.json({ success: false, error: 'User not found in the system.' }, { status: 404 });
    }

    // If the user exists, attempt to sign in
    const authInstance = getAuth();
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    const user = userCredential.user;

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials.' }, { status: 401 });
    }

    // You might want to create a session or JWT token here
    // For simplicity, we're just returning the user's ID
    return NextResponse.json({ success: true, userId: user.uid });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'An error occurred during login.' 
    }, { status: 500 });
  }
}

