import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';

type TSetActiveSongPayload = {
  currentIdx: number;
  activeSong: TTrack | null;
  isActive: boolean;
  isTrackLiked: boolean;
};

type TVolume = {
  isVolumeActive: boolean;
  volumeLevel: number;
};

type TInitialState = {
  isLoading: boolean;
  currentSongs: TTrack[];
  currentIdx: number;
  isTrackLiked: boolean;
  isActive: boolean;
  isPlay: boolean;
  activeSong: TTrack | null;
  isRepeat: boolean;
  isShuffle: boolean;
  volume: TVolume;
};

export const initialState: TInitialState = {
  isLoading: false,
  currentSongs: [],
  currentIdx: 0,
  isTrackLiked: false,
  isActive: false,
  isPlay: false,
  activeSong: null,
  isRepeat: false,
  isShuffle: false,
  volume: {
    isVolumeActive: false,
    volumeLevel: 70,
  },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlay: (state, action: PayloadAction<boolean | undefined>) => {
      state.isPlay =
        action.payload !== undefined ? action.payload : !state.isPlay;
    },
    toggleRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    toggleShuffle: (
      state,
      {
        payload,
      }: PayloadAction<{
        newCurrentIdx: number;
        newCurrentSongs: TTrack[];
      }>
    ) => {
      state.currentIdx = payload.newCurrentIdx;
      state.currentSongs = payload.newCurrentSongs;
      state.isShuffle = !state.isShuffle;
    },
    setVolume: (state, { payload }: PayloadAction<number | undefined>) => {
      if (typeof payload === 'undefined') {
        state.volume.isVolumeActive = !state.volume.isVolumeActive;
      } else {
        state.volume.volumeLevel = payload;
      }
    },
    setCurrentSongs: (state, { payload }: PayloadAction<TTrack[]>) => {
      state.currentSongs = payload;
    },
    setActiveSong: (
      state,
      { payload }: PayloadAction<TSetActiveSongPayload>
    ) => {
      state.currentIdx = payload.currentIdx;
      state.activeSong = payload.activeSong;
      state.isActive = payload.isActive;
      state.isTrackLiked = payload.isTrackLiked;
    },
    setIsTrackLiked: (state, { payload }: PayloadAction<boolean>) => {
      state.isTrackLiked = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const {
  togglePlay,
  toggleRepeat,
  toggleShuffle,
  setVolume,
  setCurrentSongs,
  setActiveSong,
  setIsTrackLiked,
  setLoading,
} = playerSlice.actions;
export const playerReducers = playerSlice.reducer;
