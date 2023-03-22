import { createBrowserRouter } from 'react-router-dom';
import { App } from 'App';
import { WelcomePage } from 'pages/WelcomePage';
import { ErrorPage } from 'pages/ErrorPage';
import { SignPage } from 'pages/SignPage';

export enum PathRoutes {
  welcome = '/',
  sign = 'sign',
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
        path: PathRoutes.sign,
        element: <SignPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes, { basename: '/' });
