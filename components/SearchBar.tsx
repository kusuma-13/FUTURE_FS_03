// components/SearchBar.tsx
'use client';

import React from 'react';

// Define the expected props
interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // A function to handle the search term change
  searchTerm: string; // The current search term (used to make the input controlled)
}

/**
 * A reusable search bar component for filtering products.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm }) => {
  return (
    <div className="mb-8 w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      />
    </div>
  );
};

export default SearchBar;