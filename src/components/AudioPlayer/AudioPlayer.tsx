import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { PlayPauseBtn } from 'components/PlayPauseBtn/PlayPauseBtn';
import { togglePlay, next, setActiveSong } from 'store/player/player.slice';
import { NextTrackBtn } from 'components/NextTrackBtn/NextTrackBtn';
import { useEffect } from 'react';
import styles from './style.module.css';
import { Player } from './Player';
import { getPlayer } from './selectors/getPlayer';

const className = classNames.bind(styles);

export const AudioPlayer = () => {
  const { activeSong, isPlay, currentSongs, currentIdx, isActive } =
    useSelector(getPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(togglePlay(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  // TODO удалить setTestState после подключения к API
  const setTestState = (event: React.MouseEvent<HTMLButtonElement>) => {
    const obj = {
      currentSongs: [
        {
          src: 'https://p.scdn.co/mp3-preview/effd763b0241c4973a3ebad491ac7fd13c93e6c5?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
        },
        {
          src: 'https://p.scdn.co/mp3-preview/b4121580743329ad0206bdacff9e2484c2ab6e70?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
        },
        {
          src: 'https://p.scdn.co/mp3-preview/b24a40896af0276240af3ea23e6c115205b8886e?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
        },
      ],
      currentIdx: 0,
      isActive: true,
      activeSong: {
        src: 'https://p.scdn.co/mp3-preview/effd763b0241c4973a3ebad491ac7fd13c93e6c5?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
      },
    };

    dispatch(setActiveSong(obj));

    if (event) {
      const target = event.target as HTMLButtonElement;
      target.textContent = 'PLAYLIST HAS BEEN LOADED. PRESS PLAY';
    }
  };

  const playPauseTrack = () => {
    dispatch(togglePlay());
  };

  // TODO сделать так, чтобы если в currentSongs только один трек, при нажатии он начинался с начала
  const nextTrack = () => {
    if (!isActive) {
      return;
    }
    if (currentSongs.length !== 1) {
      dispatch(togglePlay(false));
    }
    const nextIdx = currentIdx < currentSongs.length - 1 ? currentIdx + 1 : 0;
    dispatch(next(nextIdx));
  };

  return (
    <div className={className('audio-player')} style={{ flexWrap: 'wrap' }}>
      <Player src={activeSong.src ? activeSong.src : ''} isPlay={isPlay} />

      {/* // TODO удалить button после подключения к API */}
      <button
        type="button"
        onClick={setTestState}
        style={{ display: 'block', margin: '20px', flexBasis: '100%' }}
      >
        CLICK ME TO LOAD TEST PLAYLIST
      </button>

      <div className={className('buttons')}>
        <PlayPauseBtn isPlay={isPlay} playPauseTrack={playPauseTrack} />
        <NextTrackBtn nextTrack={nextTrack} />
      </div>
    </div>
  );
};
