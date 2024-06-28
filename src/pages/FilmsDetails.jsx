import { useEffect, useState } from "react";
import { detailsPopularMovies, CreditsPopularMovies  } from "../services/TmdbService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { parseDate, parseYear, parseHours } from "../../public/utils";
import "./FilmsDetails.css"


function FilmsDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filmsDetail, setFilmsDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState({})

  useEffect(() => {
    Promise.all([detailsPopularMovies(id), CreditsPopularMovies(id)])
      .then(([film, credits]) => {
        console.log({credits, film})
        setFilmsDetail(film)
        setCredits(credits)
      })
      .catch((error) => {
        console.log("Error al obtener detalles de películas:", error); // Maneja errores y muestra detalles del error
      })
      .finally(() => setLoading(false))
  }, [id])

  /* const handleDeleteBtnClick = () => {
    deleteApartment(id)
      .then(() => {
        navigate('/')
      })
      .catch((e) => console.log(e))
  } */

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${filmsDetail.backdrop_path}`;

  return (
    /* Film details */
    <>
      <h1 className="mb-5">Films details</h1>

      <div className={`card mb-3 card-background`} style={{ backgroundImage: `url(${backdropUrl})`, maxWidth: '100vw' }}>
      <div className="card-overlay"></div> {/* Capa semitransparente */}
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`https://image.tmdb.org/t/p/w500${filmsDetail.poster_path}`} className="img-fluid rounded-start" alt={filmsDetail.title} />
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
            {filmsDetail.genres.map((genre) => (
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
            <Link to={`/movie/${id}/trailer`} className="btn btn-primary">
              Ver trailer
            </Link>
            </div>
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
    </>
  );
}

export default FilmsDetails;
