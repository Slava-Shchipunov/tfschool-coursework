import { AudioPlayer } from 'components/AudioPlayer/AudioPlayer';
import { Outlet } from 'react-router-dom';
import styles from './style.module.css';
import classNames from 'classnames/bind';

const className = classNames.bind(styles);

export const PlayerPage = () => {
  return (
    <div className={className('container')}>
      {/* Menu */}
      <div className={className('track-list')}>
        <Outlet />
      </div>
      <AudioPlayer />
    </div>
  );
};
