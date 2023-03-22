import { Link } from 'react-router-dom';

export function WelcomePage() {
  return (
    <div className="wrapper">
      <div className="">You are on the WelcomePage</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign">Go to SignPage</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
    </div>
  );
}
