import React from 'react'
import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { MapPin, Phone, Mail } from 'lucide-react'
import LayoutPage from '@/app/dashboard/LayoutPage'
import Link from 'next/link'
import expertsData from '../expertsData'
import BackButton from '@/components/BackButton'

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const experts = expertsData[slug] || []

    if (experts.length === 0) {
        notFound()
    }

    return (
        <LayoutPage>
            <div className="container mx-auto p-4">
                <div className="text-center lg:flex lg:flex-row flex-col  mb-5">
                    <BackButton/>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">
                        Experts in {slug.replace("-", " ")} Services
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {experts.map((expert) => (
                        <Link href={`/consultancy/${slug}/${expert.id}`} key={expert.id} className="h-full">
                            <Card className="h-full bg-white rounded-xl p-6 shadow-md shadow-slate-500 border border-gray-300 hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                <div className="flex flex-col sm:flex-row items-center gap-6 h-full">
                                    {/* Profile Image */}
                                    <div className="shrink-0">
                                        <img
                                            src={expert.image}
                                            alt={expert.name}
                                            className="w-32 h-32 rounded-full object-cover"
                                        />
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{expert.name}</h2>
                                        <p className="text-lg text-gray-700 mb-2">{expert.profession}</p>
                                        <p className="text-md text-gray-500 mb-4">{expert.certification}</p>

                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                                <MapPin className="w-5 h-5 text-gray-400" />
                                                <span className="text-md text-gray-600">{expert.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                                <Phone className="w-5 h-5 text-sky-400" />
                                                <span className="text-md text-gray-600">{expert.contact_number}</span>
                                            </div>
                                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <span className="text-md text-gray-600">{expert.email}</span>
                                            </div>
                                        </div>
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