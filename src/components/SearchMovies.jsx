import React, { useState } from 'react';
import { searchMovies, listPopularMovies } from '../services/TmdbService';

const SearchMovies = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    let fetchMovies;
    if (term) {
      fetchMovies = searchMovies(term);
    } else {
      fetchMovies = listPopularMovies();
    }

    fetchMovies
      .then((movies) => {
        onSearch(movies.results || []);
      })
      .catch((error) => {
        console.error('Error al cargar películas:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchMovies;
