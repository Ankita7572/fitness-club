
import LayoutPage from "@/app/dashboard/LayoutPage";
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
        image: "/img/dashboard/avacado.jpg",
        category: "Side Dishes",
        available: 10,
    },
    {
        id: "4",
        name: "Lettuce with Stuff",
        description: "Crisp lettuce with assorted toppings",
        price: 170.0,
        image: "/img/dashboard/healthy.jpg",
        category: "Main Course",
        available: 5,
    },
    {
        id: "5",
        name: "Berry Bliss Breakfast with Coffee",
        description: "This dish features a visually delightful assortment of fresh berries , a tart topped with strawberry mousse, and a warm coffee or latte served on a textured ceramic plate.",
        price: 97.5,
        image: "/img/dashboard/breakfast2.jpg",
        category: "Main Course",
        available: 12,
      
    },
    {
        id: "6",
        name: "Berry Granola Delight with Morning Brew",
        description: "This dish features a wholesome bowl of granola topped with fresh strawberries and blueberries, paired with a cup of black coffee for a balanced and energizing start to the day.",
        price: 81.7,
        image: "/img/dashboard/breakfast1.jpg",
        category: "Appetizer",
        available: 8,
        discount: 10,
    },
    {
        id: "7",
        name: "Tropical Chia Fruit Bowl",
        description: "This vibrant and colorful dish showcases a chia pudding base topped with a variety of fresh fruits like banana, kiwi, orange, and pomegranate, along with almonds, chia seeds, and a garnish of mint.",
        price: 68.0,
        image: "/img/dashboard/breakfast3.jpg",
        category: "Side Dishes",
        available: 10,
    },
    {
        id: "8",
        name: "Zesty Grilled Chicken Plate",
        description: "his could be a Thai-style grilled chicken dish (Gai Yang) or a similar Asian-inspired grilled chicken plate, served with fresh vegetables and what appears to be a dipping sauce in the small bowl at the top. ",
        price: 170.0,
        image: "/img/dashboard/dinner2.jpg",
        category: "Main Course",
        available: 5,
    },
    {
        id: "9",
        name: "Winter Harvest Salad with Roasted Beets and Citrus",
        description: " seasonal ingredients (beets, citrus, pomegranate) while highlighting the main components of the dish. It's descriptive yet elegant, matching the sophisticated plating of the salad.",
        price: 97.5,
        image: "/img/dashboard/dinner1.jpg",
        category: "Main Course",
        available: 12,
        discount: 15,
    },
    {
        id: "10",
        name: "Grilled Salmon Garden Bowl",
        description: " featuring a grilled salmon fillet served with a colorful array of vegetables including:Broccoli,Baby corn,Snow peas,Yellow bell peppers,Cherry tomatoes,Green olives,Garnished with sesame seeds",
        price: 81.7,
        image: "/img/dashboard/lunch1.jpg",
        category: "Appetizer",
        available: 8,
        discount: 10,
    },
    {
        id: "11",
        name: "Power Grain Bowl",
        description: "This bowl combines lean protein, healthy fats, and complex carbohydrates, making it perfect for a balanced, energy-boosting meal. The mix of textures and fresh ingredients creates a satisfying and wholesome dining experience.",
        price: 68.0,
        image: "/img/dashboard/lunch3.jpg",
        category: "Side Dishes",
        available: 10,
        discount: 15,
    },
    {
        id: "12",
        name: "Garden Fresh Grilled Sandwich Plate",
        description: "This plate combines warm and cold elements, offering a perfect balance of textures: crispy grilled bread, crunchy vegetables, and smooth dips. It's a healthy lunch option that brings together protein, fresh vegetables, and healthy fats from the nuts.",
        price: 170.0,
        image: "/img/dashboard/dinner4.jpg",
        category: "Main Course",
        available: 5,
    },

    // Add more menu items as needed
];

// Explicitly define the type for the params
interface MenuPageProps {
    params: Promise<{ id: string }>;
}

// Default export for the dynamic route
export default async function MenuPageRoute({ params }: MenuPageProps) {
    // Await the params promise to get the id
    const { id } = await params;

    // Render the menu page
    return (
        <LayoutPage>
            <div className="min-h-screen bg-background px-4">
                <main className="container py-6">
                    <h1 className="text-2xl font-bold mb-6">Restaurant Menu </h1>
                    <MenuPage items={menuItems} />
                </main>
            </div>
        </LayoutPage>
    );
}