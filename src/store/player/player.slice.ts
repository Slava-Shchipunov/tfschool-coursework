import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  currentIdx: number;
  isActive: boolean;
  isPlay: boolean;
  activeSong: TTrack | null;
  isRepeat: boolean;
  isShuffle: boolean;
};

export const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  currentIdx: 0,
  isActive: false,
  isPlay: false,
  activeSong: null,
  isRepeat: false,
  isShuffle: false,
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
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    // TODO добавить тип для payload:

    setActiveSong: (state, { payload }) => {
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
  setActiveSong,
  setLoading,
  setError,
} = playerSlice.actions;
export const playerReducers = playerSlice.reducer;
