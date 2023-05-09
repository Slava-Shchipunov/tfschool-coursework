import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Dispatch, useEffect, useReducer } from 'react';
import { togglePlay } from 'store/player/player.slice';
import { getPlayer } from './selectors/getPlayer';
import { PlayPauseBtn } from 'components/AudioPlayer/controls/PlayPauseBtn';
import { NextTrackBtn } from 'components/AudioPlayer/controls/NextTrackBtn';
import { PrevTrackBtn } from 'components/AudioPlayer/controls/PrevTrackBtn';
import { Player } from './Player';
import styles from './style.module.css';
import { Seekbar } from './Seekbar/Seekbar';
import { getTrackDetailsThunk } from 'store/player/player.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { SongCard } from 'components/SongCard/SongCard';
import { getTracks } from 'store/tracks/tracks.selectors';

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
  const { activeSong, isPlay, currentIdx, isActive } = useSelector(getPlayer);
  const { currentSongs } = useSelector(getTracks);

  const [state, dispatchState]: [TState, Dispatch<TAction>] = useReducer(
    reducer,
    {
      seekTime: 0,
      currentTime: 0,
      duration: 0,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(togglePlay(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSong]);

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

    const trackId = currentSongs[nextIdx].id;
    if (currentSongs) {
      dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
    }
  };

  const prevTrack = () => {
    if (!isActive) {
      return;
    }

    if (currentSongs.length > 1) {
      dispatch(togglePlay(false));
    }

    const prevIdx = currentIdx > 0 ? currentIdx - 1 : currentSongs.length - 1;

    const trackId = currentSongs[prevIdx].id;
    if (currentSongs) {
      dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
    }
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
        src={activeSong?.src ? activeSong.src : ''}
        isPlay={isPlay}
        seekTime={state.seekTime}
        updateDuration={updateDuration}
        updateTime={updateTime}
        onEnded={nextTrack}
      />

      <h2
        style={{
          margin: '0px auto 20px',
          textAlign: 'center',
          width: '320px',
          height: '75px',
        }}
      >
        Playing Now
      </h2>

      {activeSong && (
        <SongCard
          imgUrl={activeSong.image}
          title={activeSong.name}
          artist={activeSong.artists.join(', ')}
          isSmall={false}
        />
      )}

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
