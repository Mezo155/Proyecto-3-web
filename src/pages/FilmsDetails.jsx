import { useEffect, useState } from "react";
import { detailsPopularMovies } from "../services/TmdbService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { parseDate } from "../../public/utils";
import "./FilmsDetails.css"
import { parseYear } from "../../public/utils";
import { parseHours} from "../../public/utils"

function FilmsDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filmsDetail, setFilmsDetail] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    detailsPopularMovies(id)
      .then((film) => {
        console.log(film)
        setFilmsDetail(film)
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmsDetails;
