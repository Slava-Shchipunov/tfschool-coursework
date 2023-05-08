import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import classNames from 'classnames/bind';

const className = classNames.bind(styles);

export const WelcomePage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/player');
  }

  return (
    <div className="wrapper">
      <div className={className('welcome')} />
      <p className={className('welcome-text')}>
        Online Audio Player is an application for listening to music. Find the
        tracks you need from a huge database of the most diverse music, find out
        what music is currently popular, listen to demo versions, save the
        tracks you like to your playlist and open access to the full versions of
        the tracks you like.
      </p>
      <button className={className('start-btn')} onClick={handleClick}>
        Listen to music
      </button>
    </div>
  );
};
