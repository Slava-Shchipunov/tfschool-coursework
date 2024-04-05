import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getTrackDetailsThunk } from 'store/player/player.thunk';
import { togglePlay } from 'store/player/player.slice';
import { useSelector } from 'react-redux';
import { getPlayer } from 'components/AudioPlayer/selectors/getPlayer';
import { memo } from 'react';

type TSongCard = {
  trackId?: string;
  imgUrl: string;
  title: string;
  artist: string;
  isSmall: boolean;
};

const className = classNames.bind(styles);

export const SongCardComponent = (props: TSongCard) => {
  const { trackId, imgUrl, title, artist, isSmall } = props;
  const { currentSongs } = useSelector(getPlayer);
  const dispatch = useAppDispatch();

  const handleOnClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!isSmall) {
      return;
    }

    dispatch(togglePlay(false));
    const trackId = event.currentTarget.id;

    dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
  };

  return (
    <div
      className={className('card', { small: isSmall })}
      id={trackId}
      onClick={handleOnClick}
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

export const SongCard = memo(SongCardComponent);
