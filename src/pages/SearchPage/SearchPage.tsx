import classNames from 'classnames/bind';
import styles from './style.module.css';
import { searchTracksThunk } from 'store/tracks/tracks.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';
import { SearchLine } from 'components/SearchLine/SearchLine';

const className = classNames.bind(styles);

export const SearchPage = () => {
  const dispatch = useAppDispatch();

  const searchTracks = (data: string) => {
    dispatch(searchTracksThunk(data));
  };

  return (
    <div className={className('search-page')}>
      <SearchLine search={searchTracks} />
      <SongsPageLayout pageTitle={'Search results'} />
    </div>
  );
};
