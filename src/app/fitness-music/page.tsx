"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChevronRight } from 'lucide-react'
import Image from "next/image"
import { videos } from "./videos"
import { VideoCard } from "./video-card"
import LayoutPage from "../dashboard/LayoutPage"


export default function FitnessMusic() {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const categories = [
        "All",
        "High Energy",
        "HIIT",
        "Running",
        "Cardio",
        "Strength",
        "Yoga",
        "Cool Down",
        "Meditation"
    ]

    const filteredVideos = selectedCategory === "All"
        ? videos
        : videos.filter((video: { category: string }) => video.category === selectedCategory)

    return (
        <LayoutPage>
            {/* Hero Section */}
            <div className="relative h-[250px] w-full p-0 lg:h-[400px]">
                <Image
                    src="/img/vibes.webp"
                    alt="Fitness motivation"
                    className="object-cover"
                    fill
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30">
                    <div className="container flex h-full max-w-6xl text-white flex-col justify-center gap-4 p-4">
                        <h1 className="max-w-2xl text-3xl font-bold tracking-tight lg:text-6xl">
                            Power Your Workout with Perfect Beats
                        </h1>
                        <p className="max-w-xl text-base text-[#ffff] lg:text-lg">
                            Discover curated playlists that match your workout intensity and help you achieve your fitness goals.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button className="rounded-full bg-primary px-6 py-2">
                                Start Your Workout
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="sticky top-0 z-20 border-b bg-background/95 px-5 mx-auto max-sm:px-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <ScrollArea className="w-full py-4 px-4">
                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={category === selectedCategory ? "default" : "secondary"}
                                className="rounded-full whitespace-nowrap px-4"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
            </div>

            {/* Video Grid */}
            <div className="container max-w-7xl py-6 px-5 mx-auto">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </LayoutPage>
    )
}

