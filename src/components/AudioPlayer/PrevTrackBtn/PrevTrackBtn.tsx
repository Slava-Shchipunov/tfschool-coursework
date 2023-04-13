import classNames from 'classnames/bind';
import styles from './style.module.css';
import { Icon } from 'components/Icon/Icon';
import prevIconUrl from 'assets/svg/prev.svg';

type TPrevTrackBtn = {
  prevTrack: () => void;
};

const className = classNames.bind(styles);

export const PrevTrackBtn = (props: TPrevTrackBtn) => {
  const { prevTrack } = props;

  return (
    <button
      className={className('prev-track')}
      type="button"
      aria-label="Prev track"
      onClick={prevTrack}
      data-testid="prevTrackBtn"
    >
      <Icon url={prevIconUrl} width="30px" height="30px" />
    </button>
  );
};
