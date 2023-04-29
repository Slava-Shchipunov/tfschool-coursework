import { SignInForm } from 'components/Forms/SignInForm/SignInForm';
import { Loader } from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from 'store/user/user.selectors';
import classNames from 'classnames/bind';
import styles from './style.module.css';

const className = classNames.bind(styles);

export const SignInPage = () => {
  const { isLoading } = useSelector(getUser);
  return (
    <div className="wrapper">
      <div className="">You are on the Sign In Page</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign-up">Go to Sign up page</Link>
      <Link to="/sign-in">Go to Sign in page</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SignInForm />
      {isLoading && (
        <div className={className('loader-wrapper')}>
          <Loader />
        </div>
      )}
    </div>
  );
};
