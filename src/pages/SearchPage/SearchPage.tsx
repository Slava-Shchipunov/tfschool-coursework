import classNames from 'classnames/bind';
import styles from './style.module.css';
import { searchTracksThunk } from 'store/tracks/tracks.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';
import { SearchLine } from 'components/SearchLine/SearchLine';
import { getPlayer } from 'components/AudioPlayer/selectors/getPlayer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setTrackList } from 'store/tracks/tracks.slice';
import { getTracks } from 'store/tracks/tracks.selectors';

const className = classNames.bind(styles);

export const SearchPage = () => {
  const { isShuffle } = useSelector(getPlayer);
  const { hasNotSearchResults } = useSelector(getTracks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTrackList([]));
  }, [dispatch]);

  const searchTracks = (data: string) => {
    dispatch(
      searchTracksThunk({
        searchQuery: data,
        isShuffle,
      })
    );
  };

  return (
    <div className={className('search-page')}>
      <SearchLine search={searchTracks} />
      {hasNotSearchResults && <h2>Sorry, the search returned no results.</h2>}
      <SongsPageLayout pageTitle={'Search results'} />
    </div>
  );
};
