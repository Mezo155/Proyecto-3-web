import { useEffect, useState, useContext } from "react";
import { getMyLikes } from "../services/filmsServices";
import { AuthContext } from "../contexts/AuthContext";
import { parseDate, parseYear, parseHours } from "../../public/utils";
import { detailsPopularMovies } from "../services/TmdbService";

function Profile() {
  const [likedFilms, setLikedFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getMyLikes()
        .then((likes) => {
          // Mapea cada ID de película a una llamada para obtener los detalles
          const filmDetailsPromises = likes.map((like) =>
            detailsPopularMovies(like.externalItemId)
          );

          // Resuelve todas las promesas para obtener los detalles de todas las películas
          return Promise.all(filmDetailsPromises);
        })
        .then((filmsDetails) => {
          setLikedFilms(filmsDetails);
        })
        .catch((error) => {
          console.log("Error al obtener detalles de las películas favoritas:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h1>Mis Películas Favoritas</h1>
      {likedFilms.length === 0 ? (
        <p>No tienes películas favoritas aún.</p>
      ) : (
        <div className="row">
          {likedFilms.map((film) => (
            <div key={film.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={film.title} />
                <div className="card-body">
                  <h5 className="card-title">
                    {film.title}
                    <span className="release-year">{parseYear(film.release_date)}</span>
                  </h5>
                  <p>{parseDate(film.release_date)}</p>
                  <p>{parseHours(film.runtime)}</p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
