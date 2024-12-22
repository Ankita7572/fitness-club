"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import type { MenuItem, CartItem } from "@/types/restaurant"

interface MenuDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    items: MenuItem[]
}

export function MenuDialog({ open, onOpenChange, items }: MenuDialogProps) {
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[90vh]">
                <div className="flex h-full">
                    <Tabs defaultValue={categories[0]} className="flex-1">
                        <TabsList className="grid grid-cols-3 h-12">
                            {categories.map(category => (
                                <TabsTrigger key={category} value={category}>
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {categories.map(category => (
                            <TabsContent key={category} value={category} className="mt-4">
                                <div className="grid gap-4">
                                    {items
                                        .filter(item => item.category === category)
                                        .map(item => {
                                            const cartItem = cart.find(i => i.id === item.id)
                                            return (
                                                <div key={item.id} className="flex gap-4 items-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-24 h-24 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{item.name}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.description}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="font-semibold">
                                                                £{item.price}
                                                            </span>
                                                            {item.discount && (
                                                                <Badge variant="secondary">
                                                                    {item.discount}% off
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {cartItem ? (
                                                            <>
                                                                <Button
                                                                    size="icon"
                                                                    variant="outline"
                                                                    onClick={() => removeFromCart(item.id)}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </Button>
                                                                <span>{cartItem.quantity}</span>
                                                                <Button
                                                                    size="icon"
                                                                    variant="outline"
                                                                    onClick={() => addToCart(item)}
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <Button onClick={() => addToCart(item)}>
                                                                Add
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
                    {cart.length > 0 && (
                        <div className="w-[240px] border-l ml-4 pl-4 py-4 flex flex-col">
                            <h3 className="font-semibold mb-4">Your Order</h3>
                            <div className="flex-1 overflow-auto">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between mb-2">
                                        <span className="text-sm">
                                            {item.quantity}x {item.name}
                                        </span>
                                        <span className="text-sm">£{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">£{total}</span>
                                </div>
                                <Button className="w-full">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Place Order
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

