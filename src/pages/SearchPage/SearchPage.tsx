import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { getTracks } from './selectors/getTracks';
import { SongCard } from 'components/SongCard/SongCard';
import { searchTracksThunk } from 'store/tracks/tracks.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';

const className = classNames.bind(styles);

export const SearchPage = () => {
  const { isLoading, errorMessage, currentSongs } = useSelector(getTracks);
  const dispatch = useAppDispatch();

  return (
    <div className={className('search-page')}>
      <form
        style={{ marginBottom: '15px' }}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const target = event.target as HTMLFormElement;
          const data: string = target.search.value;
          dispatch(searchTracksThunk(data));
        }}
      >
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="search..."
        />
        <button style={{ marginLeft: '10px' }}>Search tracks</button>
      </form>
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
    </div>
  );
};
