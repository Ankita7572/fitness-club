// "use client"

// import { useState } from "react"
// import { Menu, X } from 'lucide-react'
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { MainNav } from "./header"
// import { UserNav } from "./user-nav"
// import Image from 'next/image'
// import Link from "next/link"


// export function LayoutPage({ children }: { children: React.ReactNode }) {
//     const [open, setOpen] = useState(false)

//     return (
//         <div className="flex min-h-screen">
//             {/* Desktop Sidebar */}
//             <div className="hidden w-64 border-r bg-white lg:block overflow-y-hidden">
//                 <div className="flex  flex-col">
//                     <MainNav />
//                 </div>
//             </div>

//             {/* Mobile Sidebar */}
//             <Sheet open={open} onOpenChange={setOpen}>
//                 <SheetTrigger asChild>
//                     <Button variant="ghost" className="relative top-4 left-4 z-40 lg:hidden">
//                         <Menu className="h-6 w-6" />
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-64 p-0">
//                     <MainNav />
//                 </SheetContent>
//             </Sheet>

//             {/* Main Content */}
//             <div className="flex-1 bg-gray-50">
//                 <header className="flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
//                     <div className="flex-1">
//                         <h1 className="text-xl font-semibold hidden md:block text-gray-800">Fitness Dashboard</h1>
//                         <Link href="/" className="flex items-center md:hidden  gap-2 font-semibold">
//                             <Image src="/img/logo.png" alt='logo' width={120} height={60} className='w-32 h-24' />
//                         </Link>
//                     </div>
//                     <UserNav />
//                 </header>
//                 <main className="flex-1">{children}</main>
//             </div>
//         </div>
//     )
// }

"use client"

import { useState } from 'react'

import { CircularProgress } from "@/components/ui/circular-progress"

import { Card } from "@/components/ui/card"
import { Droplet, FlameIcon as Fire, Scale, Heart } from 'lucide-react'
import { cn } from "@/lib/utils"
import { NavSidebar } from './nav-sidebar'
import { Header } from './header'

export default function LayoutPage({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <NavSidebar
                isExpanded={isSidebarExpanded}
                onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
            />
            <div className={cn(
                "flex-1 transition-all duration-300",
                "md:ml-16",
                isSidebarExpanded && "md:ml-48"
            )}>
                <Header />
                <main className="">
                    {children}
                </main>
            </div>
        </div>
    )
}

