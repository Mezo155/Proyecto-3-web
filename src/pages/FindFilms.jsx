// DiscoverMoviesComponent.js
import React, { useEffect, useState } from 'react';
import { DiscoverMovies, getGenres, searchPerson, getMovieCertifications} from '../services/TmdbService';
import { parseDate, formatVoteAverage } from '../../public/utils';
import { Link } from 'react-router-dom';
import "./FindFilms.css"

const DiscoverMoviesComponent = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [filters, setFilters] = useState({
        genre: '',
        year: '',
        ageRating: '',
        averageRating: '',
        actor: '',
        director: '',
    });

    const [actorId, setActorId] = useState('');
    const [directorId, setDirectorId] = useState('');

    useEffect(() => {
      getGenres()
        .then(data => {
          setGenres(data.genres);
        })
        .catch(err => {
          setError(err.message);
        });
    }, []);

    useEffect(() => {
      // Obtener certificaciones de películas
      getMovieCertifications()
        .then(data => {
          console.log("********", data)
          setCertifications(data.certifications.ES); // Asegúrate de ajustar esto si el país cambia
        })
        .catch(err => {
          setError(err.message);
        });
    }, []);

    useEffect(() => {
      const { genre, year, ageRating, averageRating } = filters;
      const params = {
        with_genres: genre,
        'primary_release_date.gte': year ? `${year}-01-01` : undefined,
        'primary_release_date.lte': year ? `${year}-12-31` : undefined,
        'certification_country': 'ES',
        'certification.lte': ageRating,
        'vote_average.gte': averageRating,
        with_cast: actorId,
        with_crew: directorId,
      };
      
      DiscoverMovies(params)
        .then(data => { 
          setMovies(data.results);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, [filters, actorId, directorId]);

    const handleFilterChange = (event) => {
      const { name, value } = event.target;
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value,
      }));
    };

    const handleSearchPerson = (type, query) => {
      searchPerson(query)
        .then(data => {
          const person = data.results[0];
          if (person) {
            if (type === 'actor') {
              setActorId(person.id);
            } else if (type === 'director') {
              setDirectorId(person.id);
            }
          }
        })
        .catch(err => {
          setError(err.message);
        });
    };

    const handlePersonChange = (event) => {
      const { name, value } = event.target;
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value,
      }));
      if (value) {
        handleSearchPerson(name, value);
      } else {
        if (name === 'actor') {
          setActorId('');
        } else if (name === 'director') {
          setDirectorId('');
        }
      }
    };

    if (loading) return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h1>Discover Movies</h1>
        <div>
          <label htmlFor="genre-select">Select Genre: </label>
          <select id="genre-select" name="genre" onChange={handleFilterChange} value={filters.genre}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <label htmlFor="year-select">Select Year: </label>
          <input
            id="year-select"
            name="year"
            type="number"
            placeholder="Year"
            value={filters.year}
            onChange={handleFilterChange}
            min="1900"
            max={new Date().getFullYear()}
          />
          <label htmlFor="age-rating-select">Select Age Rating: </label>
          <select
            id="age-rating-select"
            name="ageRating"
            value={filters.ageRating}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {certifications
            .filter(cert => cert.certification !== 'Ai' && cert.certification !== '7i' && cert.certification !== 'X')
            .map(cert => (
              <option key={cert.certification} value={cert.certification}>
                {cert.certification}: {cert.description}
              </option>
            ))}
          </select>

          {/* <label htmlFor="average-rating-select">Select Average Rating: </label>
          <input
            id="average-rating-select"
            name="averageRating"
            type="number"
            step="1"
            placeholder="Average Rating"
            value={filters.averageRating}
            onChange={handleFilterChange}
            min="0"
            max="10"
          /> */}

          <label htmlFor="actor-input">Select Actor: </label>
          <input
            id="actor-input"
            name="actor"
            type="text"
            placeholder="Actor Name"
            value={filters.actor}
            onChange={handlePersonChange}
          />

          <label htmlFor="director-input">Select Director: </label>
          <input
            id="director-input"
            name="director"
            type="text"
            placeholder="Director Name"
            value={filters.director}
            onChange={handlePersonChange}
          />
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {movies.map((movie) => (
            <div className="col" key={movie.id}>
              <Link to={`/details/${movie.id}`} className="card h-100 card-size text-decoration-none text-dark">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <div className="d-flex align-items-center justify-content-between">
            <p className="card-average mb-0">{formatVoteAverage(movie.vote_average)}</p>
            <p className="card-text mb-0">{parseDate(movie.release_date)}</p>
          </div>
                  
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default DiscoverMoviesComponent;
