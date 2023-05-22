import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTrack } from 'types/types';

type TInitialState = {
  isAddingTrackToLiked: boolean;
  isLoadingTracks: boolean;
  hasNotSearchResults: boolean;
  tracksErrorMessage: string;
  trackList: TTrack[];
};

const initialState: TInitialState = {
  isAddingTrackToLiked: false,
  isLoadingTracks: false,
  hasNotSearchResults: false,
  tracksErrorMessage: '',
  trackList: [],
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setAddingTrackToLiked: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddingTrackToLiked = payload;
    },
    setLoadingTracks: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingTracks = payload;
    },
    setHasNotSearchResults: (state, { payload }: PayloadAction<boolean>) => {
      state.hasNotSearchResults = payload;
    },
    setTracksError: (state, { payload }: PayloadAction<string>) => {
      state.tracksErrorMessage = payload;
    },
    setTrackList: (state, { payload }: PayloadAction<TTrack[]>) => {
      state.trackList = payload;
    },
  },
});

export const {
  setAddingTrackToLiked,
  setLoadingTracks,
  setHasNotSearchResults,
  setTracksError,
  setTrackList,
} = tracksSlice.actions;
export const tracksReducers = tracksSlice.reducer;
