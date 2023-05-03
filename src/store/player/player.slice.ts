import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TSong = {
  name?: string;
  src?: string;
};

type TInitialState = {
  currentSongs: TSong[];
  currentIdx: number;
  isActive: boolean;
  isPlay: boolean;
  activeSong: TSong;
};

const initialState: TInitialState = {
  currentSongs: [],
  currentIdx: 0,
  isActive: false,
  isPlay: false,
  activeSong: {},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlay: (state, action: PayloadAction<boolean | undefined>) => {
      state.isPlay =
        action.payload !== undefined ? action.payload : !state.isPlay;
    },
    next: (state, { payload }) => {
      state.currentIdx = payload;
      state.activeSong = state.currentSongs[payload];
      state.isActive = true;
    },
    prev: (state, { payload }) => {
      state.currentIdx = payload;
      state.activeSong = state.currentSongs[payload];
      state.isActive = true;
    },
    setActiveSong: (state, { payload }) => {
      state.currentSongs = payload.currentSongs;
      state.currentIdx = payload.currentIdx;
      state.activeSong = payload.activeSong;
      state.isActive = payload.isActive;
    },
  },
});

export const { togglePlay, next, prev, setActiveSong } = playerSlice.actions;
export const playerReducers = playerSlice.reducer;
