// app/page.tsx 

'use client'; 

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; 
// Use relative path: '../utils/firestore'
import { getCollection } from '../utils/firestore';  
// Use relative path: '../components/SearchBar'
import SearchBar from '../components/SearchBar';

// Define the structure for a product
type Product = {
    id: string;
    name: string;
    price: number;
    imageURL: string;
    description: string; // Add description to the type
    category?: string; // Add category for future use
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);       
  const [searchTerm, setSearchTerm] = useState('');              
  const [loading, setLoading] = useState(true);

  // 1. Fetch data on component mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getCollection('products'); 
        setProducts(data as Product[]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  // 2. Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products; 
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [products, searchTerm]);

  if (loading) {
    return <div className="text-center p-8 text-2xl text-blue-500">Loading Rebranded Products...</div>;
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-800">Nokia Rebranded Storefront</h1>
      
      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm} 
        onSearch={setSearchTerm} 
      />

      {filteredProducts.length === 0 && !loading ? (
        <p className="text-center text-xl text-gray-500">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Map over the FILTERED list */}
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col">
              
              <img 
                src={product.imageURL} 
                alt={product.name} 
                className="w-full h-48 object-contain mb-4 rounded-lg"
              />
              <h2 className="text-2xl font-bold mb-1 truncate">{product.name}</h2>
              <p className="text-xl text-red-600 font-semibold mb-3">${product.price.toFixed(2)}</p>
              
              {/* 3. UPDATED: Use Link for navigation */}
              <Link 
                href={`/products/${product.id}`} 
                className="mt-auto bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition text-center font-medium"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
