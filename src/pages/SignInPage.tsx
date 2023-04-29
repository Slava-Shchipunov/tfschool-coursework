import { SignInForm } from 'components/Forms/SignInForm/SignInForm';
import { Loader } from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from 'store/user/user.selectors';
import classNames from 'classnames/bind';
import styles from './style.module.css';
import { userSignInThunk } from 'store/user/user.thunk';
import { TUserAuth } from 'types/types';
import { useAppDispatch } from 'hooks/useAppDispatch';

const className = classNames.bind(styles);

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector(getUser);

  const handleSignIn = async (data: TUserAuth) => {
    await dispatch(userSignInThunk(data));
  };

  return (
    <div className="wrapper">
      <div className="">You are on the Sign In Page</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign-up">Go to Sign up page</Link>
      <Link to="/sign-in">Go to Sign in page</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SignInForm signIn={handleSignIn} />
      {isLoading && (
        <div className={className('loader-wrapper')}>
          <Loader />
        </div>
      )}
    </div>
  );
};
