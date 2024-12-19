"use client"

import { useState, useEffect } from 'react'
import { Home, BarChart2, Calendar, Settings, User2, Bell, ChevronRight, ChevronLeft, Menu, UtensilsCrossed, Stethoscope, User } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/consultancy", icon: Stethoscope, label: "Consultancy" },
    { href: "/restaurant", icon: UtensilsCrossed, label: "Restaurants" },
]

interface NavSidebarProps {
    isExpanded: boolean;
    onToggle: () => void;
}

export function NavSidebar({ isExpanded, onToggle }: NavSidebarProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const SidebarContent = () => (
        <>
            <div className="p-3">
                <div className="h-8 w-8 invisible rounded-lg bg-sky-700 flex items-center justify-center">
                    <span className="text-black font-bold">N</span>
                </div>
            </div>
            <nav className="flex-1 px-2 py-4">
                <div className="space-y-2">
                    {navItems.map((item, index) => (
                        <TooltipProvider key={index}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex h-10 items-center rounded-full",
                                            "hover:bg-[#51acee] hover:text-gray-100 transition-colors",
                                            index === 0 && "bg-[#257ebe] text-white",
                                            isExpanded || isMobile ? "px-3" : "justify-center w-10"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        {(isExpanded || isMobile) && <span className="ml-3">{item.label}</span>}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-zinc-800 text-white">
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </nav>
            <div className="p-4">
                <div className="space-y-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/profile"
                                    className={cn(
                                        "flex h-10 items-center rounded-full hover:bg-zinc-800",
                                        isExpanded || isMobile ? "px-3" : "justify-center w-10"
                                    )}
                                >
                                    <User2 className="h-5 w-5 flex-shrink-0" />
                                    {(isExpanded || isMobile) && <span className="ml-3">Profile</span>}
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-zinc-800 text-white">
                                Profile
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </>
    )

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="fixed border rou bg-white text-black left-4 top-4 z-50 md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[200px] bg-zinc-900 text-white p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div className={cn(
            "fixed left-0 top-0 h-full bg-zinc-900 text-white transition-all duration-300 z-20 hidden md:block",
            isExpanded ? "w-48" : "w-16"
        )}>
            <SidebarContent />
            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-zinc-900 text-white rounded-full"
                onClick={onToggle}
            >
                {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
        </div>
    )
}

