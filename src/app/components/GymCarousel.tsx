'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Plus, PlusCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'


const cardsData = [
    {
        id: 1,
        imageUrl: '/img/webpage/gl_1.jpg',
        alt: 'Weightlifting exercise'
    },
    {
        id: 2,
        imageUrl: '/img/webpage/gl_2.jpg',
        alt: 'Gym training'
    },
    {
        id: 3,
        imageUrl: '/img/webpage/gl_3.jpg',
        alt: 'Fitness workout'
    },
    {
        id: 4,
        imageUrl: '/img/webpage/gl_4.jpg',
        alt: 'Exercise routine'
    },
    {
        id: 5,
        imageUrl: '/img/webpage/gl_5.jpg',
        alt: 'Weightlifting exercise'
    },
    {
        id: 6,
        imageUrl: '/img/webpage/gl_6.jpg',
        alt: 'Gym training'
    },
    {
        id: 7,
        imageUrl: '/img/webpage/gl_7.jpg',
        alt: 'Fitness workout'
    },
    {
        id: 8,
        imageUrl: '/img/webpage/gl_8.jpg',
        alt: 'Exercise routine'
    }
]

export function GymCarousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }

    return (
        <div className="w-full overflow-hidden mx-auto px-0">
            <Slider {...settings}>
                {cardsData.map((card) => (
                    <div key={card.id} className="px-0">

                        <div className="group relative  overflow-hidden bg-black">
                            <img
                                src={card.imageUrl}
                                alt={card.alt}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <PlusCircle className="h-12 w-12 text-white" strokeWidth={1} />
                            </div>
                        </div>
                       
                    </div>
                ))}
            </Slider>
        </div>
    )
}

