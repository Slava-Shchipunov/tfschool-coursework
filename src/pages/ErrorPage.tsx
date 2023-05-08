import { Link } from 'react-router-dom';
import { PathRoutes } from 'router/router';

export const ErrorPage = () => {
  return (
    <div className="wrapper">
      <span>Oops, this page doesn&apos;t seem to exist.</span>
      <Link to={PathRoutes.welcome}>Go back to main page</Link>
    </div>
  );
};
