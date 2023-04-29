import { SignUpForm } from 'components/Forms/SignUpForm/SignUpForm';
import { Link } from 'react-router-dom';
import { getUser } from 'store/user/user.selectors';
import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import { userSignUpThunk } from 'store/user/user.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { TUserCreate } from 'types/types';

const className = classNames.bind(styles);

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector(getUser);

  const handleSignUp = async (data: TUserCreate) => {
    await dispatch(userSignUpThunk(data));
  };

  return (
    <div className="wrapper">
      <div className="">You are on the Sign Up Page</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign-up">Go to Sign up page</Link>
      <Link to="/sign-in">Go to Sign in page</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SignUpForm signUp={handleSignUp} />
      {isLoading && (
        <div className={className('loader-wrapper')}>
          <Loader />
        </div>
      )}
    </div>
  );
};
