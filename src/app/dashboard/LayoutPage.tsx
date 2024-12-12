"use client"

import { useState } from "react"
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"
import Image from 'next/image'
import Link from "next/link"


export function LayoutPage({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden w-64 border-r bg-white lg:block overflow-y-hidden">
                <div className="flex h-full flex-col">
                    <MainNav />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="relative top-4 left-4 z-40 lg:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <MainNav />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50">
                <header className="flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold hidden md:block text-gray-800">Fitness Dashboard</h1>
                        <Link href="/" className="flex items-center md:hidden  gap-2 font-semibold">
                            <Image src="/img/logo.png" alt='logo' width={120} height={60} className='w-32 h-24' />
                        </Link>
                    </div>
                    <UserNav />
                </header>
                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}

