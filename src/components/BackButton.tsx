'use client';


import { ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            className="mt-4 mx-5 relative z-50 text-black flex"
            onClick={() => router.back()}
            aria-label="Go back"
        >
            <ChevronLeft className="h-4 w-4" />
            Back
        </Button>
    );
}