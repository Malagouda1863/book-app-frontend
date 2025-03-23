import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchBooksQuery } from '../../redux/features/books/booksApi';
import BookCard from './BookCard';
import './searchResults.css'; // We'll create this CSS file later

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  
  const { data: books = [], isLoading, isError } = useSearchBooksQuery(searchQuery, {
    skip: !searchQuery,
  });

  if (!searchQuery) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-6">Search Books</h1>
        <p className="text-center text-gray-600">Please enter a search term.</p>
      </div>
    );
  }

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading books. Please try again later.</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Search Results for: "{searchQuery}"</h1>
      
      {books.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No books found matching your search criteria.</p>
        </div>
      ) : (
        <div className="search-results-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div key={book._id || index} className="search-result-wrapper">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 