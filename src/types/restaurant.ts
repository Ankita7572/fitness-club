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

