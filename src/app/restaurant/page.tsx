import { SiteHeader } from "@/components/site-header"
import { RestaurantCard } from "@/components/restaurant-card"
import LayoutPage from "../dashboard/LayoutPage"
import { restaurants } from "@/types/restaurant"


// Sample data - in a real app, this would come from an API


export default function Page() {
    return (
        <LayoutPage>
        <div className="min-h-screen bg-background">
           
            <main className="container py-6 px-4">
                    <h1 className="text-5xl max-sm:text-2xl text-black font-bold text-center mb-6">Your Destination for Healthy & Fitness-Friendly Eats</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {restaurants.map(restaurant => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </div>
            </main>
        </div>
        </LayoutPage>
    )
}

