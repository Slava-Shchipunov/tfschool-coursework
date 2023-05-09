import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { getTracks } from 'store/tracks/tracks.selectors';
import { SongCard } from 'components/SongCard/SongCard';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Loader } from 'components/Loader/Loader';
import { getTopTracksThunk } from 'store/tracks/tracks.thunk';
import { useEffect } from 'react';

const className = classNames.bind(styles);

export const TopPage = () => {
  const { isLoading, errorMessage, currentSongs } = useSelector(getTracks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopTracksThunk());
  }, [dispatch]);

  return (
    <div className={className('top-page')}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h2>Popular Now</h2>
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
