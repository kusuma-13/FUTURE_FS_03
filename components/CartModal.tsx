// components/CartModal.tsx
'use client';

import React from 'react';
import { useCart } from '../utils/CartContext'; // Adjust path

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartCount } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    // Overlay backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" 
      onClick={onClose}
    >
      {/* Modal content area */}
      <div 
        className="w-full max-w-sm h-full bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart ({cartCount})</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">
              &times; {/* Simple close (X) button */}
            </button>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} @ ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    {/* NOTE: Remove/Update buttons are excluded for brevity but would go here */}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cart Footer / Checkout */}
          <div className="mt-8 pt-4 border-t-2">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition"
              onClick={() => alert("Proceeding to checkout is a future feature!")}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;