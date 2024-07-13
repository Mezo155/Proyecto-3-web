import { useContext } from 'react';
import { toggleWatchlist } from '../services/filmsServices';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import "./WatchListButton.css"

const WatchlistButton = ({ externalItemId, watchList, onWatchListChange }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <button disabled>Add to Watchlist</button>;
  }

  const handleWatchlist = () => {
    if (!externalItemId) {
      console.error('externalItemId must be provided');
      return;
    }
    console.log('Toggling watchlist for film with ID:', externalItemId);
    toggleWatchlist(externalItemId)
      .then(response => {
        console.log(response)
        onWatchListChange && onWatchListChange(!watchList);  // Cambia el estado en el componente padre
      })
      .catch(error => {
        console.error('Error toggling watchlist', error);
      });
  };

  return (
    <div className='tooltip-container'>
    <button
      type='button'
      onClick={handleWatchlist}
      className='watchlist-button'
    >
      <FontAwesomeIcon icon={faBookmark} className={watchList ? 'in-watchlist' : 'not-in-watchlist'} />
    </button>
    <span className="tooltip-text">Añadir a tu lista de seguimiento</span>
</div>
  );
};

export default WatchlistButton;
