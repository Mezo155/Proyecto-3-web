import React, { useEffect, useState } from 'react';
import { DiscoverMovies, getGenres, searchPerson, getMovieCertifications } from '../services/TmdbService';
import { parseDate, formatVoteAverage } from '../../public/utils';
import { Link } from 'react-router-dom';
import './FindFilms.css';

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
  const [page, setPage] = useState(1);  // Estado para la página actual
  const [hasMoreMovies, setHasMoreMovies] = useState(true);  // Controla si hay más películas para cargar

  useEffect(() => {
    getGenres()
      .then(data => {
        setGenres(data.genres);
        return getMovieCertifications();
      })
      .then(data => {
        setCertifications(data.certifications.ES); // Ajustar si cambia el país
        fetchMovies(1); // Fetch default movies after fetching genres and certifications
      })
      .catch(err => {
        setError(err.message);
        setLoading(false); // Stop loading in case of an error
      });
  }, []);

  const fetchMovies = (pageNum = 1) => {
    setLoading(true);  // Show spinner while loading data

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
      page: pageNum,  // Añadir el número de página a los parámetros
    };

    DiscoverMovies(params)
      .then(data => {
        // Solo actualiza si hay nuevos resultados para evitar duplicados
        if (pageNum === 1) {
          setMovies(data.results);  // Reinicia el estado de las películas en la página 1
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.results]);  // Añadir más películas a la lista existente
        }
        setPage(pageNum);  // Actualizar la página actual
        setHasMoreMovies(data.results.length > 0);  // Determinar si hay más películas para cargar
        setLoading(false);  // Hide spinner when data is ready
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);  // Hide spinner in case of an error
      });
  };

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
        } else {
          if (type === 'actor') {
            setActorId('');
          } else if (type === 'director') {
            setDirectorId('');
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

  const applyFilters = () => {
    setMovies([]);  // Limpiar las películas actuales
    setPage(1);  // Resetear la página
    setHasMoreMovies(true);  // Asegurarse de que haya más películas para cargar
    fetchMovies(1);  // Cargar películas de la primera página
  };

  if (loading && !error && movies.length === 0) return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

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

        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {movies.map((movie) => (
          <div className="col" key={movie.id}>
          <Link to={`/details/${movie.id}`} className="card1 h-100 text-decoration-none text-dark d-flex flex-column">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{movie.title}</h5>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-auto">
                <p className="card-text mb-0">{parseDate(movie.release_date)}</p>
              </div>
            </div>
          </Link>
        </div>
        ))}
      </div>
      {loading && movies.length > 0 && !error && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {hasMoreMovies && !loading && !error && (
        <button onClick={() => fetchMovies(page + 1)}>Ver Más Películas</button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DiscoverMoviesComponent;
