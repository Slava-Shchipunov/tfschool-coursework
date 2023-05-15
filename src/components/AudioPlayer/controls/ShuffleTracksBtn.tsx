import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import shuffleIconUrl from 'assets/svg/shuffle.svg';

type TShuffleTracksBtn = {
  isShuffle: boolean;
  shuffleTracks: () => void;
};

const className = classNames.bind(styles);

export const ShuffleTracksBtn = (props: TShuffleTracksBtn) => {
  const { isShuffle, shuffleTracks } = props;

  return (
    <button
      className={className('button', 'dark-btn', { active: isShuffle })}
      type="button"
      aria-label="Shuffle tracks"
      onClick={shuffleTracks}
      data-testid="shuffleTracksBtn"
    >
      <Icon url={shuffleIconUrl} width="20px" height="20px" dark={true} />
    </button>
  );
};
