// utils/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a cart item
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Define the shape of the context object
interface CartContextType {
    cart: CartItem[];
    cartCount: number;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void; // Function to add item
}

// 1. Create the Context with a default (null) value
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Create the Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCart(prevCart => {
            // Check if the item already exists
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                // If exists, increment quantity
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If new, add it with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Create a custom hook for easy access
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};