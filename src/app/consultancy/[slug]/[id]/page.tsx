'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { MapPin, Mail, Phone, Briefcase } from 'lucide-react'
import Image from 'next/image'
import LayoutPage from '@/app/dashboard/LayoutPage'
import expertsData from '../../expertsData'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PageProps {
    params: Promise<{
        slug: string;
        id: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const { slug, id } = resolvedParams;

    const experts = expertsData[slug as keyof typeof expertsData];

    if (!experts) {
        notFound();
    }

    const expert = experts.find(e => e.id.toString() === id);

    if (!expert) {
        notFound();
    }

    const [isBooking, setIsBooking] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const toggleBooking = () => setIsBooking(!isBooking);

    return (
        <LayoutPage>
            <div className="container mx-auto p-4">
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Expert in {slug.replace("-", " ")} Services
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <Card className={`bg-white rounded-xl p-6 shadow-md shadow-slate-500 border border-gray-300 transition-all duration-300 ${isBooking ? 'lg:w-2/3' : 'w-full'}`}>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3">
                                <Image
                                    src={expert.image}
                                    alt={expert.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                            <div className="md:w-2/3">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{expert.name}</h2>
                                <p className="text-lg text-gray-700 mb-4">{expert.profession}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-gray-500" />
                                        <span>{expert.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-gray-500" />
                                        <span>{expert.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-5 h-5 text-gray-500" />
                                        <span>{expert.contact_number}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-gray-500" />
                                        <span>{expert.profession}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">About</h3>
                                <p className="text-gray-700 mb-4">{expert.description}</p>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise</h3>
                                        <p className="text-gray-700">{expert.certification}</p>
                                    </div>

                                    <Button onClick={toggleBooking} className="mt-4 bg-sky-500 hover:bg-sky-400">
                                        {isBooking ? 'Hide Booking' : 'Book Consultation'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {isBooking && (
                        <Card className="bg-white rounded-xl p-6 shadow-md shadow-slate-500 border border-gray-300 lg:w-1/3">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Consultation</h3>
                            <div className="mb-4">
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Select Date</h4>
                                <CalendarComponent
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border"
                                />
                            </div>
                            <div className="mb-4">
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Select Time</h4>
                                <Select onValueChange={setSelectedTime}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="09:00">09:00 AM</SelectItem>
                                        <SelectItem value="10:00">10:00 AM</SelectItem>
                                        <SelectItem value="11:00">11:00 AM</SelectItem>
                                        <SelectItem value="14:00">02:00 PM</SelectItem>
                                        <SelectItem value="15:00">03:00 PM</SelectItem>
                                        <SelectItem value="16:00">04:00 PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-sky-500 hover:bg-sky-400">Book Now</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Why Book {expert.name}?</DialogTitle>
                                        <DialogDescription>
                                            <ul className="list-disc list-inside mt-2">
                                                <li>Extensive experience in {expert.profession}</li>
                                                <li>{expert.certification}</li>
                                                <li>Specialized in {expert.certification || 'various treatments'}</li>
                                                <li>Conveniently located in {expert.location}</li>
                                                <li>Personalized care and attention to your needs</li>
                                            </ul>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Button onClick={() => alert('Booking confirmed!')}>Confirm Booking</Button>
                                </DialogContent>
                            </Dialog>
                        </Card>
                    )}
                </div>
            </div>
        </LayoutPage>
    )
}