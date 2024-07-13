import { useEffect, useState, useContext } from "react";
import { getMyLikes, getMyWatchlist } from "../services/filmsServices";
import { AuthContext } from "../contexts/AuthContext";
import { parseDate } from "../../public/utils";
import { detailsPopularMovies } from "../services/TmdbService";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [likedFilms, setLikedFilms] = useState([]);
  const [watchlistFilms, setWatchlistFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('favorites'); // Estado para la pestaña activa
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchLikedFilms = getMyLikes()
        .then((likes) => {
          const filmDetailsPromises = likes.map((like) =>
            detailsPopularMovies(like.externalItemId)
          );
          return Promise.all(filmDetailsPromises);
        })
        .then((filmsDetails) => {
          setLikedFilms(filmsDetails);
        });

      const fetchWatchlistFilms = getMyWatchlist()
        .then((watchlist) => {
          const watchlistDetailsPromises = watchlist.map((item) =>
            detailsPopularMovies(item.externalItemId)
          );
          return Promise.all(watchlistDetailsPromises);
        })
        .then((watchlistDetails) => {
          setWatchlistFilms(watchlistDetails);
        });

      Promise.all([fetchLikedFilms, fetchWatchlistFilms])
        .catch((error) => {
          console.log("Error al obtener detalles de las películas:", error);
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
    <div className="profile-container">
      {user && (
        <div className="user-profile mb-4 text-center">
          <img 
            src={user.imgUrl} 
            alt={user.userName} 
            className="img-thumbnail rounded-profile"
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%',  /* Haciendo la imagen redonda */
              objectFit: 'cover'   /* Asegura que la imagen cubra el área del contenedor */
            }}  
          />
          <h2>{user.userName}</h2>
        </div>
      )}

      {/* Pestañas */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
            id="favorites-tab"
            data-bs-toggle="tab"
            data-bs-target="#favorites"
            type="button"
            role="tab"
            aria-controls="favorites"
            aria-selected={activeTab === 'favorites'}
            onClick={() => setActiveTab('favorites')}
          >
            Mis Películas Favoritas
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'watchlist' ? 'active' : ''}`}
            id="watchlist-tab"
            data-bs-toggle="tab"
            data-bs-target="#watchlist"
            type="button"
            role="tab"
            aria-controls="watchlist"
            aria-selected={activeTab === 'watchlist'}
            onClick={() => setActiveTab('watchlist')}
          >
            Películas que Quiero Ver
          </button>
        </li>
      </ul>
      
      {/* Contenido de las pestañas */}
      <div className="tab-content mt-3" id="myTabContent">
        <div
          className={`tab-pane fade ${activeTab === 'favorites' ? 'show active' : ''}`}
          id="favorites"
          role="tabpanel"
          aria-labelledby="favorites-tab"
        >
          {likedFilms.length === 0 ? (
            <p>No tienes películas favoritas aún.</p>
          ) : (
            <div className="row">
              {likedFilms.map((film) => (
                <div key={film.id} className="col-md-4 mb-3">
                  <div className="card card-borderless">
                    <Link to={`/details/${film.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={film.title} />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{film.title}</h5>
                      <p>{parseDate(film.release_date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`tab-pane fade ${activeTab === 'watchlist' ? 'show active' : ''}`}
          id="watchlist"
          role="tabpanel"
          aria-labelledby="watchlist-tab"
        >
          {watchlistFilms.length === 0 ? (
            <p>No tienes películas en tu watchlist aún.</p>
          ) : (
            <div className="row">
              {watchlistFilms.map((film) => (
                <div key={film.id} className="col-md-4 mb-3">
                  <div className="card card-borderless">
                    <Link to={`/details/${film.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={film.title} />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{film.title}</h5>
                      <p>{parseDate(film.release_date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
