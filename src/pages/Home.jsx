import { useState, useEffect, useContext } from "react";
import  { listPopularMovies, searchMovies}  from "../services/TmdbService";
import { Link } from "react-router-dom";
import { parseDate } from "../../public/utils";
import { ThemeContext } from "../contexts/ThemeContext";
import "./Home.css"

function Home() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [searchTerm, setSearchTerm] = useState("")

  const loadMovies = (searchTerm = "") => {
    setLoading(true);
    const fetchMovies = searchTerm ? searchMovies(searchTerm) : listPopularMovies();
    fetchMovies
      .then((films) => {
        console.log(films)
        setFilms(films.results || []);
      })
      .catch((error) => {
        console.log("Error al obtener películas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Cargar películas populares al montar el componente
  useEffect(() => {
    loadMovies();
  }, []);

  // Manejar la búsqueda de películas
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    loadMovies(e.target.value);
  };

  return (
    <>
      <h1 className="mb-5">Ironfilms</h1>
      
      <input
        type="text"
        placeholder="Busca una pelicula..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {films.map((film) => (
            <div className="col" key={film.id}>
              <div className="card h-100">
                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={film.title} />
                <div className="card-body">
                  <h5 className="card-title">{film.title}</h5>
                  <p className="card-text">{parseDate(film.release_date)}</p>
                  <Link to={`/details/${film.id}`}>See details</Link>
                </div>
              </div>
            </div>
          ))}

          <button onClick={toggleTheme} className={`btn btn-lg text-${theme === 'light' ? 'dark' : 'light'} btn-${theme}`}>
            theme is {theme}
          </button>
        </div>
        
      )}
    </>
  )
}

export default Home;
