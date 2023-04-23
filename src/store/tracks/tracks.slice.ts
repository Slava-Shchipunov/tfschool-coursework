import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  currentSongs: TTrack[];
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  currentSongs: [],
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
    },
    setCurrentSongs: (state, { payload }: PayloadAction<TTrack[]>) => {
      state.currentSongs = payload;
    },
  },
});

export const { setLoading, setError, setCurrentSongs } = tracksSlice.actions;
export const tracksReducers = tracksSlice.reducer;
