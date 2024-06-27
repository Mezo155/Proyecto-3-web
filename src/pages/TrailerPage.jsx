import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { trailerMovie } from '../services/TmdbService';

function TrailerPage() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    trailerMovie(id)
      .then(response => {
        console.log(response);
        // Verifica si hay resultados y si hay al menos un video disponible
        if (response.results && response.results.length > 0) {
          // Obtén la clave (key) del primer video disponible
          const officialTrailer = response.results.find(video => video.name.toLowerCase().includes("tráiler") || video.name.toLowerCase().includes("trailer"));
          if (officialTrailer) {
            setTrailerKey(officialTrailer.key);}
        } else {
          // Si no hay videos disponibles, podrías manejarlo aquí
          console.warn('No se encontraron videos disponibles para mostrar.');
          setTrailerKey(null); // Puedes manejar un estado diferente para este caso si es necesario
        }
      })
      .catch(error => {
        console.error('Error al obtener el tráiler:', error);
        setTrailerKey(null); // Manejo de error: puedes manejar un estado diferente para errores
      });
  }, [id]);

  if (!trailerKey) {
    return <p>Cargando tráiler...</p>;
  }

  // Construye la URL del video del tráiler utilizando la clave (key) obtenida
  const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;

  return (
    <div>
      <h1>Tráiler</h1>
      <div className="video-container">
        <iframe
          title="Tráiler"
          width="1000px"
          height="1000px"
          src={trailerUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default TrailerPage;
