import { likeFilm } from '../services/filmsServices';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./LikeButton.css";

const LikeButton = ({ externalItemId, liked, onLikeChange }) => {
  const { user } = useContext(AuthContext);  // Obtén user desde el contexto

  if (!user) {
    // Asegúrate de manejar el caso en el que el usuario no está autenticado
    return <button disabled>Add to Likelist</button>;
  }

  const handleLike = () => {
    if (!externalItemId) {
      console.error('externalItemId must be provided');
      return;
    }
    console.log('Liking film with ID:', externalItemId);
    likeFilm(externalItemId)
      .then(response => {
        console.log(response);
        // Cambia el estado de `liked` en el componente padre
        if (onLikeChange) {
          onLikeChange(!liked); // Actualiza el estado del like
        }
      })
      .catch(error => {
        console.error('Error liking film', error);
      });
  };

  return (
    <div className="tooltip-container1">
      <button
        type='button'
        onClick={handleLike}
        className='like-button'
      >
        <FontAwesomeIcon icon={faHeart} className={liked ? 'liked' : 'not-liked'} />
      </button>
      <span className="tooltip-text1">Marcar como favorito</span>
    </div>
  );
};

export default LikeButton;
