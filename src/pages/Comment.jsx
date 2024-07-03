import { useContext, useState } from "react";
import { createComment } from "../services/filmsServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Comment = ({filmId}) => {
    console.log('Film ID in FilmDetails:', filmId);
  const { user: currentUser, isAuthLoaded } = useContext(AuthContext);
  const [comment, setComment] = useState({
    title: "",
    comment: ""
  });

  const navigate = useNavigate();

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

    createComment({ ...comment, user: currentUser._id, filmId })  // Asegúrate de pasar el userId del contexto y filmId como prop
      .then(() => {
/*         navigate(`/details/${filmId}`);  // Redirige a una página de comentarios o al perfil del usuario
 */      })
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
    <div>
      <h1 className="mb-3">Leave a Comment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
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
          <label htmlFor="comment" className="form-label">Comment</label>
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

        <button type="submit" className="btn btn-primary">Submit Comment</button>
      </form>
    </div>
  );
};

export default Comment;
