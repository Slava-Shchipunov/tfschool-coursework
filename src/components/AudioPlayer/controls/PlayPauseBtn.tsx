import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import pauseIconUrl from 'assets/svg/pause.svg';
import playIconUrl from 'assets/svg/play.svg';
import { memo } from 'react';

type TPlayPauseBtn = {
  isPlay: boolean;
  width: string;
  height: string;
  playPauseTrack: () => void;
};

const className = classNames.bind(styles);

export const PlayPauseBtnComponent = (props: TPlayPauseBtn) => {
  const { isPlay, width, height, playPauseTrack } = props;

  return (
    <button
      className={className('button')}
      type="button"
      aria-label="Play or pause"
      onClick={playPauseTrack}
      data-testid="playPauseBtn"
    >
      <Icon
        url={isPlay ? pauseIconUrl : playIconUrl}
        width={width}
        height={height}
      />
    </button>
  );
};

export const PlayPauseBtn = memo(PlayPauseBtnComponent);
