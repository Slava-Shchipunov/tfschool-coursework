import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { getTracks } from 'store/tracks/tracks.selectors';
import { SongCard } from 'components/SongCard/SongCard';
// import { searchTracksThunk } from 'store/tracks/tracks.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';

const className = classNames.bind(styles);

export const TopPage = () => {
  const { isLoading, errorMessage, currentSongs } = useSelector(getTracks);
  const dispatch = useAppDispatch();

  // TODO получать топ песен при монтировании компонента
  /* useEffect(() => {
    dispatch(searchTracksThunk('top songs'));
  }, []); */

  return (
    <div className={className('top-page')}>
      {isLoading && <Loader />}
      {!isLoading && (
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
      )}
    </div>
  );
};
