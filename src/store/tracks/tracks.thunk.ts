import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setLoading, setTrackList } from './tracks.slice';
import { searchTracks } from 'api/tracks';
import { handleError } from 'api/handleError';
import { getTracksData } from 'utils/getTracksData';

export const searchTracksThunk = createAsyncThunk(
  'searchTracks',
  async (searchQuery: string, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const searchResults = await searchTracks(searchQuery);

      const tracksData = getTracksData(searchResults.data.tracks);
      dispatch(setTrackList(tracksData));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
