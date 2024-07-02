import { likeFilm } from '../services/filmsServices';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

/* const api = axios.create({
    baseURL: 'http://localhost:3000/api',  // Cambia esto a la URL de tu servidor backend en producción
  }); */
  const LikeButton = ({ externalItemId, liked, onLikeChange }) => {
    const { user } = useContext(AuthContext);  // Obtén user desde el contexto
  
    if (!user) {
      // Asegúrate de manejar el caso en el que el usuario no está autenticado
      return <button disabled>Like</button>;
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
        onLikeChange && onLikeChange(!liked);
      })
      .catch(error => {
        console.error('Error liking film', error);
      });
  };
  
  
    return (
      <button onClick={handleLike} className={liked ? 'liked' : 'not-liked'}>
        {liked ? 'Dislike' : 'Like'}
      </button>
    );
  };
  
  export default LikeButton;
