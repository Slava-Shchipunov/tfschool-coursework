import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { getTracks } from 'store/tracks/tracks.selectors';
import { SongCard } from 'components/SongCard/SongCard';
import { searchTracksThunk } from 'store/tracks/tracks.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';

const className = classNames.bind(styles);

export const SearchPage = () => {
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
      <SongsPageLayout pageTitle={'Search results'} />
    </div>
  );
};
