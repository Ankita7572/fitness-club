import React, { use } from 'react'

import { Card } from '@/components/ui/card'
import { Bone, Activity, HandIcon as Hands, HeartPulse, MonitorIcon as Running, Brain, Diamond, MapPin, Star, Gem, Phone } from 'lucide-react'
import Link from 'next/link'
import LayoutPage from '@/app/dashboard/LayoutPage';

export default function Page(props: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug } = use(props.params);



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
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "Phil is one of the world’s best Physiotherapists at rehabilitation and the treatment of acute and chronic musculoskeletal injuries",
            location: "Northampton, England",
            contact_number: "01604 601641",
           
        },
       
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
            </div>
        </LayoutPage>
    )
}