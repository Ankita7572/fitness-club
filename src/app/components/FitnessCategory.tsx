'use client'

import { useState } from 'react'
import { User, Dumbbell, SpaceIcon as Yoga, Accessibility } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
    {
        id: 1,
        title: 'WEIGHT TRAINING',
        description: "Strengthen your muscles and enhance endurance with focused weight training sessions designed for all fitness levels.",
        image: '/img/webpage/lose-weight.jpg',
        icon: Accessibility,
        color: 'from-slate-800/30',
    },
    {
        id: 2,
        title: 'BODY BUILDING',
        description: "Transform your physique and build muscle definition with structured bodybuilding exercises and plans.",
        image: '/img/webpage/body-building.jpg',
        icon: User,
        color: 'from-sky-600/80',
    },
    {
        id: 3,
        title: 'YOGA FITNESS',
        description: "Achieve flexibility, balance, and inner peace through comprehensive yoga fitness practices.",
        image: '/img/webpage/yoga.jpg',
        icon: Yoga,
        color: 'from-slate-700/40',
    },
]

export default function FitnessCategories() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <div className="container relative z-20 bg-transparent mx-auto px-4 py-8 md:py-16 lg:-top-44">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 max-md:gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group relative h-[400px] overflow-hidden"
                        onMouseEnter={() => setHoveredId(category.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            backgroundImage: `url(${category.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div
                            className={`
                                absolute inset-0 
                                ${hoveredId === category.id
                                    ? 'bg-transparent translate-y-10'
                                    : `translate-y-0 opacity-100 bg-gradient-to-b ${category.color} to-black/50`
                                } 
                                transition-all duration-300 ease-in-out
                            `}
                        >
                            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                                {hoveredId === category.id ? (
                                    <Button
                                        variant="outline"
                                        className="border-2 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        READ MORE
                                    </Button>
                                ) : (
                                    <>
                                        <category.icon className="mb-4 h-16 w-16 p-3 rounded-full bg-sky-600 text-white" strokeWidth={1.5} />
                                        <h3 className="mb-3 text-xl font-bold text-white">{category.title}</h3>
                                        <p className="text-white/90 text-base">{category.description}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

