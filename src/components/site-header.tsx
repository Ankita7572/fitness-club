import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                        <div className="h-6 w-6 text-primary">🍽️</div>
                    </div>
                    <span className="text-xl font-bold">Kans Resto</span>
                </div>
                <div className="flex flex-1 items-center gap-2 md:ml-4">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Find food or beverages"
                        className="md:w-[300px] lg:w-[400px]"
                    />
                </div>
            </div>
        </header>
    )
}

