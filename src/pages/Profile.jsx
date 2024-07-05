import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getMyLikes } from "../services/filmsServices";
import { Link } from "react-router-dom";
import './Profile.css';

function Profile() {
  const { user } = useContext(AuthContext);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    if (user) {
      getMyLikes()
        .then((likes) => {
          // Extract movie details from the like responses
          const movieDetails = likes.map((like) => ({
            id: like.externalItemId,
            poster_path: like.poster_path,
            title: like.title,
          }));
          setLikedMovies(movieDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <div className="profile-container">
      <h1>Perfil de {user?.name}</h1>
      {/* Otras secciones del perfil, como detalles de usuario, etc. */}

      <h2 className="mt-5">Mis Películas Favoritas</h2>
      <div className="row">
        {likedMovies.map((movie) => (
          <div key={movie.id} className="col-md-2 mb-3">
            <div className="card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
