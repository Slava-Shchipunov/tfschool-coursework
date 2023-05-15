import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setLoading, setTrackList } from './tracks.slice';
import { getTopTracks, searchTracks } from 'api/tracks';
import { handleError } from 'api/handleError';
import { getTracksData } from 'utils/getTracksData';
import { getTopTracksData } from 'utils/getTopTracksData';
import { setCurrentSongs } from 'store/player/player.slice';
import { shuffle } from 'utils/shuffle';

type TSearchTracksThunk = {
  searchQuery: string;
  isShuffle: boolean;
};

export const searchTracksThunk = createAsyncThunk(
  'searchTracks',
  async (searchThunckParams: TSearchTracksThunk, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const searchResults = await searchTracks(searchThunckParams.searchQuery);

      const tracksData = getTracksData(searchResults.data.tracks);
      dispatch(setTrackList(tracksData));
      const currentSongs = searchThunckParams.isShuffle
        ? shuffle(0, tracksData).shuffledArray
        : tracksData;
      dispatch(setCurrentSongs(currentSongs));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getTopTracksThunk = createAsyncThunk(
  'getTopTracks',
  async (_, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const topTracks = await getTopTracks();

      const tracksData = getTopTracksData(topTracks.data);
      dispatch(setCurrentSongs(tracksData));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
