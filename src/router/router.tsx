import { createBrowserRouter } from 'react-router-dom';
import { App } from 'App';
import { WelcomePage } from 'pages/WelcomePage';
import { ErrorPage } from 'pages/ErrorPage';
import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { PlayerPage } from 'pages/PlayerPage/PlayerPage';
import { SearchPage } from 'pages/SearchPage/SearchPage';

export enum PathRoutes {
  welcome = '/',
  signup = '/sign-up',
  signin = '/sign-in',
  player = '/player/',
  top = '/top',
  liked = '/liked',
  // errorPath = '404', //TODO удалить, если не нужуен
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
      {
        path: PathRoutes.player,
        element: <PlayerPage />,
        children: [
          {
            index: true,
            element: <SearchPage />,
          },
          /*{
            path: PathRoutes.top,
            element: <TopPage />,
          },
          {
            path: PathRoutes.liked,
            element: <LikedPage />,
          }, */
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes, { basename: '/' });
