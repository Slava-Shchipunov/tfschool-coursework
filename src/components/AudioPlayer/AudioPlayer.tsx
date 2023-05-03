import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Dispatch, useCallback, useEffect, useReducer } from 'react';
import {
  setVolume,
  togglePlay,
  toggleRepeat,
  toggleShuffle,
} from 'store/player/player.slice';
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
import { RepeatTrackBtn } from './controls/RepeatTrackBtn';
import { ShuffleTracksBtn } from './controls/ShuffleTracksBtn';
import { VolumeBar } from './VolumeBar/VolumeBar';

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
  const {
    activeSong,
    isPlay,
    currentIdx,
    isActive,
    isRepeat,
    isShuffle,
    volume,
  } = useSelector(getPlayer);
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

  const playPauseTrack = useCallback(() => {
    if (!isActive) {
      return;
    }

    dispatch(togglePlay());
  }, [dispatch, isActive]);

  // TODO сделать так, чтобы если в currentSongs только один трек, при нажатии он начинался с начала
  const nextTrack = useCallback(() => {
    if (!isActive) {
      return;
    }

    if (currentSongs.length > 1) {
      dispatch(togglePlay(false));
    }

    let nextIdx: number;

    if (isShuffle) {
      do {
        nextIdx = Math.floor(Math.random() * currentSongs.length);
      } while (currentIdx === nextIdx);
    } else {
      nextIdx = currentIdx < currentSongs.length - 1 ? currentIdx + 1 : 0;
    }

    const trackId = currentSongs[nextIdx].id;
    if (currentSongs) {
      dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
    }
  }, [currentIdx, currentSongs, dispatch, isActive, isShuffle]);

  const prevTrack = useCallback(() => {
    if (!isActive) {
      return;
    }

    if (currentSongs.length > 1) {
      dispatch(togglePlay(false));
    }

    let prevIdx: number;

    if (isShuffle) {
      do {
        prevIdx = Math.floor(Math.random() * currentSongs.length);
      } while (currentIdx === prevIdx);
    } else {
      prevIdx = currentIdx > 0 ? currentIdx - 1 : currentSongs.length - 1;
    }

    const trackId = currentSongs[prevIdx].id;
    if (currentSongs) {
      dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
    }
  }, [currentIdx, currentSongs, dispatch, isActive, isShuffle]);

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
  const repeatTrack = () => {
    dispatch(toggleRepeat());
  };

  const shuffleTracks = () => {
    dispatch(toggleShuffle());
  };

  const showVolumeBar = () => {
    dispatch(setVolume());
  };

  return (
    <div className={className('audio-player')}>
      <Player
        src={activeSong?.src ? activeSong.src : ''}
        isPlay={isPlay}
        seekTime={state.seekTime}
        updateDuration={updateDuration}
        updateTime={updateTime}
        loop={isRepeat}
        volume={volume.volumeLevel}
        onEnded={nextTrack}
      />

      <h2>Playing Now</h2>

      {activeSong && (
        <SongCard
          imgUrl={activeSong.image}
          title={activeSong.name}
          artist={activeSong.artists.join(', ')}
          isSmall={false}
        />
      )}

      <div className={className('controls')}>
        <div className={className('slider-container')}>
          <VolumeBar
            volume={volume.volumeLevel}
            isVolumeActive={volume.isVolumeActive}
            handleClick={showVolumeBar}
          />
          <RepeatTrackBtn isRepeat={isRepeat} repeatTrack={repeatTrack} />
          <ShuffleTracksBtn
            isShuffle={isShuffle}
            shuffleTracks={shuffleTracks}
          />
        </div>
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
    </div>
  );
};
