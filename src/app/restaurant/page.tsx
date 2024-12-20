import { SiteHeader } from "@/components/site-header"
import { RestaurantCard } from "@/components/restaurant-card"
import LayoutPage from "../dashboard/LayoutPage"


// Sample data - in a real app, this would come from an API
const restaurants = [
    {
        id: "1",
        name: "The Night Jar",
        image: "/img/hotel.jpg",
        rating: 4.5,
        cuisines: ["Bar Food"],
        priceForTwo: 1200,
        distance: "176 m",
        discount: 20,
        location: "Leisure Inn Grand Chanakya"
    },
    {
        id: "2",
        name: "KnightHouse",
        image: "/img/hotel-1.jpg",
        rating: 4.4,
        cuisines: ["Northampton, England", "Italian", "Continental"],
        priceForTwo: 1500,
        distance: "333 m",
        discount: 10,
        location: "C Scheme, Jaipur"
    },
    {
        id: "3",
        name: "Clock Tower",
        image: "/img/hotel-2.jpg",
        rating: 4.9,
        cuisines: ["Northampton, England", "Continental", "Italian"],
        priceForTwo: 2500,
        distance: "2 km",
        location: "Adarsh Nagar, Jaipur"
    },
    {
        id: "4",
        name: "The Night Jar",
        image: "/img/hotel.jpg",
        rating: 4.5,
        cuisines: ["Bar Food"],
        priceForTwo: 1200,
        distance: "176 m",
        discount: 20,
        location: "Leisure Inn Grand Chanakya"
    },
    {
        id: "5",
        name: "KnightHouse",
        image: "/img/hotel-1.jpg",
        rating: 4.4,
        cuisines: ["Northampton, England", "Italian", "Continental"],
        priceForTwo: 1500,
        distance: "333 m",
        discount: 10,
        location: "C Scheme, Jaipur"
    },
    {
        id: "6",
        name: "Clock Tower",
        image: "/img/hotel-2.jpg",
        rating: 4.9,
        cuisines: ["Northampton, England", "Continental", "Italian"],
        priceForTwo: 2500,
        distance: "2 km",
        location: "Adarsh Nagar, Jaipur"
    },
    // Add more restaurants as needed
]

export default function Page() {
    return (
        <LayoutPage>
        <div className="min-h-screen bg-background">
           
            <main className="container py-6 px-4">
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

