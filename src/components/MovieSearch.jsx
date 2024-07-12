// MovieSearch.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchMovies } from '../services/TmdbService';  // Asegúrate de importar la función correcta
import { formatVoteAverage, parseDate } from '../../public/utils';  // Asegúrate de tener estas funciones en utils.js

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
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {results.length > 0 ? (
            results.map((movie) => (
              <div className="col" key={movie.id}>
                <Link to={`/details/${movie.id}`} className="card1 h-100 card-size text-decoration-none text-dark">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text mb-0">{parseDate(movie.release_date)}</p>
                    <p className="card-average mb-0">{formatVoteAverage(movie.vote_average)}</p>
                  
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
