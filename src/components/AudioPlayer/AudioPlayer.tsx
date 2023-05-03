import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, useEffect, useReducer } from 'react';
import {
  togglePlay,
  next,
  prev,
  setActiveSong,
} from 'store/player/player.slice';
import { getPlayer } from './selectors/getPlayer';
import { PlayPauseBtn } from 'components/AudioPlayer/PlayPauseBtn/PlayPauseBtn';
import { NextTrackBtn } from 'components/AudioPlayer/NextTrackBtn/NextTrackBtn';
import { PrevTrackBtn } from 'components/AudioPlayer/PrevTrackBtn/PrevTrackBtn';
import { Player } from './Player';
import styles from './style.module.css';
import { Seekbar } from './Seekbar/Seekbar';

const className = classNames.bind(styles);

type TState = {
  seekTime: number;
  currentTime: number;
  duration: number;
};

export type TAction = {
  type: 'seekTime' | 'currentTime' | 'duration';
  time: number;
};

const reducer = (state: TState, action: TAction) => {
  const newState = {
    ...state,
  };
  newState[action.type] = action.time;
  return newState;
};

export const AudioPlayer = () => {
  const { activeSong, isPlay, currentSongs, currentIdx, isActive } =
    useSelector(getPlayer);

  const [state, dispatchState]: [TState, Dispatch<TAction>] = useReducer(
    reducer,
    {
      seekTime: 0,
      currentTime: 0,
      duration: 0,
    }
  );

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
          name: 'Lost',
          src: 'https://p.scdn.co/mp3-preview/effd763b0241c4973a3ebad491ac7fd13c93e6c5?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
        },
        {
          name: 'Believer',
          src: 'https://p.scdn.co/mp3-preview/b4121580743329ad0206bdacff9e2484c2ab6e70?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
        },
        {
          name: 'Walk On Water',
          src: 'https://p.scdn.co/mp3-preview/b24a40896af0276240af3ea23e6c115205b8886e?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
        },
      ],
      currentIdx: 0,
      isActive: true,
      activeSong: {
        name: 'Lost',
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
    if (!isActive) {
      return;
    }

    dispatch(togglePlay());
  };

  // TODO сделать так, чтобы если в currentSongs только один трек, при нажатии он начинался с начала
  const nextTrack = () => {
    if (!isActive) {
      return;
    }

    if (currentSongs.length > 1) {
      dispatch(togglePlay(false));
    }

    const nextIdx = currentIdx < currentSongs.length - 1 ? currentIdx + 1 : 0;
    dispatch(next(nextIdx));
  };

  const prevTrack = () => {
    if (!isActive) {
      return;
    }

    if (currentSongs.length > 1) {
      dispatch(togglePlay(false));
    }

    const prevIdx = currentIdx > 0 ? currentIdx - 1 : currentSongs.length - 1;
    dispatch(prev(prevIdx));
  };

  const updateDuration = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    dispatchState({
      type: 'duration',
      time: event.currentTarget.duration,
    });
  };

  const updateTime = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    dispatchState({
      type: 'currentTime',
      time: event.currentTarget.currentTime,
    });
  };

  return (
    <div className={className('audio-player')} style={{ flexWrap: 'wrap' }}>
      <Player
        src={activeSong.src ? activeSong.src : ''}
        isPlay={isPlay}
        seekTime={state.seekTime}
        nextTrack={nextTrack}
        updateDuration={updateDuration}
        updateTime={updateTime}
      />

      {/* // TODO удалить button и h1 после подключения к API */}
      <button
        type="button"
        onClick={setTestState}
        style={{
          display: 'block',
          margin: '20px',
          flexBasis: '100%',
          maxWidth: 'fit-content',
        }}
      >
        CLICK ME TO LOAD TEST PLAYLIST
      </button>
      <h1
        style={{
          margin: '0px auto 20px',
          textAlign: 'center',
          width: '320px',
          height: '75px',
        }}
      >
        Now playing: {activeSong.name ? activeSong.name : '-'}
      </h1>

      <Seekbar
        duration={state.duration}
        currentTime={state.currentTime}
        dispatchState={dispatchState}
      />
      <div className={className('buttons')}>
        <PrevTrackBtn prevTrack={prevTrack} />
        <PlayPauseBtn isPlay={isPlay} playPauseTrack={playPauseTrack} />
        <NextTrackBtn nextTrack={nextTrack} />
      </div>
    </div>
  );
};
