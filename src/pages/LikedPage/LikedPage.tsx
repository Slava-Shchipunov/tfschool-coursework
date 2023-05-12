import classNames from 'classnames/bind';
import styles from './style.module.css';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getLikedTracksThunk } from 'store/tracks/tracks.thunk';
import { useEffect } from 'react';
import { auth } from 'api/firebase';

const className = classNames.bind(styles);

export const LikedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.currentUser?.uid) {
      dispatch(getLikedTracksThunk(auth.currentUser?.uid));
    }
  }, []);

  return (
    <div className={className('liked-page')}>
      <SongsPageLayout pageTitle={'Liked Songs'} />
    </div>
  );
};
