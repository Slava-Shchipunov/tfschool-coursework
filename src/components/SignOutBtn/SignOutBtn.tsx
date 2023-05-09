import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { userSignOutThunk } from 'store/user/user.thunk';
import { Icon } from 'components/Icon/Icon';
import signOutIconUrl from 'assets/svg/sign-out.svg';
import { useNavigate } from 'react-router-dom';
import { PathRoutes } from 'router/router';

const className = classNames.bind(styles);

export const SignOutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnClick = async () => {
    await dispatch(userSignOutThunk());
    navigate(PathRoutes.welcome);
  };

  return (
    <button
      className={className('button')}
      type="button"
      aria-label="Sign out"
      onClick={handleOnClick}
      data-testid="signOutBtn"
    >
      <Icon url={signOutIconUrl} width="20px" height="20px" />
    </button>
  );
};
