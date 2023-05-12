import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setLoading, setActiveSong } from './player.slice';
import { getTrackDetails } from 'api/tracks';
import { handleError } from 'api/handleError';
import { TTrack } from 'types/types';
import { createPlayerState } from 'utils/createPlayerState';
import { getLikedSongsIds } from 'api/firebaseDatabase';
import { auth } from 'api/firebase';

type TTrackData = {
  trackId: string;
  currentSongs: TTrack[];
};

export const getTrackDetailsThunk = createAsyncThunk(
  'getTrackDetails',
  async (trackData: TTrackData, { dispatch }) => {
    const { trackId, currentSongs } = trackData;
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      let likedSongsIds;
      if (auth.currentUser?.uid) {
        likedSongsIds = await getLikedSongsIds(auth.currentUser?.uid);
      }

      const isTrackLiked = Boolean(
        likedSongsIds && likedSongsIds.includes(trackId)
      );

      const trackDetails = await getTrackDetails(trackId);
      const playerState = createPlayerState({
        trackId,
        currentSongs,
        trackDetails,
        isTrackLiked,
      });

      dispatch(setActiveSong(playerState));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
