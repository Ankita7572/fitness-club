import React from 'react'

interface CircularProgressBarProps {
    value: number
    color: string
    size: 'sm' | 'md' | 'lg'
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ value, color, size }) => {
    const radius = size === 'sm' ? 20 : size === 'md' ? 30 : 40
    const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8
    const circumference = 2 * Math.PI * radius

    const progress = value / 100
    const dashoffset = circumference * (1 - progress)

    const sizeClass = size === 'sm' ? 'w-12 h-12' : size === 'md' ? 'w-20 h-20' : 'w-24 h-24'

    return (
        <div className={`relative ${sizeClass}`}>
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-gray-200"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                />
                <circle
                    className={`text-${color}-600`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                    style={{
                        transformOrigin: '50% 50%',
                        transform: 'rotate(-90deg)',
                        transition: 'stroke-dashoffset 0.35s',
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-semibold ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'} text-gray-700`}>
                    {value}%
                </span>
            </div>
        </div>
    )
}

