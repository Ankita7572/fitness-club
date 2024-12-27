'use client'
import React from 'react'

import { Card } from '@/components/ui/card'
import { Bone, Activity, HandIcon as Hands, HeartPulse, MonitorIcon as Running, Brain, Diamond, MapPin, Star, Gem, Phone } from 'lucide-react'
import Link from 'next/link'
import LayoutPage from '../dashboard/LayoutPage'

export default function Consultancy() {
    const services = [
        {
            id: 1,
            title: "Orthopedist",
            description: "Bone & Joint Specialists | Fracture Care | Sports Injuries",
            icon: Bone,
            color: "bg-blue-100 hover:bg-blue-200",
            textColor: "text-blue-900",
        },
        {
            id: 2,
            title: "Physical therapist",
            description: "Rehabilitation Programs | Pain Management | Mobility Improvement",
            icon: Activity,
            color: "bg-orange-100 hover:bg-orange-200",
            textColor: "text-orange-900",
        },
        {
            id: 3,
            title: "Massage therapist",
            description: "Muscle Relaxation | Stress Relief | Injury Recovery",
            icon: Hands,
            color: "bg-rose-100 hover:bg-rose-200",
            textColor: "text-rose-900",
        },
        {
            id: 4,
            title: "Exercise physiologist",
            description: "Fitness Assessment | Exercise Prescription| Health Education ",
            icon: HeartPulse,
            color: "bg-green-100 hover:bg-green-200",
            textColor: "text-green-900",
        },
        {
            id: 5,
            title: "Athletic trainer",
            description: "Injury Prevention | Emergency Care | Rehabilitation Techniques",
            icon: Running,
            color: "bg-yellow-100 hover:bg-yellow-200",
            textColor: "text-yellow-900",
        },
        {
            id: 6,
            title: "Physiatrist",
            description: "Physical Medicine | Rehabilitation | Non-Surgical Treatments",
            icon: Brain,
            color: "bg-purple-100 hover:bg-purple-200",
            textColor: "text-purple-900",
        },
    ]

    const formatRouteTitle = (title: string) => {
        const words = title.split(' ')
        if (words.length === 2) {
            return words.join('-').toLowerCase()
        }
        return title.toLowerCase()
    }

    return (
        <LayoutPage>
            <div className="container mx-auto p-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Expert Health & Fitness Consultants
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={`/consultancy/${formatRouteTitle(service.title)}`}
                            className="h-full" // Make Link element full height
                        >
                            <Card
                                className={`h-full p-6 transition-colors duration-300 ${service.color}`}
                            >
                                <div className="flex items-start gap-4 h-full">
                                    <div className="p-2 rounded-lg bg-white/80">
                                        <service.icon className={`w-8 h-8 ${service.textColor}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className={`text-xl font-bold ${service.textColor}`}>
                                            {service.title}
                                        </h3>
                                        <p className={`text-sm ${service.textColor}/80`}>
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </LayoutPage>
    )
}