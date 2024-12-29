
import LayoutPage from "@/app/dashboard/LayoutPage";
import { MenuPage } from "@/components/menu-page";
import { restaurants } from "@/types/restaurant";



// Explicitly define the type for the params
interface MenuPageProps {
    params: Promise<{ id: string }>;
}

// Default export for the dynamic route
export default async function MenuPageRoute({ params }: MenuPageProps) {
    // Await the params promise to get the id
    const { id } = await params;
    // Find the restaurant by id
    const restaurant = restaurants.find(r => r.id === id);

    // If restaurant not found, you might want to handle this case
    if (!restaurant) {
        return <div>Restaurant not found</div>;
    }


    // Render the menu page
    return (
        <LayoutPage>
            <div className="min-h-screen bg-background px-4">
                <main className="container py-6">
                    <h1 className="text-2xl font-bold mb-6">{restaurant.name} Menu </h1>
                    <MenuPage items={restaurant.menuitem} />
                </main>
            </div>
        </LayoutPage>
    );
}