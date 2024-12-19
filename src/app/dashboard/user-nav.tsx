"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

export function UserNav() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    // Runs once when the component mounts

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("userInfo"); // Clear user data from localStorage on sign out
            router.push('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Loading state
  

    // Error state
    if (error) {
        return (
            <Button variant="destructive" size="lg">
                Error Loading
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 md:gap-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-sm md:text-base font-semibold">Jenny Wilson</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                    </div>

                </div>
              
               
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Ankita Sharma</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            ankitadev63@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => router.push('/profile')}
                    className="cursor-pointer"
                >
                    Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
