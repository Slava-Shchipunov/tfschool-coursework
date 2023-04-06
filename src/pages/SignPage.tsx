import { Link } from 'react-router-dom';
import { SignUpForm } from 'components/Forms/SignUpForm';

export const SignPage = () => {
  return (
    <div className="wrapper">
      <div className="">You are on the SignPage</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign">Go to SignPage</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SignUpForm />
    </div>
  );
};
