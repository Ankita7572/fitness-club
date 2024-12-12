import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'
import type { Restaurant } from "@/types/restaurant"

interface RestaurantCardProps {
    restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <Link href={`/restaurant/menu/${restaurant.id}`}>
            <Card className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                <CardHeader className="p-0">
                    <div className="relative aspect-[5/3]">
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="object-cover w-full h-52"
                        />
                        {restaurant.discount && (
                            <Badge className="absolute top-2 left-2 bg-blue-600">
                                Flat {restaurant.discount}% OFF
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <Badge variant="secondary" className="gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            {restaurant.rating}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                        {restaurant.cuisines.join(", ")}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                        <span>₹{restaurant.priceForTwo} for two</span>
                        <span className="text-muted-foreground">{restaurant.distance}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

