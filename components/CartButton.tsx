// components/CartButton.tsx
'use client';

import React, { useState } from 'react';
import { useCart } from '../utils/CartContext'; // Adjust path
import CartModal from './CartModal'; // Import the new Modal

const CartButton: React.FC = () => {
  const { cartCount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  
  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleCartClick}
        className="relative p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition duration-300"
        aria-label="Shopping Cart"
      >
        {/* Shopping Cart Icon (SVG) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.2 4.4a1 1 0 00.8 1.6h12.4a1 1 0 00.8-1.6L17 13M9 20a1 1 0 11-2 0 1 1 0 012 0zM19 20a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        
        {/* Item Count Badge */}
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full">
            {cartCount}
          </span>
        )}
      </button>

      {/* The Cart Modal Component */}
      <CartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default CartButton;