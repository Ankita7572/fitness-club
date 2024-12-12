import React from 'react'
import { LayoutPage } from '../dashboard/LayoutPage'
import { Card } from '@/components/ui/card'
import { Bone, Activity, HandIcon as Hands, HeartPulse, MonitorIcon as Running, Brain, Diamond, MapPin, Star, Gem } from 'lucide-react'
import Link from 'next/link'

export default function Consultancy() {
    const services = [
        {id:1,
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
            description: "Fitness Assessment | Exercise Prescription ",
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


    const experts = [
        {
            name: "Dr. Sarah Johnson",
            image: "/img/gl_1.jpg",
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "15+ years experience in sports rehabilitation and manual therapy. Specialized in treating professional athletes and complex injuries.",
            location: "London",
            rating: "4.9",
            gems: "25",
            totalGems: "80"
        },
        {
            name: "Dr. Michael Chen",
            image: "/img/gl_1.jpg",
            certification: "MPT, Orthopedic Certified Specialist",
            description: "Expert in post-surgical rehabilitation and spine care. Former team physiotherapist for national sports teams.",
            location: "New York",
            rating: "4.8",
            gems: "30",
            totalGems: "65"
        },
        {
            name: "Dr. Emma Thompson",
            image: "/img/gl_1.jpg",
            certification: "PhD in Rehabilitation Sciences",
            description: "Specializes in neurological rehabilitation and chronic pain management. Published researcher in physiotherapy techniques.",
            location: "Melbourne",
            rating: "4.7",
            gems: "20",
            totalGems: "50"
        }
    ];

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
                        <Link href={`/consultancy/${formatRouteTitle(service.title)}/${service.id}/`}>
                        <Card
                            key={service.id}
                            className={`p-6 transition-colors duration-300 ${service.color}`}
                        >
                            <div className="flex items-start gap-4">
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

            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Expert Physiotherapy Consultants
                </h1>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {experts.map((expert, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-md shadow-slate-500 border border-gray-300">
                        <div className="flex items-center gap-3">
                            {/* Profile Image */}
                            <img
                                src={expert.image}
                                alt={expert.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            {/* Main Content */}
                            <div className="flex-1">
                                {/* Name and Gems Row */}
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-900">{expert.name}</h3>
                                    
                                </div>

                                {/* Certification */}
                                <p className="text-sm text-gray-500 mb-2">{expert.certification}</p>

                                {/* Description */}
                                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                    {expert.description}
                                </p>

                                {/* Bottom Row */}
                                <div className="flex justify-between items-center">
                                    {/* Location */}
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{expert.location}</span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm text-gray-600">{expert.rating}</span>
                                    </div>

                                    {/* Total Gems */}
                                    <div className="flex items-center gap-1">
                                        <Gem className="w-4 h-4 text-blue-400 fill-blue-400" />
                                        <span className="text-sm text-gray-600">{expert.totalGems}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutPage>
    )
}