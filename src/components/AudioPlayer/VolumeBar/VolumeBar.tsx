import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { VolumeBtn } from '../controls/VolumeBtn';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setVolume } from 'store/player/player.slice';

type TVolumeBar = {
  volume: number;
  isVolumeActive: boolean;
  handleClick: () => void;
};

const className = classNames.bind(styles);

export const VolumeBar = (props: TVolumeBar) => {
  const { volume, isVolumeActive, handleClick } = props;

  const dispatch = useAppDispatch();

  const [background, setBackground] = useState<string | undefined>();

  useEffect(() => {
    setBackground(
      `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${volume}%, #696767 ${volume}%, #696767 100%)`
    );
  }, [volume]);

  const updateVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volumeLevel = Math.round(Number(event.target.value));
    dispatch(setVolume(volumeLevel));
  };

  return (
    <div className={className('wrapper')}>
      <VolumeBtn isVolumeActive={isVolumeActive} handleClick={handleClick} />
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume}
        style={{ background: background }}
        onChange={updateVolume}
        className={className('volume-slider', { visible: isVolumeActive })}
      />
      <div className={className('volume-level')}>{volume}%</div>
    </div>
  );
};
