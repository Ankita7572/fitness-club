"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Search, Info } from 'lucide-react'
import type { MenuItem, CartItem } from "@/types/restaurant"

interface MenuPageProps {
    items: MenuItem[]
}

export function MenuPage({ items }: MenuPageProps) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const categories = Array.from(new Set(items.map(item => item.category)))

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (itemId: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === itemId)
            if (existing?.quantity === 1) {
                return prev.filter(i => i.id !== itemId)
            }
            return prev.map(i =>
                i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            )
        })
    }

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const subtotal = cart.reduce((sum, item) => {
        const itemPrice = item.price * item.quantity;
        const discount = item.discount ? (itemPrice * item.discount) / 100 : 0;
        return sum + (itemPrice - discount);
    }, 0);

    const totalDiscount = cart.reduce((sum, item) => {
        const itemPrice = item.price * item.quantity;
        const discount = item.discount ? (itemPrice * item.discount) / 100 : 0;
        return sum + discount;
    }, 0);
    const tax = subtotal * 0.05 // 5% tax
    const total = subtotal + tax

    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Find food or beverages"
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Special Discount Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Special Discount Today</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredItems.filter(item => item.discount).map(item => (
                                <div key={item.id} className="bg-card rounded-lg overflow-hidden border">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-40 object-cover"
                                        />
                                        <Badge className="absolute top-2 left-2 bg-primary">
                                            {item.discount}% OFF
                                        </Badge>
                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                            Available: {item.available}
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">£{item.price}</span>
                                            <div className="flex items-center gap-2">
                                                {cart.find(i => i.id === item.id) ? (
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-7 w-7 p-0"
                                                            onClick={() => removeFromCart(item.id)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="text-sm w-4 text-center">
                                                            {cart.find(i => i.id === item.id)?.quantity}
                                                        </span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-7 w-7 p-0"
                                                            onClick={() => addToCart(item)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => addToCart(item)}
                                                    >
                                                        Order
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Menu Categories */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Explore Our Best Menu</h2>
                            <Button variant="link">View All</Button>
                        </div>
                        <Tabs defaultValue={categories[0]}>
                            <TabsList className="flex overflow-x-auto hide-scrollbar mb-6">
                                <TabsTrigger value="all" className="flex-shrink-0">
                                    All
                                </TabsTrigger>
                                {categories.map(category => (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        className="flex-shrink-0"
                                    >
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="all">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {filteredItems.map(item => (
                                        <div key={item.id} className="bg-card rounded-lg overflow-hidden border">
                                            <div className="relative">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-40 object-cover"
                                                />
                                                {item.discount && (
                                                    <Badge className="absolute top-2 left-2 bg-primary">
                                                        {item.discount}% OFF
                                                    </Badge>
                                                )}
                                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                                    Available: {item.available}
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold">£{item.price}</span>
                                                    <div className="flex items-center gap-2">
                                                        {cart.find(i => i.id === item.id) ? (
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="h-7 w-7 p-0"
                                                                    onClick={() => removeFromCart(item.id)}
                                                                >
                                                                    <Minus className="h-3 w-3" />
                                                                </Button>
                                                                <span className="text-sm w-4 text-center">
                                                                    {cart.find(i => i.id === item.id)?.quantity}
                                                                </span>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="h-7 w-7 p-0"
                                                                    onClick={() => addToCart(item)}
                                                                >
                                                                    <Plus className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => addToCart(item)}
                                                            >
                                                                Order
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            {categories.map(category => (
                                <TabsContent key={category} value={category}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {filteredItems
                                            .filter(item => item.category === category)
                                            .map(item => (
                                                <div key={item.id} className="bg-card rounded-lg overflow-hidden border">
                                                    <div className="relative">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-40 object-cover"
                                                        />
                                                        {item.discount && (
                                                            <Badge className="absolute top-2 left-2 bg-primary">
                                                                {item.discount}% OFF
                                                            </Badge>
                                                        )}
                                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                                            Available: {item.available}
                                                        </div>
                                                    </div>
                                                    <div className="p-3">
                                                        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-semibold">£{item.price}</span>
                                                            <div className="flex items-center gap-2">
                                                                {cart.find(i => i.id === item.id) ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="h-7 w-7 p-0"
                                                                            onClick={() => removeFromCart(item.id)}
                                                                        >
                                                                            <Minus className="h-3 w-3" />
                                                                        </Button>
                                                                        <span className="text-sm w-4 text-center">
                                                                            {cart.find(i => i.id === item.id)?.quantity}
                                                                        </span>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="h-7 w-7 p-0"
                                                                            onClick={() => addToCart(item)}
                                                                        >
                                                                            <Plus className="h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => addToCart(item)}
                                                                    >
                                                                        Order
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>

                {/* Right Sidebar */}
                {cart.length > 0 && (
                    <div className="w-full lg:w-[320px] bg-card rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">Customer Information</h3>
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </div>


                        <h3 className="font-semibold mb-4">Current Order</h3>
                        <div className="space-y-4 mb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">{item.name}</h4>
                                        <div className="flex items-center justify-between mt-1">
                                            <div>
                                                <span className="text-sm text-primary">£{item.price}</span>
                                                {item.discount && (
                                                    <Badge variant="secondary" className="ml-2 text-xs">
                                                        {item.discount}% off
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-6 w-6 p-0"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-6 w-6 p-0"
                                                    onClick={() => addToCart(item)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-4">Payment Summary</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>£{(subtotal + totalDiscount).toFixed(2)}</span>
                                </div>
                                {totalDiscount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Discount Savings</span>
                                        <span className="text-green-600">-£{totalDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (5%)</span>
                                    <span>£{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span className="text-primary">£{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button className="w-full" size="lg">
                                Order Now
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

