import { Link } from 'react-router-dom';
import { SignUpForm } from 'components/Forms/SignUpForm';

export const SignUpPage = () => {
  return (
    <div className="wrapper">
      <div className="">You are on the Sign Up Page</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign-up">Go to Sign up page</Link>
      <Link to="/sign-in">Go to Sign in page</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SignUpForm />
    </div>
  );
};
