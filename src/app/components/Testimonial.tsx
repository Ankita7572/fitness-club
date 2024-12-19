'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Testimonials() {
    const [activeTestimonial, setActiveTestimonial] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const testimonials = [
        {
            quote: "The personalized fitness tracking and training programs at this gym have truly transformed my approach to wellness. The environment is motivating, and the team ensures you stay on track to achieve your goals.",
            author: "Jesmin Narayon",
            position: "Ceo & Founder",
            image: "/img/webpage/cl_1.jpg"
        },
        {
            quote: "This gym provides an incredible combination of advanced fitness tracking tools and professional guidance. It’s perfect for anyone looking to push their limits and monitor their progress effectively.",
            author: "Sarah Johnson",
            position: "Fitness Trainer",
            image: "/img/webpage/cl_2.jpg"
        },
        {
            quote: "As an athlete, precision and tracking are key to my performance. This gym delivers top-notch fitness tracking systems and challenging routines to keep me at the top of my game.",
            author: "Mike Anderson",
            position: "Professional Athlete",
            image: "/img/webpage/cl_3.jpg"
        },
        {
            quote: "Fitness tracking at this gym goes beyond numbers; it helps you connect with your body. Whether it's yoga or strength training, their approach is holistic and supportive.",
            author: "Emma Wilson",
            position: "Yoga Instructor",
            image: "/img/webpage/cl_4.jpg"
        }
    ]

    useEffect(() => {
        if (!isHovered) {
            intervalRef.current = setInterval(() => {
                setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
            }, 7000) // Change testimonial every 5 seconds
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isHovered, testimonials.length])

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    return (
        <div
            className="relative mt-10 pt-16 z-10 h-[600px] bg-black bg-opacity-75 flex items-center justify-center px-4" id='testimonial'
            style={{
                backgroundImage: "url('/img/webpage/testimonial.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container -mt-[25rem] mx-auto max-w-6xl">
                <div className="text-center mb-7">
                    <h3 className="text-[#257ebe] text-lg font-medium mb-2">Testimonials</h3>
                    <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">WHAT OUR CLIENTS SAY</h2>
                    <div className="w-24 h-1 bg-[#257ebe] mx-auto mt-4"></div>
                </div>

                <div
                    className="relative mb-8"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className={cn(
                                "absolute top-0 left-0 w-full transition-opacity duration-500",
                                index === activeTestimonial ? "opacity-100 z-10" : "opacity-0 z-0"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: index === activeTestimonial ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-transparent border-none">
                                <div className="flex flex-col items-center">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-4 border-[#257ebe]">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            width={128}
                                            height={128}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <blockquote className="text-white text-lg md:text-xl lg:text-2xl italic text-center max-w-3xl mb-8">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <div className="text-center">
                                        <h4 className="text-white text-xl md:text-2xl font-bold mb-2">{testimonial.author}</h4>
                                        <p className="text-zinc-400">{testimonial.position}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center absolute z-30 bottom-5 left-0 right-0 items-center gap-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTestimonial(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-300",
                                index === activeTestimonial
                                    ? "bg-[#257ebe] w-8"
                                    : "bg-white/50 hover:bg-white/75"
                            )}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

