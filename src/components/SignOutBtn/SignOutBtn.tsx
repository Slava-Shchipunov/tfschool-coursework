import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { userSignOutThunk } from 'store/user/user.thunk';

const className = classNames.bind(styles);

export const SignOutBtn = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = async () => {
    await dispatch(userSignOutThunk());
  };

  return (
    <button
      className={className('sign-out')}
      type="button"
      aria-label="Sign out"
      onClick={handleOnClick}
      data-testid="signOutBtn"
    />
  );
};
