"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import type { MenuItem, CartItem } from "@/types/restaurant"

interface MenuPageProps {
    items: MenuItem[]
}

export function MenuPage({ items }: MenuPageProps) {
    const [cart, setCart] = useState<CartItem[]>([])
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

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
                <Tabs defaultValue={categories[0]}>
                    <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-4">
                        {categories.map(category => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                className="ring-offset-background focus-visible:outline-none data-[state=active]:bg-zinc-400 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-black  data-[state=active]:shadow-sm h-8 px-3 py-1.5 text-sm font-medium"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map(category => (
                        <TabsContent key={category} value={category} className="mt-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {items
                                    .filter(item => item.category === category)
                                    .map(item => {
                                        const cartItem = cart.find(i => i.id === item.id)
                                        return (
                                            <div key={item.id} className="bg-card rounded-lg overflow-hidden border">
                                                <div className="relative h-48">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    <span className="absolute top-2 bg-sky-500 left-2 text-xs bg-background/90 px-2 py-1 rounded-full">
                                                        Available: {item.available}
                                                    </span>
                                                </div>
                                                <div className="p-3">
                                                    <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-semibold text-sm">₹{item.price}</span>
                                                        {item.discount && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                {item.discount}% off
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {cartItem ? (
                                                        <div className="flex items-center justify-between gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => removeFromCart(item.id)}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <span className="text-sm">{cartItem.quantity}</span>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => addToCart(item)}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            className="w-full bg-sky-800 hover:bg-sky-700"
                                                            onClick={() => addToCart(item)}
                                                        >
                                                            Order
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            {cart.length > 0 && (
                <div className="w-full lg:w-[240px] border-t lg:border-l lg:border-t-0 pt-4 lg:pt-0 lg:pl-4 flex flex-col">
                    <h3 className="font-semibold mb-4">Your Order</h3>
                    <div className="flex-1 overflow-auto">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between mb-2">
                                <span className="text-sm">
                                    {item.quantity}x {item.name}
                                </span>
                                <span className="text-sm">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-4">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">₹{total}</span>
                        </div>
                        <Button className="w-full bg-sky-800 hover:bg-sky-700">
                            <ShoppingCart className="mr-2 h-4 w-4 " />
                            Place Order
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

