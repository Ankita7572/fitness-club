"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Youtube, ArrowUp } from 'lucide-react'
import Image from "next/image";
import Link from "next/link"

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-zinc-900 text-white" id="contact">
            {/* Navigation */}
            <div className="container mx-auto px-4 py-6 flex flex-wrap justify-between items-center border-b border-zinc-800">
                <nav className="flex invisible flex-wrap gap-6">
                    <Link href="/#" className="hover:text-[#257ebe] transition-colors">
                        HOME
                    </Link>
                    <Link href="/about#about" className="hover:text-[#257ebe] transition-colors">
                        ABOUT
                    </Link>
                    <Link href="/testimonial#testimonial" className="hover:text-[#257ebe] transition-colors">
                        Testimonial
                    </Link>
                    <Link href="/mentorship#mentorship" className="hover:text-[#257ebe] transition-colors">
                        Mentorship
                    </Link>
                    <Link href="/blog#blog" className="hover:text-[#257ebe] transition-colors">
                        BLOG
                    </Link>

                </nav>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <Link href="#" className="bg-[#257ebe] p-2 rounded-full hover:bg-[#257ebe] transition-colors">
                        <Facebook className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="bg-[#257ebe] p-2 rounded-full hover:bg-[#257ebe] transition-colors">
                        <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="bg-[#257ebe] p-2 rounded-full hover:bg-[#257ebe] transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="bg-[#257ebe] p-2 rounded-full hover:bg-[#257ebe] transition-colors">
                        <Youtube className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Company Info */}
                    <div className="-mt-6">
                        <Image src="/img/logo.png" alt='logo' width={120} height={60} className='w-32 h-24' />
                        <p className="text-zinc-400">
                            Pluse – Fitness Center is a professional fitness training center. Commercial publishing platforms and content management systems ensure that you can show different text, different data using the same template.
                        </p>
                    </div>

                    {/* Address */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-[#257ebe]">ADDRESS</h2>
                        <div className="space-y-4 text-zinc-400">
                            <p>
                                Pluse - Fitness Center 2165 Aurora Rd, Bedford Heights, OH 6543 North London, UK
                            </p>
                            <p>330-341-0476</p>
                            <p>support@rstheme.com</p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-[#257ebe]">JOIN WITH US</h2>
                        <p className="text-zinc-400 mb-6">
                            Thank you for visiting us. Please subscribe to our newsletter today for getting regular updates & offers.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Your Email"
                                className="bg-zinc-800 border-zinc-700 text-white"
                            />
                            <Button className="bg-[#257ebe] hover:bg-[#257ebe]">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="container mx-auto px-4 py-6 border-t border-zinc-800">
                <div className="flex justify-between items-center">
                    <p className="text-zinc-400">© 2022 Pluse. Designed by Pulse. All Rights Reserved.</p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-[#257ebe] hover:bg-[#257ebe] rounded-full"
                        onClick={scrollToTop}
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </footer>
    )
}