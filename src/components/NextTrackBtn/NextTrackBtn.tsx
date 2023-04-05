import classNames from 'classnames/bind';
import styles from './style.module.css';

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
    />
  );
};
