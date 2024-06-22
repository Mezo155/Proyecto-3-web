import { useState, useEffect, useContext } from "react";
import { listFilms } from "../services/filmsServices";
import { Link } from "react-router-dom";
import { parseDate } from "../../public/utils";
import { ThemeContext } from "../contexts/ThemeContext";

function Home() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    listFilms()
      .then((films) => {
        console.log(films)
        setFilms(films)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <h1 className="mb-5">Ironfilms</h1>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {films.map((film) => (
            <div className="col" key={film._id}>
              <div className="card h-100">
                <img src={film.img} className="card-img-top" alt={film.img} />
                <div className="card-body">
                  <h5 className="card-title">{film.title}</h5>
                  <p className="card-text">Price per day: {film.pricePerDay} €</p>
                  <Link to={`/apartments/${film._id}`}>See details</Link>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Updated: {parseDate(film.updatedAt)}</small>
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
