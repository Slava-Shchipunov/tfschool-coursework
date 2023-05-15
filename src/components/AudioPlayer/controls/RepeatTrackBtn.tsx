import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import repeatIconUrl from 'assets/svg/repeat.svg';

type TRepeatTrackBtn = {
  isRepeat: boolean;
  repeatTrack: () => void;
};

const className = classNames.bind(styles);

export const RepeatTrackBtn = (props: TRepeatTrackBtn) => {
  const { isRepeat, repeatTrack } = props;

  return (
    <button
      className={className('button', 'dark-btn', { active: isRepeat })}
      type="button"
      aria-label="Repeat track"
      onClick={repeatTrack}
      data-testid="repeatTrackBtn"
    >
      <Icon url={repeatIconUrl} width="20px" height="20px" dark={true} />
    </button>
  );
};
