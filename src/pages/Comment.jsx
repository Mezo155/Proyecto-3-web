import { useContext, useEffect, useState } from "react";
import { createComment } from "../services/filmsServices";
import { detailsPopularMovies } from "../services/TmdbService";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import './Comment.css'; // Asegúrate de incluir este archivo CSS

const Comment = () => {
  const { filmId } = useParams();  // Obtiene el ID de la película desde los parámetros de la URL
  const { user: currentUser, isAuthLoaded } = useContext(AuthContext);
  const [comment, setComment] = useState({
    title: "",
    comment: ""
  });
  const [backdropUrl, setBackdropUrl] = useState("");  // Estado para almacenar el backdrop_path

  const navigate = useNavigate();

  useEffect(() => {
    if (filmId) {
      detailsPopularMovies(filmId)  // Obtiene los detalles de la película usando el ID
        .then((film) => {
          setBackdropUrl(`https://image.tmdb.org/t/p/original${film.backdrop_path}`);  // Construye la URL para el backdrop_path
        })
        .catch(err => {
          console.error('Error al obtener detalles de la película:', err);
        });
    }
  }, [filmId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setComment({
      ...comment,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentUser) {
      console.error('User must be logged in to leave a comment');
      return;
    }

    createComment({ ...comment, user: currentUser._id, filmId })  // Crea el comentario con el ID del usuario y el ID de la película
      .then(() => {
        navigate(`/details/${filmId}`);  // Redirige al detalle de la película después de enviar el comentario
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (!isAuthLoaded) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <p>You must be logged in to leave a comment.</p>;
  }

  return (
    <div className="comment-container" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="overlay"></div>
      <div className="form-container">
        <h1 className="mb-3"></h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input 
              onChange={handleInputChange} 
              value={comment.title} 
              type="text" 
              className="form-control" 
              name="title" 
              id="title" 
              required 
              minLength={10} 
              placeholder="Escribe un título..." 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comentario</label>
            <textarea 
              onChange={handleInputChange} 
              value={comment.comment} 
              className="form-control" 
              name="comment" 
              id="comment" 
              required 
              minLength={10} 
              placeholder="Escribe tu comentario aquí..." 
            />
          </div>

          <button type="submit" className="btn btn-primary">Mandar Crítica</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
