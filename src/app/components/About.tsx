'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import NumberTicker from '@/components/ui/number-ticker'

export default function About() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="container mx-auto px-4 pb-5 -mt-16 max-sm:mt-0 overflow-hidden" id='about'>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div
                        className="space-y-4 transform transition-transform duration-1000 ease-out"
                        style={{
                            transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
                            opacity: isVisible ? 1 : 0,
                        }}
                    >
                        <h3 className="text-[#257ebe] text-xl font-semibold">
                            About The Pulse Gym
                        </h3>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight relative pb-6">
                            WE ALWAYS PROVIDE BEST FITNESS SERVICE FOR 25 YEARS
                            <span className="absolute bottom-0 left-0 w-24 h-1 bg-[#257ebe]"></span>
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-600 dark:text-gray-300">
                                <span className="font-semibold mr-1 dark:text-gray-200 text-black">Pulse – Fitness Center</span> is a professional fitness training center. We provide all kinds of fitness training and we have all modern instruments.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                On the other hand, we denounce with righteous indignation the fault anuals dislike men who are so beguiled and demoralized by the nuhgilcharms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound toen sue.
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div
                        className="grid grid-cols-3 gap-4 transform transition-transform duration-1000 delay-300 ease-out"
                        style={{
                            transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
                            opacity: isVisible ? 1 : 0,
                        }}
                    >
                        <div>
                            <h3 className="text-4xl lg:text-5xl font-bold text-[#257ebe]"><NumberTicker value={10} />k</h3>
                            <p className="text-gray-600 mt-2">CLIENTS</p>
                        </div>
                        <div>
                            <h3 className="text-4xl lg:text-5xl font-bold text-[#257ebe]"><NumberTicker value={25} />+</h3>
                            <p className="text-gray-600 mt-2">TRAINERS</p>
                        </div>
                        <div>
                            <h3 className="text-4xl lg:text-5xl font-bold text-[#257ebe]"><NumberTicker value={120} />+</h3>
                            <p className="text-gray-600 mt-2">EQUIPMENTS</p>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div
                    className="w-full lg:w-1/2 relative"
                    style={{
                        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
                        opacity: isVisible ? 1 : 0,
                        transition: 'transform 1000ms ease-out, opacity 1000ms ease-out',
                        transitionDelay: '600ms',
                    }}
                >
                    <div className="relative h-[600px] w-full rounded-lg overflow-hidden ">

                        <Image
                            src="/img/webpage/about-2.png"
                            alt="Fitness Trainer"
                            fill
                            className="object-contain"
                            priority
                        />

                    </div>
                </div>
            </div>
        </section>
    )
}

