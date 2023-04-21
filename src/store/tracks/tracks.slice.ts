import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  trackList: TTrack[] | null;
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  trackList: null,
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
    setTrackList: (state, { payload }: PayloadAction<TTrack[] | null>) => {
      state.trackList = payload;
    },
  },
});

export const { setLoading, setError, setTrackList } = tracksSlice.actions;
export const tracksReducers = tracksSlice.reducer;
