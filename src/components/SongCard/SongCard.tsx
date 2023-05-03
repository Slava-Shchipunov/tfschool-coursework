import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getTrackDetailsThunk } from 'store/player/player.thunk';
import { togglePlay } from 'store/player/player.slice';
import { useSelector } from 'react-redux';
import { getTracks } from 'pages/SearchPage/selectors/getTracks';

type TSongCard = {
  trackId?: string;
  imgUrl: string;
  title: string;
  artist: string;
  isSmall: boolean;
};

const className = classNames.bind(styles);

export const SongCard = (props: TSongCard) => {
  const { trackId, imgUrl, title, artist, isSmall } = props;
  const { currentSongs } = useSelector(getTracks);
  const dispatch = useAppDispatch();

  return (
    <div
      className={className('card', { small: isSmall })}
      id={trackId}
      onClick={(event) => {
        dispatch(togglePlay(false));
        const trackId = event.currentTarget.id;

        if (!currentSongs) {
          return;
        }

        dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
      }}
    >
      <div className={className('art')}>
        <img className={className('art-fill')} src={imgUrl} alt="cover" />
        <img className={className('art-shadow')} src={imgUrl} alt="shadow" />
      </div>
      <div className={className('title')}>{title}</div>{' '}
      <div className={className('artist')}>{artist}</div>{' '}
    </div>
  );
};
