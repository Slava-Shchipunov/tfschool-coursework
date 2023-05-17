import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import nextIconUrl from 'assets/svg/next.svg';
import { memo } from 'react';

type TNextTrackBtn = {
  width: string;
  height: string;
  nextTrack: () => void;
};

const className = classNames.bind(styles);

export const NextTrackBtnComponent = (props: TNextTrackBtn) => {
  const { width, height, nextTrack } = props;

  return (
    <button
      className={className('button')}
      type="button"
      aria-label="Next track"
      onClick={nextTrack}
      data-testid="nextTrackBtn"
    >
      <Icon url={nextIconUrl} width={width} height={height} />
    </button>
  );
};

export const NextTrackBtn = memo(NextTrackBtnComponent);
