import { SongCard } from 'components/SongCard/SongCard';
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  return (
    <div className="wrapper">
      <div className="">You are on the WelcomePage</div>
      <Link to="/">Go to WelcomePage</Link>
      <Link to="/sign">Go to SignPage</Link>
      <Link to="/ErrorPage">Go to ErrorPage</Link>
      <SongCard
        imgUrl="https://i.scdn.co/image/ab67616d0000b273ec182939cba3386ddcb93069"
        artist="IMAGINE DRAGON"
        title="Wrecked"
        isSmall
      />
    </div>
  );
};
