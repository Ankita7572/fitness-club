'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from 'react'
import { toast } from "sonner"

const images = ['/img/log1.png', '/img/log2.png', '/img/log3.png']

export default function ForgotPasswordPage() {
    const [currentImage, setCurrentImage] = useState(0)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Image carousel effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    // Handle password reset request
    const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        if (!email) {
            toast.error("Please enter your email");
            setIsLoading(false);
            return;
        }

        // Simulate a delay to mimic an API call
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
            toast.success("Password reset request received. Please check your email for further instructions.");
        }, 1500);
    };

    return (
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

            {/* Right section - Forgot Password form */}
            <div className="flex-1 flex items-center justify-center px-8 overflow-y-auto">
                <div className="w-full max-w-sm space-y-4">
                    <div className="flex justify-between items-center">
                        <Image
                            src="/img/logo.png"
                            alt="Fitness-club"
                            width={150}
                            height={40}
                            className="w-24 h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold dark:text-white">Forgot Password</h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Don't worry! Enter the email associated with your account to reset your password.
                            </p>
                        </div>

                        {!isSubmitted ? (
                            <form onSubmit={handleForgotPassword} className="space-y-4">
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

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full text-white dark:text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700"
                                >
                                    {isLoading ? "Processing..." : "Reset Password"}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center space-y-4">
                                <p className="text-green-600 dark:text-green-400">
                                    Password reset request received. Please check your email for further instructions.
                                </p>
                                <Button
                                    onClick={() => setIsSubmitted(false)}
                                    className="w-full text-white dark:text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700"
                                >
                                    Request Another Reset
                                </Button>
                            </div>
                        )}

                        <div className="text-center">
                            <Link
                                href="/login"
                                className="text-sm text-sky-500 hover:text-sky-600 dark:text-sky-400"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

