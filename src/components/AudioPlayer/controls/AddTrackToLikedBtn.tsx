import classNames from 'classnames/bind';
import styles from '../style.module.css';
import { Icon } from 'components/Icon/Icon';
import likedIconUrl from 'assets/svg/heartBtn.svg';

type TAddTrackToLikedBtn = {
  isActive: boolean;
  isTrackLiked: boolean;
  addTrackToLiked: () => void;
};

const className = classNames.bind(styles);

export const AddTrackToLikedBtn = (props: TAddTrackToLikedBtn) => {
  const { isTrackLiked, isActive, addTrackToLiked } = props;

  return (
    <button
      className={className('button', 'dark-btn', { active: isTrackLiked })}
      type="button"
      aria-label="Add track to liked"
      onClick={addTrackToLiked}
      data-testid="addTrackToLikedBtn"
      disabled={!isActive}
    >
      <Icon url={likedIconUrl} width="20px" height="20px" dark={true} />
    </button>
  );
};
