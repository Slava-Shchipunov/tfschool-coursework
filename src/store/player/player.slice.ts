import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';
import { shuffle } from 'utils/shuffle';

type TSetActiveSongPayload = {
  currentIdx: number;
  activeSong: TTrack | null;
  isActive: boolean;
};

type TVolume = {
  isVolumeActive: boolean;
  volumeLevel: number;
};

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  currentSongs: TTrack[];
  currentIdx: number;
  isActive: boolean;
  isPlay: boolean;
  activeSong: TTrack | null;
  isRepeat: boolean;
  isShuffle: boolean;
  volume: TVolume;
};

export const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  currentSongs: [],
  currentIdx: 0,
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
    toggleShuffle: (state, { payload }: PayloadAction<TTrack[]>) => {
      if (state.isShuffle) {
        state.currentIdx =
          payload.findIndex(
            (el) => el.id === state.currentSongs[state.currentIdx].id
          ) ?? 0;
        state.currentSongs = payload;
      } else {
        const shuffledArray = shuffle(state.currentIdx, payload);

        state.currentIdx = shuffledArray.newCurrentIdx;
        state.currentSongs = shuffledArray.shuffledArray;
      }
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
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
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
  setLoading,
  setError,
} = playerSlice.actions;
export const playerReducers = playerSlice.reducer;
