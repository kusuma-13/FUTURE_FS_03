// app/products/[id]/page.tsx

'use client'; 

import { useState, useEffect } from 'react';
// FIX: Corrected relative path to reach lib/firebase (up 3 levels)
import { db } from '../../../lib/firebase'; 
import { doc, getDoc } from 'firebase/firestore'; 
// FIX: Corrected relative path to reach utils/CartContext (up 3 levels)
import { useCart } from '../../../utils/CartContext'; 

// Define the structure for a product document
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    // Add any other fields you included in Firestore
}

// Next.js passes the dynamic segment 'id' from the URL as `params`
export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use the cart hook to get state and functions
  const { addToCart, cartCount } = useCart(); 

  // 1. Fetch data based on URL ID
  useEffect(() => {
    if (!params.id) {
        setLoading(false);
        return;
    }

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', params.id); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          console.error(`Document with ID ${params.id} not found.`);
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // 2. Define handler INSIDE the component where 'product' is in scope
  const handleAddToCart = () => {
      if (product) {
          addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
          });
          // Provide feedback to the user
          alert(`${product.name} added to cart! Current total items: ${cartCount + 1}`); 
      }
  };


  if (loading) return <div className="text-center p-16 text-xl text-blue-500">Loading product details...</div>;
  if (!product) return <div className="text-center p-16 text-xl text-red-600">Product not found. Please check the ID.</div>;

  return (
    <div className="container mx-auto p-8 max-w-6xl min-h-[80vh]">
      <div className="md:flex gap-12 bg-white p-8 rounded-xl shadow-2xl">
        <div className="md:w-1/2 flex justify-center items-center">
          <img 
            src={product.imageURL} 
            alt={product.name} 
            className="w-full max-h-96 object-contain rounded-xl"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-4xl text-green-600 font-bold mb-6">${product.price.toFixed(2)}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 border-b pb-2">Product Overview</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
          
          <p className="text-sm text-gray-500 mt-4">Product ID: {product.id}</p>

          <button 
            className="mt-10 bg-blue-600 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            onClick={handleAddToCart} // Call the function defined above
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}