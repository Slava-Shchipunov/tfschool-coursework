import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getTopTracksThunk } from 'store/tracks/tracks.thunk';
import { useEffect } from 'react';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';

const className = classNames.bind(styles);

export const TopPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopTracksThunk());
  }, [dispatch]);

  return (
    <div className={className('top-page')}>
      <SongsPageLayout pageTitle={'Popular Now'} />
    </div>
  );
};
