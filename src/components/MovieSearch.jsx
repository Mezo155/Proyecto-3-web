// MovieSearch.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/TmdbService';  // Asegúrate de importar la función correcta

const MovieSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const { results } = await searchMovies(query);
        setResults(results);
      } catch (err) {
        setError('Error al buscar películas.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="movie-search-results">
      <h1>Resultados de Búsqueda</h1>
      <p><strong>Búsqueda:</strong> {query}</p>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="results">
          {results.length > 0 ? (
            <ul>
              {results.map((movie) => (
                <li key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                    <p>{movie.overview}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
