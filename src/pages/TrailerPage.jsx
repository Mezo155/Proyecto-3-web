import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { trailerMovie, detailsPopularMovies } from '../services/TmdbService';
import "./TrailerPage.css"
import { useNavigate } from 'react-router-dom';


function TrailerPage() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    // Obtén los detalles de la película y los tráileres
    detailsPopularMovies(id)
      .then(detailsResponse => {
        // Se elimina el uso de backdropUrl
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

  if (!trailerKey) {
    // Redirige a /details/:id si no hay tráiler
   
    return null;
  }

  return (
    <div className="trailer-page">
      {trailerKey && (
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
      )}
    </div>
  );
}

export default TrailerPage;
