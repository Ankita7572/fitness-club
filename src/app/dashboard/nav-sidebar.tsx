"use client"

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Home, BarChart2, Calendar, Settings, User2, Bell, ChevronRight, ChevronLeft, Menu, UtensilsCrossed, Stethoscope, User, LayoutDashboard, LogOut, Headphones } from 'lucide-react'
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
import { auth } from '@/lib/firebase/config'
import { signOut } from 'firebase/auth'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
   
    { href: "/consultancy", icon: Stethoscope, label: "Consultancy" },
    { href: "/restaurant", icon: UtensilsCrossed, label: "Restaurants" },
    { href: "/fitness-music", icon: Headphones, label: "Vibes" },
    { href: "/profile", icon: User, label: "Profile" },
]

interface NavSidebarProps {
    isExpanded: boolean;
    onToggle: () => void;
}

export function NavSidebar({ isExpanded, onToggle }: NavSidebarProps) {
    const [isMobile, setIsMobile] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === href
        }
        return pathname.startsWith(href)
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("userInfo");
            localStorage.removeItem("user_info");
            router.push('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
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
                                            isActive(item.href) && "bg-[#257ebe] text-white",
                                            isExpanded || isMobile ? "px-3" : "justify-center w-10"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "h-5 w-5 flex-shrink-0",
                                            isActive(item.href) && "text-white"
                                        )} />
                                        {(isExpanded || isMobile) && (
                                            <span className={cn(
                                                "ml-2",
                                                isActive(item.href) && "font-semibold"
                                            )}>
                                                {item.label}
                                            </span>
                                        )}
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
            <div className="p-2 mt-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className={cn(
                                            "flex h-10 items-center rounded-full gap-1 hover:bg-zinc-800 w-full",
                                            isExpanded || isMobile ? "px-3 justify-start" : "justify-center w-10"
                                        )}
                                    >
                                        <LogOut className="h-5 w-5 flex-shrink-0" />
                                        {(isExpanded || isMobile) && (
                                            <span className="ml-1">
                                                Sign Out
                                            </span>
                                        )}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You will be logged out of the fitness club application.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleSignOut} className="bg-red-500">Sign Out</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-800 text-white">
                            Sign Out
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="fixed border rounded-full bg-white text-black left-4 top-4 z-50 md:hidden">
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