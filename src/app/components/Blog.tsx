'use client'

import Slider from "react-slick"
import Image from "next/image"
import { CalendarDays, User } from 'lucide-react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const blogPosts = [
    {
        id: 1,
        title: "Mediation Group Classes Started",
        date: "March 25, 2019",
        author: "admin",
        excerpt: "Discover the benefits of group meditation and how it can transform your daily routine for a healthier mind and body.",
        image: "/img/webpage/post_1.jpg",
    },
    {
        id: 2,
        title: "Ever too late to lose weight?",
        date: "February 22, 2019",
        author: "admin",
        excerpt: "Uncover the myths and truths about weight loss at any age, and start your journey towards a healthier you today.",
        image: "/img/webpage/post_2.jpg",
    },
    {
        id: 3,
        title: "These Men Promptly Escaped",
        date: "February 22, 2019",
        author: "admin",
        excerpt: "A thrilling tale of determination and survival as these individuals defied the odds to find freedom.",
        image: "/img/webpage/post_4.jpg",
    },
    {
        id: 4,
        title: "Advanced Workout Methods",
        date: "February 21, 2019",
        author: "admin",
        excerpt: "Take your fitness routine to the next level with cutting-edge techniques and advanced training methods.",
        image: "/img/webpage/post_5.jpg",
    },
];


export default function Blog() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <section className="py-16 px-4" id="blog">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-[#257ebe] font-medium mb-2">Our Updates</h3>
                    <h2 className="text-4xl font-bold mb-4">OUR RECENT NEWS</h2>
                    <div className="w-24 h-1 bg-[#257ebe] mx-auto"></div>
                </div>

                <Slider {...settings} className="max-w-6xl mx-auto  ">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="px-2 mb-4">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full">
                                <div className="relative h-[200px]">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-4 text-gray-500 text-xs mb-2">
                                        <div className="flex items-center gap-1">
                                            <CalendarDays className="w-3 h-3" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 hover:text-[#257ebe] transition-colors">
                                        <a href="#">{post.title}</a>
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center text-sm text-[#257ebe] hover:text-[#3b8ec9] transition-colors"
                                    >
                                        Read More
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <style jsx global>{`
        .blog-carousel .slick-track {
          display: flex !important;
        }
        .blog-carousel .slick-slide {
          height: inherit !important;
        }
        .blog-carousel .slick-slide > div {
          height: 100%;
        }
        .blog-carousel .slick-dots li button:before {
          font-size: 12px;
          color: #257ebe;
        }
        .blog-carousel .slick-dots li.slick-active button:before {
          color: #257ebe;
        }
        .blog-carousel .slick-prev:before,
        .blog-carousel .slick-next:before {
          color:#257ebe;
        }
      `}</style>
        </section>
    )
}

