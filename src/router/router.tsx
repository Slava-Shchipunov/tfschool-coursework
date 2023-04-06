import { createBrowserRouter } from 'react-router-dom';
import { App } from 'App';
import { WelcomePage } from 'pages/WelcomePage';
import { ErrorPage } from 'pages/ErrorPage';
import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';

export enum PathRoutes {
  welcome = '/',
  signup = 'sign-up',
  signin = 'sign-in',
  errorPath = '404',
}

const routes = [
  {
    path: PathRoutes.welcome,
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: PathRoutes.signup,
        element: <SignUpPage />,
      },
      {
        path: PathRoutes.signin,
        element: <SignInPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes, { basename: '/' });
