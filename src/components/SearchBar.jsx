import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 pr-4 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
      </div>
      <button
        type="submit"
        className="ml-2 px-4 py-2 text-sm font-medium text-secondary bg-primary rounded-full hover:bg-secondary hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar; 