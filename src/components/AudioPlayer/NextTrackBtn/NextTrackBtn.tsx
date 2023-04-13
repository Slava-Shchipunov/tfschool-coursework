import classNames from 'classnames/bind';
import styles from './style.module.css';
import { Icon } from 'components/Icon/Icon';
import nextIconUrl from 'assets/svg/next.svg';

type TNextTrackBtn = {
  nextTrack: () => void;
};

const className = classNames.bind(styles);

export const NextTrackBtn = (props: TNextTrackBtn) => {
  const { nextTrack } = props;

  return (
    <button
      className={className('next-track')}
      type="button"
      aria-label="Next track"
      onClick={nextTrack}
      data-testid="nextTrackBtn"
    >
      <Icon url={nextIconUrl} width="30px" height="30px" />
    </button>
  );
};
