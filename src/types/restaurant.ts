export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  image: string
  category: string
  available: number
  discount?: number
}

export interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  cuisines: string[]
  priceForTwo: number
  distance: string
  discount?: number
  location: string
}

export interface CartItem extends MenuItem {
  quantity: number
}








export const restaurants = [
    {
        id: "1",
        name: "Trigony House Hotel",
        image: "/img/hotel.webp",
        rating: 4.5,
        cuisines: ["Vegetarian", "Continental", "Italian"],
        priceForTwo: 100,
        distance: "176 m",
        discount: 20,
        location: "Leisure Inn Grand Chanakya",
        menuitem: [
            {
                id: "1",
                name: "Tomato with Tofu Salad",
                description: "Fresh tomatoes and tofu with special dressing",
                price: 17.5,
                image: "/img/dashboard/food1.webp",
                category: "Main Course",
                available: 12,
                discount: 15,
            },
            // {
            //     id: "2",
            //     name: "Japanese Chicken Gyoza",
            //     description: "Delicious Japanese dumplings filled with chicken",
            //     price: 11.7,
            //     image: "/img/dashboard/food2.webp",
            //     category: "Appetizer",
            //     available: 8,
            //     discount: 10,
            // },
            {
                id: "3",
                name: "2pcs of Amazing Avocado",
                description: "Fresh, ripe avocados",
                price: 18.0,
                image: "/img/dashboard/avacado.webp",
                category: "Side Dishes",
                available: 10,
            },
            {
                id: "4",
                name: "Lettuce with Stuff",
                description: "Crisp lettuce with assorted toppings",
                price: 17.0,
                image: "/img/dashboard/healthy.webp",
                category: "Main Course",
                available: 5,
            },
            {
                id: "5",
                name: "Berry Bliss Breakfast with Coffee",
                description: "This dish features a visually delightful assortment of fresh berries , a tart topped with strawberry mousse, and a warm coffee or latte served on a textured ceramic plate.",
                price: 17.5,
                image: "/img/dashboard/breakfast2.webp",
                category: "Main Course",
                available: 12,

            },
            {
                id: "6",
                name: "Berry Granola Delight with Morning Brew",
                description: "This dish features a wholesome bowl of granola topped with fresh strawberries and blueberries, paired with a cup of black coffee for a balanced and energizing start to the day.",
                price: 11.7,
                image: "/img/dashboard/breakfast1.webp",
                category: "Appetizer",
                available: 8,
                discount: 10,
            },
            {
                id: "7",
                name: "Tropical Chia Fruit Bowl",
                description: "This vibrant and colorful dish showcases a chia pudding base topped with a variety of fresh fruits like banana, kiwi, orange, and pomegranate, along with almonds, chia seeds, and a garnish of mint.",
                price: 18.0,
                image: "/img/dashboard/breakfast3.webp",
                category: "Side Dishes",
                available: 10,
            },
            
            {
                id: "9",
                name: "Winter Harvest Salad with Roasted Beets and Citrus",
                description: " seasonal ingredients (beets, citrus, pomegranate) while highlighting the main components of the dish. It's descriptive yet elegant, matching the sophisticated plating of the salad.",
                price: 17.5,
                image: "/img/dashboard/dinner1.webp",
                category: "Main Course",
                available: 12,
                discount: 15,
            },
            // {
            //     id: "10",
            //     name: "Grilled Salmon Garden Bowl",
            //     description: " featuring a grilled salmon fillet served with a colorful array of vegetables including:Broccoli,Baby corn,Snow peas,Yellow bell peppers,Cherry tomatoes,Green olives,Garnished with sesame seeds",
            //     price: 11.7,
            //     image: "/img/dashboard/lunch1.webp",
            //     category: "Appetizer",
            //     available: 8,
            //     discount: 10,
            // },
            {
                id: "11",
                name: "Power Grain Bowl",
                description: "This bowl combines lean protein, healthy fats, and complex carbohydrates, making it perfect for a balanced, energy-boosting meal. The mix of textures and fresh ingredients creates a satisfying and wholesome dining experience.",
                price: 18.0,
                image: "/img/dashboard/lunch3.webp",
                category: "Side Dishes",
                available: 10,
                discount: 15,
            },
            {
                id: "12",
                name: "Garden Fresh Grilled Sandwich Plate",
                description: "This plate combines warm and cold elements, offering a perfect balance of textures: crispy grilled bread, crunchy vegetables, and smooth dips. It's a healthy lunch option that brings together protein, fresh vegetables, and healthy fats from the nuts.",
                price: 10.0,
                image: "/img/dashboard/dinner4.webp",
                category: "Main Course",
                available: 5,
            },


        ]
    },
    {
        id: "2",
        name: "KnightHouse",
        image: "/img/hotel-1.webp",
        rating: 4.4,
        cuisines: ["Non-Vegetarian", "Continental", "Italian"],
        priceForTwo: 100,
        distance: "333 m",
        discount: 15,
        location: "C Scheme, Jaipur",
        menuitem: [
            {
                id: "1",
                name: "Gochujang Grilled Chicken with Spicy Garlic Noodles",
                description: "A flavorful grilled chicken dish marinated in spicy Gochujang sauce, served with aromatic garlic noodles for a delightful kick.",
                price: 17.5,
                image: "/img/dashboard/meal1.jpeg",
                category: "Main Course",
                available: 12,
                discount: 15,
            },
            {
                id: "2",
                name: "Greek Chicken Souvlaki Wraps",
                description: "Juicy, marinated chicken wrapped in soft pita bread, complemented with tzatziki sauce and fresh veggies for a Greek delight.",
                price: 11.7,
                image: "/img/dashboard/meal6.jpeg",
                category: "Appetizer",
                available: 8,
                discount: 10,
            },
            {
                id: "3",
                name: "Tequila Lime Chilli Chicken",
                description: "Tender chicken infused with tequila, lime, and a hint of chili for a zesty and bold flavor.",
                price: 18.0,
                image: "/img/dashboard/meal10.jpeg",
                category: "Side Dishes",
                available: 10,
            },
            {
                id: "4",
                name: "Kulfi Chicken",
                description: "An exotic blend of Indian spices in a creamy marinade, grilled to perfection for a unique taste experience.",
                price: 17.0,
                image: "/img/dashboard/meal11.jpeg",
                category: "Main Course",
                available: 5,
            },
            {
                id: "5",
                name: "Mac & Cheese VF Version",
                description: "Classic mac and cheese made vibrant with fresh vegetables, offering a comforting yet healthy twist.",
                price: 17.5,
                image: "/img/dashboard/meal9.jpeg",
                category: "Main Course",
                available: 12,
            },
            {
                id: "6",
                name: "Penne Arrabiata",
                description: "A spicy Italian classic featuring al dente penne pasta in a robust tomato sauce with chili and garlic.",
                price: 11.7,
                image: "/img/dashboard/meal8.jpeg",
                category: "Appetizer",
                available: 8,
                discount: 10,
            },
            {
                id: "7",
                name: "Spaghetti Aglio E Olio",
                description: "Simple yet flavorful spaghetti tossed with olive oil, garlic, red chili flakes, and parsley.",
                price: 18.0,
                image: "/img/dashboard/meal7.jpeg",
                category: "Side Dishes",
                available: 10,
            },
            {
                id: "8",
                name: "Cheesy Bacon Egg Cups",
                description: "Grilled chicken with a tangy zest, served with fresh vegetables and a dipping sauce for a wholesome meal.",
                price: 10.0,
                image: "/img/dashboard/meal12.jpeg",
                category: "Main Course",
                available: 5,
            },
            {
                id: "9",
                name: "Balsamic Chicken & Mushrooms",
                description: "Sautéed chicken and mushrooms drizzled with a rich balsamic glaze, perfect for a sophisticated main course.",
                price: 17.5,
                image: "/img/dashboard/meal5.jpeg",
                category: "Main Course",
                available: 12,
                discount: 15,
            },
            {
                id: "10",
                name: "Meat & Mushroom Lasagna",
                description: "Layered lasagna filled with savory meat, earthy mushrooms, and rich cheese for a comforting Italian classic.",
                price: 11.7,
                image: "/img/dashboard/meal4.jpeg",
                category: "Appetizer",
                available: 8,
                discount: 10,
            },
            {
                id: "11",
                name: "Mushroom Garlic Cream Pasta",
                description: "Creamy pasta loaded with mushrooms and garlic, offering a luxurious, satisfying dining experience.",
                price: 18.0,
                image: "/img/dashboard/meal2.jpeg",
                category: "Side Dishes",
                available: 10,
                discount: 15,
            },
            {
                id: "12",
                name: "Kung Pao Prawns with Hakka Noodles",
                description: "A spicy-sweet prawn stir-fry with peanuts and bell peppers, served over flavorful garlic-ginger Hakka noodles.",
                price: 18.0,
                image: "/img/dashboard/meal3.jpeg",
                category: "Side Dishes",
                available: 10,
                discount: 15,
            },
        ]

    },
    {
        id: "3",
        name: " The Clink Restaurant",
        image: "/img/hotel-2.webp",
        rating: 4.9,
        cuisines: ["Vegetarian", "Continental", "Italian","Non-Vegetarian"],
        priceForTwo: 250,
        distance: "2 km",
        location: "Adarsh Nagar, Jaipur",
        discount: 25,
        menuitem: [
            {
                id: "1",
                name: "Vegetarian Goulash",
                description: "A hearty stew made with fresh vegetables, seasoned with paprika, and simmered in a rich tomato-based broth.",
                price: 17.5,
                image: "/img/dashboard/meal24.jpeg",
                category: "Main Course",
                available: 12,
                discount: 15,
            },
            {
                id: "2",
                name: "Käsespätzle",
                description: "Traditional German pasta dish featuring soft noodles layered with melted cheese and crispy fried onions.",
                price: 11.7,
                image: "/img/dashboard/meal23.jpeg",
                category: "Appetizer",
                available: 8,
                discount: 10,
            },
            {
                id: "3",
                name: "Zurek",
                description: "A Polish sour rye soup served with boiled eggs, potatoes, and savory sausage for a comforting experience.",
                price: 18.0,
                image: "/img/dashboard/meal22.jpeg",
                category: "Side Dishes",
                available: 10,
            },
            {
                id: "4",
                name: "Quiche aux Légumes",
                description: "A French vegetable quiche made with a flaky crust, creamy custard, and fresh seasonal vegetables.",
                price: 17.0,
                image: "/img/dashboard/meal21.jpeg",
                category: "Main Course",
                available: 5,
            },
            {
                id: "5",
                name: "Vegetarian Paella",
                description: "A Spanish classic with saffron-infused rice, colorful vegetables, and rich Mediterranean flavors.",
                price: 17.5,
                image: "/img/dashboard/meal20.jpeg",
                category: "Main Course",
                available: 12,
            },
            {
                id: "6",
                name: "Potato Rösti with Sour Cream",
                description: "Golden, crispy potato rösti served with a dollop of tangy sour cream, perfect for a light snack.",
                price: 11.7,
                image: "/img/dashboard/meal19.jpeg",
                category: "Appetizer",
                available: 8,
                discount: 10,
            },
            {
                id: "7",
                name: "Moussaka",
                description: "A Mediterranean baked dish with layers of eggplant, potatoes, spiced lentils, and a creamy béchamel sauce.",
                price: 18.0,
                image: "/img/dashboard/meal18.jpeg",
                category: "Side Dishes",
                available: 10,
            },
            {
                id: "8",
                name: "Bruschetta al Pomodoro",
                description: "Crispy toasted bread topped with fresh tomatoes, basil, garlic, and a drizzle of olive oil for a classic Italian starter.",
                price: 10.0,
                image: "/img/dashboard/meal17.jpeg",
                category: "Main Course",
                available: 5,
            },
            {
                id: "9",
                name: "Pierogi Ruskie",
                description: "Polish dumplings stuffed with creamy mashed potatoes, cheese, and onions, served with a side of sour cream.",
                price: 17.5,
                image: "/img/dashboard/meal16.jpeg",
                category: "Main Course",
                available: 12,
                discount: 15,
            },
            {
                id: "10",
                name: "Spanakopita",
                description: "Greek spinach pie wrapped in flaky phyllo pastry, filled with spinach, feta cheese, and fresh herbs.",
                price: 11.7,
                image: "/img/dashboard/meal15.jpeg",
                category: "Appetizer",
                available: 8,
                discount: 10,
            },
            {
                id: "11",
                name: "Risotto ai Funghi",
                description: "Creamy Italian risotto cooked with wild mushrooms, parmesan cheese, and a touch of white wine.",
                price: 18.0,
                image: "/img/dashboard/meal14.jpeg",
                category: "Side Dishes",
                available: 10,
                discount: 15,
            },
            {
                id: "12",
                name: "Ratatouille",
                description: "A French Provençal vegetable stew with zucchini, eggplant, bell peppers, and tomatoes, seasoned with herbs de Provence.",
                price: 10.0,
                image: "/img/dashboard/meal13.jpeg",
                category: "Main Course",
                available: 5,
            },
        ]


    }
    // Add more restaurants as needed
]
