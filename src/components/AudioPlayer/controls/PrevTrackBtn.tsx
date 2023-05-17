import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import prevIconUrl from 'assets/svg/prev.svg';
import { memo } from 'react';

type TPrevTrackBtn = {
  width: string;
  height: string;
  prevTrack: () => void;
};

const className = classNames.bind(styles);

export const PrevTrackBtnComponent = (props: TPrevTrackBtn) => {
  const { width, height, prevTrack } = props;

  return (
    <button
      className={className('button')}
      type="button"
      aria-label="Prev track"
      onClick={prevTrack}
      data-testid="prevTrackBtn"
    >
      <Icon url={prevIconUrl} width={width} height={height} />
    </button>
  );
};

export const PrevTrackBtn = memo(PrevTrackBtnComponent);
