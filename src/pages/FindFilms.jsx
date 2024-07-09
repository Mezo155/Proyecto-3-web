// DiscoverMoviesComponent.js
import React, { useEffect, useState } from 'react';
import { DiscoverMovies } from '../services/TmdbService';
import { parseDate } from '../../public/utils';
import { Link } from 'react-router-dom';
import "./FindFilms.css"

const DiscoverMoviesComponent = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      DiscoverMovies()
        .then(data => {
            console.log(data)
          setMovies(data.results);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    if (loading) return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    
      if (error) return <p>Error: {error}</p>;
    
      return (
        <div>
          <h1>Discover Movies</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {movies.map((movie) => (
              <div className="col" key={movie.id}>
                <Link to={`/details/${movie.id}`} className="card h-100 card-size text-decoration-none text-dark">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{parseDate(movie.release_date)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default DiscoverMoviesComponent;
    
    
    
    
    
    
    
    
    
    
    