import classNames from 'classnames/bind';
import styles from './style.module.css';

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
    />
  );
};
