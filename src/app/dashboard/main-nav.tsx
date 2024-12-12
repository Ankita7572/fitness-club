import Link from "next/link"
import { Home, User, Stethoscope, UtensilsCrossed, LogOut } from 'lucide-react'
import Image from 'next/image'

export function MainNav() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex h-14 items-center border-b border-border px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Image src="/img/logo.png" alt='logo' width={120} height={60} className='w-32 h-24' />
                </Link>
            </div>
            <div className=" overflow-y-auto">
                <nav className="space-y-2 p-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground/80"
                    >
                        <Home className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </Link>
                    <Link
                        href="/consultancy"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
                    >
                        <Stethoscope className="h-4 w-4" />
                        Consultancy
                    </Link>
                    <Link
                        href="/restaurant"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
                    >
                        <UtensilsCrossed className="h-4 w-4" />
                        Restaurants
                    </Link>
                </nav>
            </div>
            <div className="border-t border-border p-4 space-y-4">

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

