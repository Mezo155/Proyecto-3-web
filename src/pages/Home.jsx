// Home.js
import { useState, useEffect } from "react";
import { listPopularMovies, searchMovies, listNowPlayingMovies, listTopRatedMovies } from "../services/TmdbService";
import { Link, useNavigate } from "react-router-dom";
import { parseDate } from "../../public/utils";
import "./Home.css";

function Home() {
  const [popularFilms, setPopularFilms] = useState([]);
  const [nowPlayingFilms, setNowPlayingFilms] = useState([]);
  const [topRatedFilms, setTopRatedFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Para redirigir al usuario

  const loadMovies = async (searchTerm = "") => {
    setLoading(true);
    try {
      const popular = await listPopularMovies();
      setPopularFilms(popular.results || []);
      
      const nowPlaying = await listNowPlayingMovies();
      setNowPlayingFilms(nowPlaying.results || []);
      
      const topRated = await listTopRatedMovies();
      setTopRatedFilms(topRated.results || []);

      if (searchTerm) {
        const searchResults = await searchMovies(searchTerm);
        setPopularFilms(searchResults.results || []);
      }
    } catch (error) {
      console.log("Error al obtener películas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);  // Navegar a la página de búsqueda
    }
  };

  return (
    <>
      <div className="search-container mb-5">
        <h1 className="welcome-title">Te damos la bienvenida</h1>
        <h2 className="explore-title">Millones de películas por descubrir. ¡Explora ya!</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Busca una película..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {/* <button type="submit" className="search-button">Buscar</button> */}
        </form>
      </div>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2 className="popular-title mb-4">Lo más popular</h2>
          <div className="films-container">
            {popularFilms.map((film) => (
              <div className="col" key={film.id}>
                <div className="card2 h-100">
                  <Link to={`/details/${film.id}`} className="card-link">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                      className="card-img-top"
                      alt={film.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{film.title}</h5>
                    <p className="card-text">{parseDate(film.release_date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="popular-title mb-4">En Cines Ahora</h2>
          <div className="films-container">
            {nowPlayingFilms.map((film) => (
              <div className="col" key={film.id}>
                <div className="card2 h-100">
                  <Link to={`/details/${film.id}`} className="card-link">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                      className="card-img-top"
                      alt={film.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{film.title}</h5>
                    <p className="card-text">{parseDate(film.release_date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="popular-title mb-4">Mejor Valoradas</h2>
          <div className="films-container">
            {topRatedFilms.map((film) => (
              <div className="col" key={film.id}>
                <div className="card2 h-100">
                  <Link to={`/details/${film.id}`} className="card-link">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                      className="card-img-top"
                      alt={film.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{film.title}</h5>
                    <p className="card-text">{parseDate(film.release_date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
