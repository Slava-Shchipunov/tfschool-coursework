import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { PlayPauseBtn } from 'components/AudioPlayer/PlayPauseBtn/PlayPauseBtn';
import { togglePlay } from 'store/player/player.slice';
import { TRootState } from 'store/store';
import styles from './style.module.css';
import { Player } from './Player';

const className = classNames.bind(styles);

export const AudioPlayer = () => {
  const { activeSong, isPlay } = useSelector(
    (state: TRootState) => state.player
  );
  const dispatch = useDispatch();

  const playPauseTrack = () => {
    dispatch(togglePlay());
  };

  return (
    <div className={className('audio-player')}>
      <Player src={activeSong.src} isPlay={isPlay} />
      <PlayPauseBtn isPlay={isPlay} playPauseTrack={playPauseTrack} />
    </div>
  );
};
