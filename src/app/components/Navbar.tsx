'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = ['Home', 'About', 'Services', 'Contact']

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-black backdrop-blur-md shadow-sm' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center">
                        <Image src="/img/logo.png" alt='logo' width={120} height={60} className='w-24 h-12' />
                    </Link>

                    <nav className="hidden  items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase()}#${item.toLowerCase()}`}
                                className={`px-3 py-2 rounded-md text-xl font-semibold hover:bg-[#257ebe] hover:text-white  transition-colors ${scrolled
                                    ? 'text-foreground hover:bg-muted'
                                    : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}


                    </nav>
                    <Link href="/login">
                        <Button variant="outline" size="lg" className="ml-4  block text-lg font-semibold shadow-slate-400 shadow-md">
                            Login
                        </Button>
                    </Link>

                    <div className="hidden">

                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 bg-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6 " /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="hidden bg-white text-black ">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase()}#${item.toLowerCase()}`}
                                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link href="/login">
                            <Button variant="outline" className="w-full mt-2">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

