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
import { RepeatTrackBtn } from './controls/RepeatTrackBtn';
import { ShuffleTracksBtn } from './controls/ShuffleTracksBtn';
import { VolumeBar } from './VolumeBar/VolumeBar';
import { shuffle } from 'utils/shuffle';
import { getTracks } from 'store/tracks/tracks.selectors';
import {
  addLikedTrackThunk,
  removeLikedTrackThunk,
} from 'store/tracks/tracks.thunk';
import { AddTrackToLikedBtn } from './controls/AddTrackToLikedBtn';
import { MiniAudioPlayer } from './MiniAudioPlayer/MiniAudioPlayer';
import { GoBackBtn } from './GoBackBtn';
import { Loader } from 'components/Loader/Loader';
import { useMediaSessionEvents } from 'hooks/useMediaSessionEvents';
import { useMediaSessionMetadata } from 'hooks/useMediaSessionMetadata';

const className = classNames.bind(styles);

type TState = {
  seekTime: number;
  currentTime: number;
  duration: number;
  isPlayerHidden: boolean;
};

export type TAction = {
  type: 'seekTime' | 'currentTime' | 'duration' | 'isPlayerHidden';
  payload: number | boolean;
};

const reducer = (state: TState, action: TAction) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

export const AudioPlayer = () => {
  const {
    isLoading,
    activeSong,
    isPlay,
    currentSongs,
    currentIdx,
    isActive,
    isRepeat,
    isShuffle,
    volume,
    isTrackLiked,
  } = useSelector(getPlayer);
  const { isAddingTrackToLiked, trackList } = useSelector(getTracks);

  const [state, dispatchState]: [TState, Dispatch<TAction>] = useReducer(
    reducer,
    {
      seekTime: 0,
      currentTime: 0,
      duration: 0,
      isPlayerHidden: true,
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

    const nextIdx = currentIdx < currentSongs.length - 1 ? currentIdx + 1 : 0;
    const trackId = currentSongs[nextIdx].id;
    dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
  }, [currentIdx, currentSongs, dispatch, isActive]);

  const prevTrack = useCallback(() => {
    if (!isActive) {
      return;
    }

    if (currentSongs.length > 1) {
      dispatch(togglePlay(false));
    }

    const prevIdx = currentIdx > 0 ? currentIdx - 1 : currentSongs.length - 1;
    const trackId = currentSongs[prevIdx].id;
    dispatch(getTrackDetailsThunk({ trackId, currentSongs }));
  }, [currentIdx, currentSongs, dispatch, isActive]);

  const updateDuration = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      dispatchState({
        type: 'duration',
        payload: event.currentTarget.duration,
      });
    },
    []
  );

  const updateTime = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      dispatchState({
        type: 'currentTime',
        payload: event.currentTarget.currentTime,
      });
    },
    []
  );
  const repeatTrack = useCallback(() => {
    dispatch(toggleRepeat());
  }, [dispatch]);

  const shuffleTracks = useCallback(() => {
    if (currentIdx > currentSongs.length - 1) {
      return;
    }

    let payload;
    if (isShuffle) {
      const newCurrentIdx = trackList.findIndex(
        (el) => el.id === currentSongs[currentIdx].id
      );
      payload = {
        newCurrentIdx: newCurrentIdx > -1 ? newCurrentIdx : 0,
        newCurrentSongs: trackList,
      };
    } else {
      const resultOfShuffle = shuffle(currentIdx, trackList);
      payload = {
        newCurrentIdx: resultOfShuffle.newCurrentIdx,
        newCurrentSongs: resultOfShuffle.shuffledArray,
      };
    }

    dispatch(toggleShuffle(payload));
  }, [currentIdx, currentSongs, dispatch, isShuffle, trackList]);

  const showVolumeBar = useCallback(() => {
    dispatch(setVolume());
  }, [dispatch]);

  const addTrackToLiked = useCallback(() => {
    if (!activeSong) return;
    if (isTrackLiked) {
      dispatch(removeLikedTrackThunk(activeSong));
    } else {
      dispatch(addLikedTrackThunk(activeSong));
    }
  }, [activeSong, dispatch, isTrackLiked]);

  const handleClickToSwitchPlayer = useCallback(() => {
    dispatchState({
      type: 'isPlayerHidden',
      payload: !state.isPlayerHidden,
    });
  }, [state.isPlayerHidden]);

  useMediaSessionEvents({ playPauseTrack, prevTrack, nextTrack });
  useMediaSessionMetadata(activeSong);

  return (
    <div
      className={className(
        'audio-player',
        { hidden: state.isPlayerHidden },
        { 'audio-player-overflow': !state.isPlayerHidden }
      )}
    >
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

      <GoBackBtn handleClickToSwitchPlayer={handleClickToSwitchPlayer} />

      <h2 className={className('title')}>Playing Now</h2>

      <div className={className('song-card-wrapper')}>
        {isLoading && <Loader />}
        {activeSong && !isLoading && (
          <SongCard
            imgUrl={activeSong.image}
            title={activeSong.name}
            artist={activeSong.artists.join(', ')}
            isSmall={false}
          />
        )}
      </div>

      <div className={className('controls', { hidden: !isActive })}>
        <div className={className('slider-container')}>
          <VolumeBar
            volume={volume.volumeLevel}
            isVolumeActive={volume.isVolumeActive}
            handleClick={showVolumeBar}
          />

          {isAddingTrackToLiked && (
            <span className={className('wait-loader')}>Wait...</span>
          )}
          <AddTrackToLikedBtn
            isTrackLiked={isTrackLiked}
            isActive={isActive}
            addTrackToLiked={addTrackToLiked}
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
          isPlayerHidden={state.isPlayerHidden}
        />
        <div className={className('buttons')}>
          <PrevTrackBtn prevTrack={prevTrack} width="30px" height="30px" />
          <PlayPauseBtn
            isPlay={isPlay}
            playPauseTrack={playPauseTrack}
            width="30px"
            height="30px"
          />
          <NextTrackBtn nextTrack={nextTrack} width="30px" height="30px" />
        </div>
        {isActive && (
          <MiniAudioPlayer
            activeSong={activeSong}
            isPlay={isPlay}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
            playPauseTrack={playPauseTrack}
            handleClickToSwitchPlayer={handleClickToSwitchPlayer}
            isPlayerHidden={state.isPlayerHidden}
          />
        )}
      </div>
    </div>
  );
};
