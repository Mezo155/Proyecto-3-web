import { useContext, useEffect, useState } from "react";
import { detailsPopularMovies, CreditsPopularMovies, trailerMovie } from "../services/TmdbService";
import { Link, useParams } from "react-router-dom";
import { parseDate, parseYear, parseHours } from "../../public/utils";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../contexts/AuthContext";
import { likeFilm, getMyLikes, getFilmComments, getMyWatchlist } from "../services/filmsServices";
import "./FilmsDetails.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WatchlistButton from "../components/WatchListButton";


function FilmsDetails() {
  const { id } = useParams();
  const [filmsDetail, setFilmsDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState({});
  const [liked, setLiked] = useState(false);
  const [watchList, setWatchList] = useState(false);
  const [comments, setComments] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      Promise.all([
        detailsPopularMovies(id),
        CreditsPopularMovies(id),
        trailerMovie(id),
        getMyLikes(),
        getMyWatchlist(),
        getFilmComments(id),
      ])
        .then(([film, credits, trailers, likes, watchLists, comments]) => {
          setFilmsDetail(film);
          setCredits(credits);
          setComments(comments);
          const officialTrailer = trailers.results.find(video =>
            (video.name.toLowerCase().includes('tráiler') || video.name.toLowerCase().includes('trailer')) &&
            video.name.toLowerCase().includes('español')
          );

          setTrailers(officialTrailer ? officialTrailer.key : null);
          const likedFilm = likes.find((like) => like.externalItemId === id);
          setLiked(!!likedFilm);
          const watchFilm = watchLists.find((watchList) => watchList.externalItemId === id);
          setWatchList(!!watchFilm);
        })
        .catch((error) => {
          console.log("Error al obtener detalles de películas:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id, user]);

  const handleLikeChange = (newWatchlistStatus) => {
    setLiked(newWatchlistStatus);
  };

  const handleWatchlistChange = (newWatchlistStatus) => {
    setWatchList(newWatchlistStatus);
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${filmsDetail.backdrop_path}`;
  const hasTrailer = trailers !== null;
  const director = credits.crew ? credits.crew.find(member => member.job === "Director") : null;

  return (
    <>
      <div className={`card mb-3 card-background`} style={{ backgroundImage: `url(${backdropUrl})`, maxWidth: '100vw' }}>
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

              <div className="button-row">
                <div className="button-container">
                  <LikeButton
                    userId={user.id}
                    externalItemId={id}
                    liked={liked}
                    onLikeChange={handleLikeChange}
                  />
                  <WatchlistButton
                    userId={user.id}
                    externalItemId={id}
                    watchList={watchList}
                    onWatchListChange={handleWatchlistChange}
                  />
                </div>
              </div>

              <div className="synopsis">
                <h5>{filmsDetail.tagline}</h5>
                <h6 className="card-text">{filmsDetail.overview}</h6>
              </div>

              <Link to={`/comments/${id}`} className="btn btn-primary mb-3 btn-criticism">
                Añade tu crítica
              </Link>

              {director && (
                <div className="director-name mt-3">
                  <h6>Director: {director.name}</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="films-container1">
        {credits.cast && credits.cast.map((actor) => (
          <div key={actor.cast_id} className="card3">
            <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} className="card-img-top" alt={actor.name} />
            <div className="card-body">
              <h5 className="card-title">{actor.name}</h5>
              <p className="card-text">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>

      {comments.length > 0 && (
        <button 
          className="btn btn-secondary mt-5" 
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Ocultar Comentarios' : `Ver Comentarios (${comments.length})`}
        </button>
      )}

      {showComments && (
       <div>
       <ul className="list-group">
         {comments.map((comment, index) => (
           <li key={comment._id} className="list-group-item comment-card">
             <div className="comment-header">
               <img src={comment.user.imgUrl} alt={`${comment.user.userName}'s profile`} className="profile-picture" />
               <div className="user-info">
                 <strong className="user-name">{comment.user.userName}</strong>
               </div>
             </div>
             <div className="comment-body">
               <h3 className="comment-title">{comment.title}</h3>
               <p className="comment-text">{comment.comment}</p>
             </div>
             {index !== comments.length - 1 && <hr />} {/* Agrega un hr entre tarjetas, pero no después de la última */}
           </li>
         ))}
       </ul>
     </div>
      )}
    </>
  );
}

export default FilmsDetails;
