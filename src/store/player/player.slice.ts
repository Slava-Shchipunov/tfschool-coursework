import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  currentIdx: number;
  isActive: boolean;
  isPlay: boolean;
  activeSong: TTrack | null;
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  currentIdx: 0,
  isActive: false,
  isPlay: false,
  activeSong: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlay: (state, action: PayloadAction<boolean | undefined>) => {
      state.isPlay =
        action.payload !== undefined ? action.payload : !state.isPlay;
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

export const { togglePlay, setActiveSong, setLoading, setError } =
  playerSlice.actions;
export const playerReducers = playerSlice.reducer;
