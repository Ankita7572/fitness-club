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

export function UserNav() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Get user data from localStorage
        const storedUserData = localStorage.getItem("userInfo");

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            console.log("data", userData)
        } else {
            setError(new Error("User data not found in localStorage"));
        }

        setLoading(false);
    }, []); // Runs once when the component mounts

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
    if (loading) {
        return (
            <Button variant="ghost" size="lg" className="relative h-10 w-10 px-0 py-0 rounded-full">
                <div className="animate-pulse bg-gray-300 rounded-full w-full h-full" />
            </Button>
        );
    }

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
                <Button variant="ghost" size="lg" className="relative h-10 w-10 px-0 py-0 rounded-full">
                    <img
                        src={userData?.photoURL || "/img/default-avatar.jpg"} // Fallback to a default avatar
                        alt="Avatar"
                        className="rounded-full object-cover w-full h-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userData?.displayName || "Full Name"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userData?.email || "Email"}
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
