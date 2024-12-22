'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from '@/components/mode-toggle'
import React, { useState, useEffect } from 'react'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    setPersistence,
    browserLocalPersistence
} from "firebase/auth"
import app, { db } from "@/lib/firebase/config"
import { useRouter } from "next/navigation"

import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import { toast } from "sonner"

const images = ['/img/log1.png', '/img/log2.png', '/img/log3.png']

export default function LoginPage() {
    const [currentImage, setCurrentImage] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const auth = getAuth(app)
        const db = getFirestore(app)


        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Store user information in localStorage
                

                try {
                    // Check if user exists in Firestore
                    const userDocRef = doc(collection(db, 'user_data'), user.email!)
                    const userDoc = await getDoc(userDocRef)
                    if (userDoc.exists()) {
                        // User exists, redirect to dashboard
                        router.push('/dashboard')
                    } else {
                        // New user, redirect to onboarding
                        router.push('/login')
                    }
                } catch (error) {
                    console.error('Error checking user existence:', error)
                    // Handle error appropriately
                    // You might want to redirect to an error page or show a notification
                }
            } else {
                // Remove user information from localStorage
                localStorage.removeItem('userInfo')
                setUser(null)
                // Optionally redirect to login page
                router.push('/login')
            }
        })

        return () => unsubscribe()
    }, [])

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        const auth = getAuth(app);

        try {
            // Check if the email exists in the users collection
            const userRef = collection(db, 'users');
            const q = query(userRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setIsLoading(false);
                setError("No user found with this email");
                return;
            }

            // If email exists, proceed with login
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a session by setting the persistence to LOCAL
            await setPersistence(auth, browserLocalPersistence);

            // Store user information in localStorage
            const userInfo = {
                uid: user.uid,
                email: user.email,
               
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // Check if the user has completed onboarding
            const userDocRef = doc(db, 'user_data', user.email!);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists() && userDoc.data().onboardingCompleted) {
                toast.success("User logged in successfully");
                router.replace("/dashboard");
            } else {
                toast.success("User logged in successfully");
                router.replace("/onboarding");
            }
        } catch (error: any) {
            console.error("Error signing in:", error);
            let errorMessage = "An error occurred during sign in";
            if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password";
            } else if (error.code === "auth/user-not-found") {
                errorMessage = "No user found with this email";
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false); // Set loading to false after login attempt
        }
    }


    const signInWithGoogle = async () => {
        setIsLoading(true); 
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const userDataRef = doc(db, 'user_data', user.email || '')
            const userDataSnap = await getDoc(userDataRef)

            if (userDataSnap.exists()) {
                // User exists in user_data collection, route to dashboard
                router.push("/dashboard")
            } else {
                // User doesn't exist in user_data collection, route to onboarding
                router.push("/onboarding")
            }
            // Store user information in localStorage
            const userInfo = {
                uid: user.uid,
                displayName: user.displayName || '',
                email: user.email || '',
                
            }
            localStorage.setItem('user_Info', JSON.stringify(userInfo))

            router.push("/onboarding")
        } catch (error: any) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log("Google Sign-In popup was closed before completion")
            } else {
                console.error("Error signing in with Google:", error)
                setError("An error occurred during Google Sign-In")
            }
        } finally {
            setIsLoading(false); // Set loading to false after Google sign-in attempt
        }
    }

    // Load remembered email on component mount
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail')
        if (rememberedEmail) {
            setEmail(rememberedEmail)
            setRememberMe(true)
        }
    }, [])

    return (
        <>

            {!user && (
                <div className="min-h-screen w-full flex flex-col bg-white lg:flex-row dark:bg-gray-900">
                    {/* Left section - Image carousel */}
                    <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                        {images.map((src, index) => (
                            <Image
                                key={src}
                                src={src}
                                alt={`Fitness Motivation ${index + 1}`}
                                fill
                                className={`object-cover transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                                    }`}
                                priority={index === 0}
                            />
                        ))}
                    </div>

                    {/* Right section - login form */}
                    <div className="flex-1 flex items-center justify-center px-8 overflow-y-auto">
                        <div className="w-full max-w-md space-y-4">
                            <div className="flex justify-between items-center">
                                <Image
                                    src="/img/logo.png"
                                    alt="Fitness-club"
                                    width={150}
                                    height={40}
                                    className="w-24 h-12"
                                />

                            </div>

                            <div className="space-y-2 ">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold dark:text-white">Sign In ✌️</h1>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Welcome to Fitness-club. Start your effective workout routine today!
                                    </p>
                                </div>

                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="dark:text-white">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="mary.smith@example.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-gray-100/50 dark:bg-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="dark:text-white">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-gray-100/50 dark:bg-gray-800 pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                checked={rememberMe}
                                                onCheckedChange={(checked) => setRememberMe(!!checked)}
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                                            >
                                                Remember me
                                            </Label>
                                        </div>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </>
                                        ) : (
                                            'Sign in'
                                        )}
                                    </Button>
                                </form>

                                <div className="space-y-4">
                                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                                        Don't have an account?{" "}
                                        <Link
                                            href="/signup"
                                            className="text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>

                                    <div className="space-y-2">
                                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">Sign in with</p>
                                        <div className="flex justify-center">
                                            <Button
                                                variant="outline"
                                                className="w-full max-w-[200px] dark:bg-gray-800 dark:text-white"
                                                onClick={signInWithGoogle}
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                        fill="#4285F4"
                                                    />
                                                    <path
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                        fill="#34A853"
                                                    />
                                                    <path
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                        fill="#FBBC05"
                                                    />
                                                    <path
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                        fill="#EA4335"
                                                    />
                                                </svg>
                                                {isLoading ? 'Please wait' : 'Sign in with Google'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}