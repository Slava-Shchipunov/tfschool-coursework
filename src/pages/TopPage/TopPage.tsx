import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getTopTracksThunk } from 'store/tracks/tracks.thunk';
import { useEffect } from 'react';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';
import { useSelector } from 'react-redux';
import { getPlayer } from 'components/AudioPlayer/selectors/getPlayer';

const className = classNames.bind(styles);

export const TopPage = () => {
  const { isShuffle } = useSelector(getPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopTracksThunk(isShuffle));
  }, [dispatch, isShuffle]);

  return (
    <div className={className('top-page')}>
      <SongsPageLayout pageTitle={'Popular Now'} />
    </div>
  );
};
