import classNames from 'classnames/bind';
import styles from './style.module.css';
import crossIconUrl from 'assets/svg/cross.svg';
import { Icon } from 'components/Icon/Icon';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setUserError } from 'store/user/user.slice';

const className = classNames.bind(styles);

type TErrorPopup = {
  errorMessage: string;
};

export const ErrorPopup = (props: TErrorPopup) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setUserError(''));
  };

  return (
    <div className={className('popup')}>
      <span className={className('popup-text')}>{props.errorMessage}</span>
      <button
        className={className('close-btn')}
        type="button"
        data-testid="closeBtn"
        onClick={handleClick}
      >
        <Icon
          url={crossIconUrl}
          width="10px"
          height="10px"
          filter="
  brightness(0) saturate(100%) invert(4%) sepia(50%) saturate(3978%) hue-rotate(217deg) brightness(87%) contrast(96%)"
        />
      </button>
    </div>
  );
};
