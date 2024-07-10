import { useContext } from 'react';
import { toggleWatchlist } from '../services/filmsServices';
import { AuthContext } from '../contexts/AuthContext';

const WatchlistButton = ({ externalItemId, inWatchlist, onWatchlistChange }) => {
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
      .then(() => {
        onWatchlistChange && onWatchlistChange(!inWatchlist);  // Cambia el estado en el componente padre
      })
      .catch(error => {
        console.error('Error toggling watchlist', error);
      });
  };

  return (
    <button
      type='button'
      onClick={handleWatchlist}
      className={inWatchlist ? 'in-watchlist' : 'not-in-watchlist'}
    >
      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
};

export default WatchlistButton;
