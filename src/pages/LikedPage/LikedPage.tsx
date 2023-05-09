import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { getTracks } from 'store/tracks/tracks.selectors';
import { SongCard } from 'components/SongCard/SongCard';
// import { searchTracksThunk } from 'store/tracks/tracks.thunk';
// import { useAppDispatch } from 'hooks/useAppDispatch';
import { Loader } from 'components/Loader/Loader';
// import { useEffect } from 'react';

const className = classNames.bind(styles);

export const LikedPage = () => {
  const { isLoading, errorMessage, currentSongs } = useSelector(getTracks);
  // const dispatch = useAppDispatch();

  // TODO получать понравившиеся песни при монтировании компонента
  /* useEffect(() => {
    dispatch(searchTracksThunk('top songs'));
  }, []); */

  return (
    <div className={className('liked-page')}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h2>Liked Songs</h2>
          <div className={className('tracks')}>
            {currentSongs &&
              currentSongs.map((track) => (
                <SongCard
                  key={track.id}
                  trackId={track.id}
                  imgUrl={track.image}
                  title={track.name}
                  artist={track.artists.join(', ')}
                  isSmall={true}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
