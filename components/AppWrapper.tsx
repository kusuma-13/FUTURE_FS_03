// components/AppWrapper.tsx
'use client';

import { ReactNode } from 'react';
// FIX: Changed '@/utils/CartContext' to the relative path '../utils/CartContext'
import { CartProvider } from '../utils/CartContext'; 
import CartButton from './CartButton';
import Link from 'next/link';

// Component to hold the global elements (Header, CartProvider)
const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <CartProvider>
            {/* GLOBAL HEADER */}
            <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center border-b">
                <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-red-600 transition">
                    Nokia Rebranded
                </Link>
                <div>
                    {/* CartButton lives inside the CartProvider to access context */}
                    <CartButton />
                </div>
            </header>
            
            {/* MAIN CONTENT */}
            {children}
        </CartProvider>
    );
};

export default AppWrapper;