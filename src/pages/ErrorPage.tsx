import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="wrapper">
      <div className="">You are on the ErrorPage</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign">Go to SignPage</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
    </div>
  );
};
