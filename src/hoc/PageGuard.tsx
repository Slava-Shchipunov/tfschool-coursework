import { auth } from 'api/firebase';
import { Navigate, useLocation } from 'react-router';
import { PathRoutes } from 'router/router';

type Props = {
  children: JSX.Element;
};

export const PageGuard = ({ children }: Props): JSX.Element => {
  const location = useLocation();

  if (!auth.currentUser) {
    return (
      <Navigate to={PathRoutes.signin} state={{ from: location }} replace />
    );
  }

  return children;
};
