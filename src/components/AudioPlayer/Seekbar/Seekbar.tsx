import classNames from 'classnames/bind';
import styles from './style.module.css';
import { Dispatch, useEffect, useState } from 'react';
import { TAction } from '../AudioPlayer';

type TSeekbar = {
  duration: number;
  currentTime: number;
  dispatchState: Dispatch<TAction>;
};

const className = classNames.bind(styles);

const formatTime = (time: number) => {
  const minutes = `0${Math.floor(time / 60)}`;
  const seconds = `0${Math.floor(time % 60)}`;
  return `${minutes.slice(-2)}:${seconds.slice(-2)}`;
};

export const Seekbar = (props: TSeekbar) => {
  const { duration, currentTime, dispatchState } = props;

  const [background, setBackground] = useState<string | undefined>();

  useEffect(() => {
    const progress = (currentTime * 100) / duration;
    setBackground(
      `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${progress}%, #696767 ${progress}%, #696767 100%)`
    );
  }, [currentTime, duration]);

  const updateSeekbar = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: 'seekTime',
      time: Number(event.target.value),
    });
  };

  return (
    <div className={className('slider-container')}>
      <div className={className('current-time')} data-testid="currentTime">
        {formatTime(currentTime)}
      </div>
      <div className={className('total-duration')} data-testid="totalDuration">
        {formatTime(duration)}
      </div>
      <input
        type="range"
        min="0"
        max={duration}
        step="any"
        value={currentTime}
        style={{ background: background }}
        data-testid="seekbar"
        onChange={updateSeekbar}
        className={className('seek-slider')}
      />
    </div>
  );
};
