import { SignInForm } from 'components/Forms/SignInForm/SignInForm';
import { Link } from 'react-router-dom';
import { TUserAuth } from 'types/types';

// TODO удалить в дальнейшем
const exampleSignInFunc = (data: TUserAuth) => {
  return Promise.resolve(data);
};

export const SignInPage = () => {
  return (
    <div className="wrapper">
      <div className="">You are on the Sign In Page</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign-up">Go to Sign up page</Link>
      <Link to="/sign-in">Go to Sign in page</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SignInForm signIn={exampleSignInFunc} />
    </div>
  );
};
