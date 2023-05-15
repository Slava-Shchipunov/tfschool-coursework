import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  trackList: TTrack[];
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  trackList: [],
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
    setTrackList: (state, { payload }: PayloadAction<TTrack[]>) => {
      state.trackList = payload;
    },
  },
});

export const { setLoading, setError, setTrackList } = tracksSlice.actions;
export const tracksReducers = tracksSlice.reducer;
