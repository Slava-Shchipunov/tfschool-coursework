import classNames from 'classnames/bind';
import styles from './style.module.css';
import { SongCard } from 'components/SongCard/SongCard';
import { Loader } from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { getTracks } from 'store/tracks/tracks.selectors';

const className = classNames.bind(styles);

export const SongsPageLayout = (props: { pageTitle: string }) => {
  const { isLoading, errorMessage, currentSongs } = useSelector(getTracks);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && Boolean(currentSongs.length) && (
        <>
          <h2 className={className('page-title')}>{props.pageTitle}</h2>
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
    </>
  );
};
