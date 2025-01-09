'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

export default function Membership() {
    const classes = [
        {
            title: "VINYASA FLOW",
            category: "Yoga & Meditation",
            image: "/img/webpage/class_4.jpg",
            description:
                "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms...",
            students: "25 Per Shift",
            price: "£80",
        },
        {
            title: "ASTANGA YOGA",
            category: "Yoga & Meditation",
            image: "/img/webpage/fitness-yoga.webp",
            description:
                "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms...",
            students: "25 Per Shift",
            price: "£80",
        },
        {
            title: "FITNESS FREE CLASS",
            category: "Boxing & Sports",
            image: "/img/webpage/class_6.jpg",
            description:
                "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms...",
            students: "115 Per Shift",
            price: "£125",
        },
    ]

    return (
        <div className="relative py-16 md:py-24" id="membership" style={{
            backgroundImage: "url('/img/webpage/classes.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="relative z-10 bg-black bg-opacity-75">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-[#257ebe] text-lg font-medium mb-2">Choose Your Classes</h3>
                        <h2 className="text-white text-3xl md:text-4xl font-bold">UPCOMING CLASSES</h2>
                        <div className="w-24 h-1 bg-[#257ebe] mx-auto mt-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {classes.map((classItem, index) => (
                            <Card key={index} className="group bg-zinc-900 border-none hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="p-0">
                                    <div className="relative aspect-[5/3] overflow-hidden">
                                        <Image
                                            src={classItem.image}
                                            alt={classItem.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute left-0 bottom-0 z-10">
                                            <span className="inline-block bg-[#257ebe] justify-center px-6 py-2 text-sm font-medium text-white">
                                                {classItem.category}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3">{classItem.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{classItem.description}</p>
                                </CardContent>
                                <CardFooter className="grid grid-cols-2 border-t bg-[#257ebe] border-zinc-700 p-0">
                                    <div className="text-center p-4 border-r border-zinc-700">
                                        <p className="text-sm font-medium text-zinc-200">Class Student</p>
                                        <p className="text-lg font-bold text-white">{classItem.students}</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <p className="text-sm font-medium text-zinc-200">Course Price</p>
                                        <p className="text-lg font-bold text-white">{classItem.price}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

