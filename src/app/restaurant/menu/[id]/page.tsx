import { LayoutPage } from "@/app/dashboard/LayoutPage";
import { MenuPage } from "@/components/menu-page";

// Sample data - in a real app, this would come from an API
const menuItems = [
    {
        id: "1",
        name: "Tomato with Tofu Salad",
        description: "Fresh tomatoes and tofu with special dressing",
        price: 97.5,
        image: "/img/food1.jpg",
        category: "Main Course",
        available: 12,
        discount: 15,
    },
    {
        id: "2",
        name: "Japanese Chicken Gyoza",
        description: "Delicious Japanese dumplings filled with chicken",
        price: 81.7,
        image: "/img/food2.jpg",
        category: "Appetizer",
        available: 8,
        discount: 10,
    },
    {
        id: "3",
        name: "2pcs of Amazing Avocado",
        description: "Fresh, ripe avocados",
        price: 68.0,
        image: "/img/food3.jpg",
        category: "Side Dishes",
        available: 10,
    },
    {
        id: "4",
        name: "Lettuce with Stuff",
        description: "Crisp lettuce with assorted toppings",
        price: 170.0,
        image: "/img/food5.jpg",
        category: "Main Course",
        available: 5,
    },
    // Add more menu items as needed
];

// Explicitly define the type for the params
interface MenuPageProps {
    params: { id: string }; // Ensure params has the id field as a string
}

// Default export for the dynamic route
export default function MenuPageRoute({ params }: MenuPageProps) {
    // Render the menu page
    return (
        <LayoutPage>
            <div className="min-h-screen bg-background px-4">
                <main className="container py-6">
                    <h1 className="text-2xl font-bold mb-6">Restaurant Menu (ID: {params.id})</h1>
                    <MenuPage items={menuItems} />
                </main>
            </div>
        </LayoutPage>
    );
}
