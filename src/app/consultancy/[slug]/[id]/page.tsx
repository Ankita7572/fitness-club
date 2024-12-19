import React, { use } from 'react'

import { Card } from '@/components/ui/card'
import { Bone, Activity, HandIcon as Hands, HeartPulse, MonitorIcon as Running, Brain, Diamond, MapPin, Star, Gem } from 'lucide-react'
import Link from 'next/link'
import LayoutPage from '@/app/dashboard/LayoutPage';

export default function Page(props: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug } = use(props.params);



    const experts = [
        {
            name: "Dr. Sarah Johnson",
            image: "/img/webpage/gl_1.jpg",
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "15+ years experience in sports rehabilitation and manual therapy. Specialized in treating professional athletes and complex injuries.",
            location: "London",
            rating: "4.9",
            gems: "25",
            totalGems: "80"
        },
        {
            name: "Dr. Michael Chen",
            image: "/img/webpage/gl_1.jpg",
            certification: "MPT, Orthopedic Certified Specialist",
            description: "Expert in post-surgical rehabilitation and spine care. Former team physiotherapist for national sports teams.",
            location: "New York",
            rating: "4.8",
            gems: "30",
            totalGems: "65"
        },
        {
            name: "Dr. Emma Thompson",
            image: "/img/webpage/gl_1.jpg",
            certification: "PhD in Rehabilitation Sciences",
            description: "Specializes in neurological rehabilitation and chronic pain management. Published researcher in physiotherapy techniques.",
            location: "Melbourne",
            rating: "4.7",
            gems: "20",
            totalGems: "50"
        },
        {
            name: "Dr. Sarah Johnson",
            image: "/img/webpage/gl_1.jpg",
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "15+ years experience in sports rehabilitation and manual therapy. Specialized in treating professional athletes and complex injuries.",
            location: "London",
            rating: "4.9",
            gems: "25",
            totalGems: "80"
        },
        {
            name: "Dr. Michael Chen",
            image: "/img/webpage/gl_1.jpg",
            certification: "MPT, Orthopedic Certified Specialist",
            description: "Expert in post-surgical rehabilitation and spine care. Former team physiotherapist for national sports teams.",
            location: "New York",
            rating: "4.8",
            gems: "30",
            totalGems: "65"
        },
        {
            name: "Dr. Emma Thompson",
            image: "/img/webpage/gl_1.jpg",
            certification: "PhD in Rehabilitation Sciences",
            description: "Specializes in neurological rehabilitation and chronic pain management. Published researcher in physiotherapy techniques.",
            location: "Melbourne",
            rating: "4.7",
            gems: "20",
            totalGems: "50"
        },
        {
            name: "Dr. Sarah Johnson",
            image: "/img/webpage/gl_1.jpg",
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "15+ years experience in sports rehabilitation and manual therapy. Specialized in treating professional athletes and complex injuries.",
            location: "London",
            rating: "4.9",
            gems: "25",
            totalGems: "80"
        },
        {
            name: "Dr. Michael Chen",
            image: "/img/webpage/gl_1.jpg",
            certification: "MPT, Orthopedic Certified Specialist",
            description: "Expert in post-surgical rehabilitation and spine care. Former team physiotherapist for national sports teams.",
            location: "New York",
            rating: "4.8",
            gems: "30",
            totalGems: "65"
        },
        {
            name: "Dr. Emma Thompson",
            image: "/img/webpage/gl_1.jpg",
            certification: "PhD in Rehabilitation Sciences",
            description: "Specializes in neurological rehabilitation and chronic pain management. Published researcher in physiotherapy techniques.",
            location: "Melbourne",
            rating: "4.7",
            gems: "20",
            totalGems: "50"
        }
    ];


    return (
        <LayoutPage>
            <div className="container mx-auto p-4">
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Expert in  {slug.replace("-", " ")} Services
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
            </div>
        </LayoutPage>
    )
}