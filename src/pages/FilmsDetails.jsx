import { useContext, useEffect, useState } from "react";
import { detailsPopularMovies, CreditsPopularMovies, trailerMovie } from "../services/TmdbService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { parseDate, parseYear, parseHours } from "../../public/utils";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../contexts/AuthContext";
import { likeFilm, getMyLikes, getFilmComments } from "../services/filmsServices";
import "./FilmsDetails.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function FilmsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filmsDetail, setFilmsDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState({});
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [trailers, setTrailers] = useState([]);  // Estado para almacenar trailers
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      Promise.all([
        detailsPopularMovies(id),
        CreditsPopularMovies(id),
        trailerMovie(id),  // Llamada para obtener trailers
        getMyLikes(),
        getFilmComments(id),
      ])
        .then(([film, credits, trailers, likes, comments]) => {
          setFilmsDetail(film);
          setCredits(credits);
          setComments(comments);
          setTrailers(trailers.results || []);  // Establecer trailers
          const likedFilm = likes.find((like) => like.externalItemId === id);
          setLiked(!!likedFilm);
        })
        .catch((error) => {
          console.log("Error al obtener detalles de películas:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id, user]);
  
  const handleLikeChange = () => {
    likeFilm(filmsDetail.id)
      .then(() => {
        setLiked(!liked);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${filmsDetail.backdrop_path}`;
  const hasTrailer = trailers.length > 0;
  console.log('Has trailer:', hasTrailer);  // Verificación de si hay trailers

  return (
    <>
      <h1 className="mb-5">Films details</h1>

      <div className={`card mb-3 card-background `} style={{ backgroundImage: `url(${backdropUrl})`, maxWidth: '100vw' }}>
        <div className="card-overlay"></div>
        <div className="row g-0">
        <div className="col-md-4">
  <div className={`position-relative ${hasTrailer ? 'trailer-available' : ''}`}>
    <img src={`https://image.tmdb.org/t/p/w500${filmsDetail.poster_path}`} className="img-fluid rounded-start" alt={filmsDetail.title} />
    {hasTrailer && (
      <div className="play-icon-overlay">
        <Link to={`/movie/${id}/trailer`} className="d-block">
          <FontAwesomeIcon icon={faPlay} size="4x" className="play-icon" />
        </Link>
      </div>
    )}
  </div>
</div>
          <div className="col-md-8 card-content">
            <div className="card-body">
              <h1 className="card-title">
                {filmsDetail.title}
                <span className="release-year">{parseYear(filmsDetail.release_date)}</span>
              </h1>
              <div>
                {parseDate(filmsDetail.release_date)}
                <span>
                  {filmsDetail.genres && filmsDetail.genres.map((genre) => (
                    <span key={genre.id} className="badge bg-primary me-2">
                      {genre.name}
                    </span>
                  ))}
                </span>
                <span>
                  {parseHours(filmsDetail.runtime)}
                </span>
              </div>
              <div className="synopsis">
                <h5>{filmsDetail.tagline}</h5>
                <p className="card-text">{filmsDetail.overview}</p>
              </div>
              <div>
                <LikeButton
                  userId={user.id}
                  externalItemId={id}
                  liked={liked}
                  onLikeChange={handleLikeChange}
                />
              </div>
              <Link to={`/comments/${id}`} className="btn btn-primary mb-3">
                Comentar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Credits */}
      <h2 className="mt-5">Main Cast</h2>
      <div className="row">
        {credits.cast && credits.cast.slice(0, 6).map((actor) => (
          <div key={actor.cast_id} className="col-md-2">
            <div className="card">
              <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} className="card-img-top" alt={actor.name} />
              <div className="card-body">
                <h5 className="card-title">{actor.name}</h5>
                <p className="card-text">{actor.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Section */}
      <h2 className="mt-5">Comentarios</h2>
      <div>
        {comments.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          <ul className="list-group">
            {comments.map((comment) => (
              <li key={comment._id} className="list-group-item">
                <strong>{comment.user.userName}: </strong>
                <h3>{comment.title}</h3>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default FilmsDetails;

