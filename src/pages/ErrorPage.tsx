import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="wrapper">
      <div className="">You are on the ErrorPage</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign-up">Go to Sig up page</Link>
      <Link to="/sign-in">Go to Sig in page</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
    </div>
  );
};
