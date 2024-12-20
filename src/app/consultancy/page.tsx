import React from 'react'

import { Card } from '@/components/ui/card'
import { Bone, Activity, HandIcon as Hands, HeartPulse, MonitorIcon as Running, Brain, Diamond, MapPin, Star, Gem, Phone } from 'lucide-react'
import Link from 'next/link'
import LayoutPage from '../dashboard/LayoutPage'

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


    const experts = [
        {
            id: 1,
            name: "Amy Harmer",
            image: "/img/consultant/Amy-Harmer.jpg",
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "Amy spent a couple of years working alongside an amateur rugby club based in Doncaster providing weekly MSK clinics and pitch-side first aid for first team players.",
            location: "Northampton, England",
            contact_number: "01604 601641",
            
        },
        {
            id: 2,
            name: "Lucy Eggleton",
            image: "/img/consultant/lucy.jpg",
            certification: "MPT, Orthopedic Certified Specialist",
            description: " She has insight and knowledge of multiple sports disciplines, from grassroots to elite level, reinforced by her own prior experiences as a national-level gymnast.",
            location: "Northampton, England",
            contact_number: "01604 601641",
           
        },
        {
            id: 3,
            name: "Marc Evans",
            image: "/img/consultant/marc.jpg",
            certification: "PhD in Rehabilitation Sciences",
            description: "Marc is known for his excellent diagnostic skills and hands-on approach to back and neck issues, sports and work injuries and conditions.",
            location: "Northampton, England",
            contact_number: "01604 601641",
           
        },
        {
            id: 4,
            name: "Phil Pask",
            image: "/img/consultant/Phil_Pask.jpg",
            certification: "PhD in Rehabilitation Sciences",
            description: "Phil is one of the world’s best Physiotherapists at rehabilitation and the treatment of acute and chronic musculoskeletal injuries.",
            location: "Northampton, England",
            contact_number: "01604 601641",
           
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
                                className="w-16 h-16 rounded-full object-cover"
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

                                    {/* contact_number */}
                                    <div className="flex items-center gap-1">
                                        <Phone className="w-4 h-4 text-sky-400 " />
                                        <span className="text-sm text-gray-600">{expert.contact_number}</span>
                                    </div>

                                    {/* Total Gems */}
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutPage>
    )
}