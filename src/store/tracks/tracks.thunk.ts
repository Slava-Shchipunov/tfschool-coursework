import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setLoading, setTrackList } from './tracks.slice';
import { getTopTracks, downloadTrack, searchTracks } from 'api/tracks';
import { handleError } from 'api/handleError';
import { getTracksData } from 'utils/getTracksData';
import {
  addLikedSongsData,
  getLikedSongsData,
  removeLikedSongData,
} from 'api/firebaseDatabase';
import { TTrack } from 'types/types';
import {
  downloadTrackToFirebase,
  getBlobFromUrl,
  uploadTrackToFirebase,
} from 'api/firebaseStorage';
import { auth } from 'api/firebase';
import { getTopTracksData } from 'utils/getTopTracksData';
import { setCurrentSongs, setIsTrackLiked } from 'store/player/player.slice';
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
  async (isShuffle: boolean, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const topTracks = await getTopTracks();

      const tracksData = getTopTracksData(topTracks.data);
      dispatch(setTrackList(tracksData));
      const currentSongs = isShuffle
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

export const getLikedTracksThunk = createAsyncThunk(
  'getLikedTracks',
  async (userId: string, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const likedSongsData = await getLikedSongsData(userId);
      const tracksData: TTrack[] = likedSongsData.likedSongsIds.map(
        (trackId) => likedSongsData.likedSongs[trackId]
      );
      dispatch(setCurrentSongs(tracksData));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addLikedTrackThunk = createAsyncThunk(
  'addLikedTrack',
  async (trackData: TTrack, { dispatch }) => {
    const { id } = trackData;
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const downloadTrackData = await downloadTrack(id);
      const blob = await getBlobFromUrl(downloadTrackData.data.link);

      if (auth.currentUser?.uid) {
        await uploadTrackToFirebase(auth.currentUser?.uid, id, blob);

        const trackUrl = await downloadTrackToFirebase(
          auth.currentUser?.uid,
          id
        );

        await addLikedSongsData(auth.currentUser?.uid, trackData, trackUrl);
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const removeLikedTrackThunk = createAsyncThunk(
  'removeLikedTrack',
  async (trackData: TTrack, { dispatch }) => {
    const { id } = trackData;
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      if (auth.currentUser?.uid) {
        await removeLikedSongData(auth.currentUser?.uid, id);
        dispatch(setIsTrackLiked(false));
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
