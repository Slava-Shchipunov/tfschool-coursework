import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { getTracks } from 'store/tracks/tracks.selectors';
import { SongCard } from 'components/SongCard/SongCard';
import { searchTracksThunk } from 'store/tracks/tracks.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Loader } from 'components/Loader/Loader';

const className = classNames.bind(styles);

export const SearchPage = () => {
  const { isLoading, errorMessage, currentSongs } = useSelector(getTracks);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const data: string = target.search.value;
    dispatch(searchTracksThunk(data));
  };

  return (
    <div className={className('search-page')}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="search..."
        />
        <button style={{ marginLeft: '10px' }}>Search tracks</button>
      </form>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h2>Search results</h2>
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
