"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Stethoscope, UtensilsCrossed, LogOut } from 'lucide-react'
import Image from 'next/image'

export function MainNav() {
    const pathname = usePathname()

    const navItems = [
        { href: "/dashboard", icon: Home, label: "Dashboard" },
        { href: "/profile", icon: User, label: "Profile" },
        { href: "/consultancy", icon: Stethoscope, label: "Consultancy" },
        { href: "/restaurant", icon: UtensilsCrossed, label: "Restaurants" },
    ]

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === href
        }
        return pathname.startsWith(href)
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex h-14 items-center border-b border-border px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Image src="/img/logo.png" alt='logo' width={120} height={60} className='w-32 h-24' />
                </Link>
            </div>
            <div className="overflow-y-auto">
                <nav className="space-y-2 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-accent-foreground ${isActive(item.href)
                                    ? "bg-sky-600 text-white"
                                    : "text-muted-foreground hover:bg-accent"
                                }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto border-t border-border p-4 space-y-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground hover:bg-accent">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

