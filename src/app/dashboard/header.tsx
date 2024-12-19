"use client"

import { Bell, ChevronDown, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { UserNav } from './user-nav'

export function Header() {
    return (
        <header className="sticky top-0 z-10 bg-white border-b flex items-center justify-between p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3 max-sm:ml-12">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Image src="/img/logo.png" alt='logo' width={120} height={60} className='w-20 h-8' />
                </Link>
            </div>
            <>
            <UserNav/></>
        </header>
    )
}

