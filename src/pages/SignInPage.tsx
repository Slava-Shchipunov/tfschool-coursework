import { SignInForm } from 'components/Forms/SignInForm/SignInForm';
import { Loader } from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { getUser } from 'store/user/user.selectors';
import classNames from 'classnames/bind';
import styles from './style.module.css';
import { userSignInThunk } from 'store/user/user.thunk';
import { TUserAuth } from 'types/types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { auth } from 'api/firebase';
import { Navigate } from 'react-router-dom';
import { PathRoutes } from 'router/router';

const className = classNames.bind(styles);

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector(getUser);

  const handleSignIn = async (data: TUserAuth) => {
    await dispatch(userSignInThunk(data));
  };

  if (auth.currentUser) {
    return <Navigate to={`/${PathRoutes.player}`} replace />;
  }

  return (
    <div className="wrapper">
      <h2>Sign in</h2>
      <SignInForm signIn={handleSignIn} />
      {isLoading && (
        <div className={className('loader-wrapper')}>
          <Loader />
        </div>
      )}
    </div>
  );
};
