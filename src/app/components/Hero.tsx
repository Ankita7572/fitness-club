'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const slides = [
    {
        id: 1,
        image: '/img/webpage/home3-slider2.jpg',
        subtitle: "Welcome to Fitness Club",
        title: "Discover a World of Opportunities",
    },
    {
        id: 2,
        image: '/img/webpage/slider1.jpg',
        title: "Experience the Future Today!",
        subtitle: "Innovation at Your Fingertips",
    }
]

function NextArrow(props: any) {
    const { onClick } = props
    return (
        <button
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={onClick}
        >
            <ChevronRight className="h-6 w-6" />
        </button>
    )
}

function PrevArrow(props: any) {
    const { onClick } = props
    return (
        <button
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={onClick}
        >
            <ChevronLeft className="h-6 w-6" />
        </button>
    )
}

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dotsClass: 'slick-dots custom-dots',
        beforeChange: (oldIndex: number, newIndex: number) => {
            setCurrentSlide(newIndex)
        },
    }

    return (
        <div className="relative">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={slide.id} className="relative h-[800px] max-sm:h-[450px] w-full">
                        <Image
                            src={slide.image}
                            alt="Hero background"
                            fill
                            className="object-cover brightness-50"
                            priority={index === 0}
                        />
                        <div className="absolute -top-32 max-sm:top-8 inset-0 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
                            <h2
                                className={`mb-4 text-6xl max-sm:text-3xl font-bold text-[#257ebe] transition-all duration-1000 ease-out ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                {slide.subtitle}
                            </h2>
                            <h1
                                className={`mb-8 text-7xl max-sm:text-4xl font-bold text-white transition-all duration-1000 ease-out ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                    transitionDelay: '0.4s',
                                }}
                            >
                                {slide.title}
                            </h1>
                            <div
                                className={`flex max-sm:grid gap-4 transition-all duration-1000 ease-out ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{ transitionDelay: '0.6s' }}
                            ><Link href="/login">
                                <Button
                                    variant="outline"
                                    className="border-2 rounded-3xl border-[#257ebe] bg-transparent px-8 py-6 text-lg font-semibold text-white hover:bg-[#257ebe] hover:text-white transition-all duration-300"
                                >
                                    JOIN WITH US
                                </Button>
                                </Link>
                                <Link href="/login">
                                <Button className="border-2 rounded-3xl border-[#257ebe] bg-[#257ebe] px-8 py-6 text-lg font-semibold text-white hover:bg-[#257ebe]/90 transition-all duration-300">
                                    READ MORE
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <style jsx global>{`
                .custom-dots {
                    bottom: 25px !important;
                }
                .custom-dots li button:before {
                    font-size: 12px !important;
                    color: white !important;
                    opacity: 0.5;
                }
                .custom-dots li.slick-active button:before {
                    opacity: 1;
                }

                .slick-slide > div > div {
                    display: flex !important;
                }
            `}</style>
        </div>
    )
}

