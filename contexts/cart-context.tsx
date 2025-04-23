"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useCurrency } from "@/contexts/currency-context"

export type CartItem = {
  id: number
  name: string
  price: number // Price in KSh (base currency)
  image: string
  quantity: number
  variant?: string // Optional variant (e.g. "Blue", "Small", etc.)
}

type CartContextType = {
  items: CartItem[]
  itemCount: number
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: number, variant?: string) => void
  updateQuantity: (id: number, quantity: number, variant?: string) => void
  clearCart: () => void
  subtotal: number
  calculateDiscount: (code?: string) => number
  calculateShipping: () => number
  calculateTax: () => number
  calculateTotal: (discount?: number) => number
  applyPromoCode: (code: string) => boolean
  activePromoCode: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [activePromoCode, setActivePromoCode] = useState<string | null>(null)
  const { toast } = useToast()
  const { selectedCurrency } = useCurrency()

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("mali-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
        updateItemCount(parsedCart)
      } catch (e) {
        console.error("Failed to parse saved cart:", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mali-cart", JSON.stringify(items))
    updateItemCount(items)
  }, [items])

  const updateItemCount = (cartItems: CartItem[]) => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setItemCount(count)
  }

  const findItemIndex = (id: number, variant?: string) => {
    return items.findIndex((item) => item.id === id && (!variant || item.variant === variant))
  }

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    const existingItemIndex = findItemIndex(item.id, item.variant)

    if (existingItemIndex >= 0) {
      // Item already exists, update quantity
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity += quantity
      setItems(updatedItems)
    } else {
      // Item doesn't exist, add it
      setItems([...items, { ...item, quantity }])
    }

    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} has been added to your cart.`,
    })
  }

  const removeItem = (id: number, variant?: string) => {
    const existingItemIndex = findItemIndex(id, variant)

    if (existingItemIndex >= 0) {
      const updatedItems = [...items]
      updatedItems.splice(existingItemIndex, 1)
      setItems(updatedItems)

      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      })
    }
  }

  const updateQuantity = (id: number, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeItem(id, variant)
      return
    }

    const existingItemIndex = findItemIndex(id, variant)

    if (existingItemIndex >= 0) {
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity = quantity
      setItems(updatedItems)
    }
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const calculateDiscount = (code?: string) => {
    const codeToCheck = code || activePromoCode
    if (!codeToCheck) return 0

    // Simple discount strategy based on promo code
    switch (codeToCheck.toLowerCase()) {
      case "discount10":
        return subtotal * 0.1 // 10% discount
      case "discount20":
        return subtotal * 0.2 // 20% discount
      case "free50":
        return 5000 // KSh 50 off
      case "bedroom15":
        return subtotal * 0.15 // 15% discount
      default:
        return 0
    }
  }

  const calculateShipping = () => {
    // Free shipping for orders over KSh 50,000
    if (subtotal > 50000) return 0

    // Base shipping rate
    return 2999
  }

  const calculateTax = () => {
    // Simplified tax calculation (16% VAT in Kenya)
    return subtotal * 0.16
  }

  const calculateTotal = (discount?: number) => {
    const discountAmount = discount !== undefined ? discount : calculateDiscount()
    return subtotal + calculateShipping() + calculateTax() - discountAmount
  }

  const applyPromoCode = (code: string) => {
    // Check if code is valid
    const validCodes = ["discount10", "discount20", "free50", "bedroom15"]

    if (validCodes.includes(code.toLowerCase())) {
      setActivePromoCode(code.toLowerCase())
      toast({
        title: "Promo code applied",
        description: "Your discount has been applied to the order.",
      })
      return true
    } else {
      toast({
        title: "Invalid promo code",
        description: "The code you entered is not valid.",
        variant: "destructive",
      })
      return false
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        calculateDiscount,
        calculateShipping,
        calculateTax,
        calculateTotal,
        applyPromoCode,
        activePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
