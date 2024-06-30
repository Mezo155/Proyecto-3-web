import { likeFilm } from '../services/filmsServices';

/* const api = axios.create({
    baseURL: 'http://localhost:3000/api',  // Cambia esto a la URL de tu servidor backend en producción
  }); */

  const LikeButton = ({ externalItemId, liked }) => {  
    const handleLike = () => {
        likeFilm(externalItemId)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error checking like status', error);
            });
    };
  
    return (
      <button onClick={handleLike} className={liked ? 'liked' : 'not-liked'}>
        {liked ? 'Dislike' : 'Like'}
      </button>
    );
  };
  
  export default LikeButton;
