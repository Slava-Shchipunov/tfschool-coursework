import classNames from 'classnames/bind';
import styles from './style.module.css';

type TPlayPauseBtn = {
  isPlay: boolean;
  playPauseTrack: () => void;
};

const className = classNames.bind(styles);

export function PlayPauseBtn(props: TPlayPauseBtn) {
  const { isPlay, playPauseTrack } = props;

  return (
    <button
      className={className('play-pause-btn', { pause: isPlay })}
      type="button"
      aria-label="Play or pause"
      onClick={playPauseTrack}
      data-testid="playPauseBtn"
    />
  );
}
