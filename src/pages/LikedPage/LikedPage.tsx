import classNames from 'classnames/bind';
import styles from './style.module.css';
// import { searchTracksThunk } from 'store/tracks/tracks.thunk';
// import { useAppDispatch } from 'hooks/useAppDispatch';
import { SongsPageLayout } from 'pages/PlayerPage/SongsPageLayout';
// import { useEffect } from 'react';

const className = classNames.bind(styles);

export const LikedPage = () => {
  // const dispatch = useAppDispatch();

  // TODO получать понравившиеся песни при монтировании компонента
  /* useEffect(() => {
    dispatch(searchTracksThunk('top songs'));
  }, []); */

  return (
    <div className={className('liked-page')}>
      <SongsPageLayout pageTitle={'Liked Songs'} />
    </div>
  );
};
