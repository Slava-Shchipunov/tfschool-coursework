import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import volumeIconUrl from 'assets/svg/volume.svg';
import { memo } from 'react';

const className = classNames.bind(styles);

type TVolumeBtn = {
  isVolumeActive: boolean;
  handleClick: () => void;
};

export const VolumeBtnComponent = (props: TVolumeBtn) => {
  const { isVolumeActive, handleClick } = props;
  return (
    <button
      className={className('button', 'dark-btn', { active: isVolumeActive })}
      type="button"
      aria-label="Shuffle tracks"
      onClick={handleClick}
      data-testid="volumeBtn"
    >
      <Icon url={volumeIconUrl} width="20px" height="20px" dark={true} />
    </button>
  );
};

export const VolumeBtn = memo(VolumeBtnComponent);
