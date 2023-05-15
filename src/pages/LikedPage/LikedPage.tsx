import classNames from 'classnames/bind';
import styles from './style.module.css';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getLikedTracksThunk } from 'store/tracks/tracks.thunk';
import { useEffect } from 'react';
import { auth } from 'api/firebase';
import { useSelector } from 'react-redux';
import { getPlayer } from 'components/AudioPlayer/selectors/getPlayer';

const className = classNames.bind(styles);

export const LikedPage = () => {
  const { isShuffle } = useSelector(getPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.currentUser?.uid) {
      dispatch(
        getLikedTracksThunk({
          userId: auth.currentUser?.uid,
          isShuffle,
        })
      );
    }
  }, [dispatch, isShuffle]);

  return (
    <div className={className('liked-page')}>
      <SongsPageLayout pageTitle={'Liked Songs'} />
    </div>
  );
};
