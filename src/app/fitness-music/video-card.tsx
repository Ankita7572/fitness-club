"use client"

import { Video } from "@/types/video"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Play } from 'lucide-react'
import { useState } from "react"

interface VideoCardProps {
    video: Video
}

export function VideoCard({ video }: VideoCardProps) {
    const [showVideo, setShowVideo] = useState(false)

    return (
        <Card className="group relative overflow-hidden">
            <div className="relative aspect-video">
                {showVideo ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                    />
                ) : (
                    <>
                        <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                            onClick={() => setShowVideo(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <Play className="h-12 w-12 text-white" />
                        </button>
                        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-xs text-white">
                            {video.duration}
                        </div>
                    </>
                )}
            </div>
            <div className="p-3">
                <h3 className="line-clamp-2 text-sm font-semibold">{video.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                    <span>{video.creator}</span>
                    <span>•</span>
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.timeAgo}</span>
                </div>
            </div>
        </Card>
    )
}

