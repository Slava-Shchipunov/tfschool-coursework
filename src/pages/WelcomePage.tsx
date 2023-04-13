import { AudioPlayer } from 'components/AudioPlayer/AudioPlayer';
import { SearchLine } from 'components/SearchLine/SearchLine';
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  return (
    <div className="wrapper">
      <div className="">You are on the WelcomePage</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign-up">Go to Sign up page</Link>
      <Link to="/sign-in">Go to Sign in page</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SearchLine />
      <AudioPlayer />
    </div>
  );
};
