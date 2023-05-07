import { AudioPlayer } from 'components/AudioPlayer/AudioPlayer';
import { Outlet } from 'react-router-dom';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import { PageGuard } from 'hoc/PageGuard';

const className = classNames.bind(styles);

export const PlayerPage = () => {
  return (
    <PageGuard>
      <div className={className('container')}>
        {/* //TODO Menu */}
        <div className={className('track-list')}>
          <Outlet />
        </div>
        <AudioPlayer />
      </div>
    </PageGuard>
  );
};
