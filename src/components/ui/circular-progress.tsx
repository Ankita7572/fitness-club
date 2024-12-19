"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps {
    value: number
    color?: "sky" | "yellow" | "red"
    size?: "sm" | "md" | "lg"
    className?: string
    showValue?: boolean
}

export function CircularProgress({
    value,
    color = "sky",
    size = "md",
    className,
    showValue = false,
}: CircularProgressProps) {
    const radius = size === "sm" ? 20 : size === "md" ? 25 : 30
    const strokeWidth = size === "sm" ? 2 : size === "md" ? 2.5 : 3
    const normalizedRadius = radius - strokeWidth / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (value / 100) * circumference

    const getColor = (color: string) => {
        switch (color) {
            case "sky":
                return "rgb(37, 126, 190)" // Tailwind lime-500
            case "yellow":
                return "rgb(234, 179, 8)" // Tailwind yellow-500
            case "red":
                return "rgb(239, 68, 68)" // Tailwind red-500
            default:
                return "rgb(37, 126, 190)"
        }
    }

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-white/10"
                />
                {/* Progress circle */}
                <circle
                    stroke={getColor(color)}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-300 ease-in-out"
                />
            </svg>
            {showValue && (
                <span className="absolute text-sm font-medium text-white">{value}%</span>
            )}
        </div>
    )
}

