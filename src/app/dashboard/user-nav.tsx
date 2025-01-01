import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { getUserDetailsFromCollection, UserData } from "@/lib/firebase/firebaseDb";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function UserNav() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // First try to get email from Firebase auth
                const user = auth.currentUser;
                let email = user?.email;

                // If no email from auth, try localStorage
                if (!email) {
                    // Try userInfo
                    const userInfo = localStorage.getItem("userInfo");
                    if (userInfo) {
                        const parsedUserInfo = JSON.parse(userInfo);
                        email = parsedUserInfo.email;
                    }

                    // If still no email, try user_info
                    if (!email) {
                        const user_info = localStorage.getItem("user_info");
                        if (user_info) {
                            const parsedUser_info = JSON.parse(user_info);
                            email = parsedUser_info.email;
                        }
                    }
                }

                // If we have an email from any source, fetch the user details
                if (email) {
                    const details = await getUserDetailsFromCollection(email);
                    if (details) {
                        setUserData(details as UserData);
                    } else {
                        setError(new Error('User not found in database'));
                    }
                } else {
                    setError(new Error('No email found'));
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

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

    const getInitials = (name?: string): string => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0]?.toUpperCase())
            .slice(0, 2)
            .join('');
    };

    if (loading) {
        return <Button variant="ghost" size="lg" disabled>Loading...</Button>;
    }

    // if (error) {
    //     return (
    //         <Button variant="destructive" size="lg">
    //             Error Loading
    //         </Button>
    //     );
    // }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 md:gap-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 border rounded-full border-gray-600">

                        <AvatarFallback>
                            {getInitials(userData?.displayName)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-sm md:text-base font-semibold">
                            {userData?.displayName || "User"}
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {userData?.displayName || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userData?.email || ""}
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

                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    <AlertDialog>
                        <AlertDialogTrigger asChild>

                            Sign out
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
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserNav;