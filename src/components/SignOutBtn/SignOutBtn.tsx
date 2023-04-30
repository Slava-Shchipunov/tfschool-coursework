import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { userSignOutThunk } from 'store/user/user.thunk';
import { Icon } from 'components/Icon/Icon';
import signOutIconUrl from 'assets/svg/sign-out.svg';

const className = classNames.bind(styles);

export const SignOutBtn = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = async () => {
    await dispatch(userSignOutThunk());
  };

  return (
    <button
      className={className('button')}
      type="button"
      aria-label="Sign out"
      onClick={handleOnClick}
      data-testid="signOutBtn"
    >
      <Icon url={signOutIconUrl} width="30px" height="30px" />
    </button>
  );
};
