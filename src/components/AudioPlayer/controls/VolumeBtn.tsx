import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import volumeIconUrl from 'assets/svg/volume.svg';

const className = classNames.bind(styles);

type TVolumeBtn = {
  isVolumeActive: boolean;
  handleClick: () => void;
};

export const VolumeBtn = (props: TVolumeBtn) => {
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
