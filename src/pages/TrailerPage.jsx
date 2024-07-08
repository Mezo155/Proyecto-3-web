import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trailerMovie, detailsPopularMovies } from '../services/TmdbService';
import "./TrailerPage.css"

function TrailerPage() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [backdropUrl, setBackdropUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtén los detalles de la película
    detailsPopularMovies(id)
      .then(detailsResponse => {
        setBackdropUrl(`https://image.tmdb.org/t/p/original${detailsResponse.backdrop_path}`);

        // Obtén los tráileres
        return trailerMovie(id);
      })
      .then(trailerResponse => {
        console.log("a ver que trae la api", trailerResponse);

        // Verifica si hay resultados y si hay al menos un video disponible
        if (trailerResponse.results && trailerResponse.results.length > 0) {
          const officialTrailer = trailerResponse.results.find(video =>
            (video.name.toLowerCase().includes('tráiler') || video.name.toLowerCase().includes('trailer')) &&
            video.name.toLowerCase().includes('español')
          );
          if (officialTrailer) {
            setTrailerKey(officialTrailer.key);
          }
        }
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Cargando tráiler...</p>;
  }

  return (
    <div
      className="trailer-page"
      style={{ backgroundImage: `url(${backdropUrl})`}}
    >
      {trailerKey ? (
        <>
          <h1>Tráiler</h1>
          <div className="video-container">
            <iframe
              title="Tráiler"
              width="1000px"
              height="1000px"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ) : (
        <div className="no-trailer-message">
          <p>No hay trailers disponibles</p>
          <Link to={`/details/${id}`} className="back-to-details-button">
            Volver a detalles
          </Link>
        </div>
      )}
    </div>
  );
}

export default TrailerPage;

