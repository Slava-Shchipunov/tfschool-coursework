import { AudioPlayer } from 'components/AudioPlayer/AudioPlayer';
import { Outlet } from 'react-router-dom';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import { PageGuard } from 'hoc/PageGuard';
import { Menu } from 'components/Menu/Menu';
import { ErrorPopup } from 'components/ErrorPopup/ErrorPopup';
import { useSelector } from 'react-redux';
import { getTracks } from 'store/tracks/tracks.selectors';

const className = classNames.bind(styles);

export const PlayerPage = () => {
  const { tracksErrorMessage } = useSelector(getTracks);
  return (
    <PageGuard>
      <>
        <div className={className('container')}>
          <Menu />
          <div className={className('track-list')}>
            <Outlet />
          </div>
          <AudioPlayer />
          {tracksErrorMessage && (
            <ErrorPopup
              errorMessage={`Sorry, something went wrong (${tracksErrorMessage}). Please try again later.`}
            />
          )}
        </div>
      </>
    </PageGuard>
  );
};
