import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAddingTrackToLiked,
  setTracksError,
  setHasNotSearchResults,
  setLoadingTracks,
  setTrackList,
} from './tracks.slice';
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
  checkTrackInStorage,
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

type TGetLikedTracksThunk = {
  userId: string;
  isShuffle: boolean;
};

export const searchTracksThunk = createAsyncThunk(
  'searchTracks',
  async (searchThunckParams: TSearchTracksThunk, { dispatch }) => {
    dispatch(setTracksError(''));
    dispatch(setLoadingTracks(true));
    dispatch(setHasNotSearchResults(false));
    try {
      const searchResults = await searchTracks(searchThunckParams.searchQuery);

      const tracksData = getTracksData(searchResults.data.tracks);

      if (!tracksData.length) {
        dispatch(setHasNotSearchResults(true));
      }

      dispatch(setTrackList(tracksData));
      const currentSongs = searchThunckParams.isShuffle
        ? shuffle(0, tracksData).shuffledArray
        : tracksData;
      dispatch(setCurrentSongs(currentSongs));
    } catch {
      dispatch(setHasNotSearchResults(true));
    } finally {
      dispatch(setLoadingTracks(false));
    }
  }
);

export const getTopTracksThunk = createAsyncThunk(
  'getTopTracks',
  async (isShuffle: boolean, { dispatch }) => {
    dispatch(setTracksError(''));
    dispatch(setLoadingTracks(true));
    dispatch(setTrackList([]));
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
      dispatch(setTracksError(errorMessage));
    } finally {
      dispatch(setLoadingTracks(false));
    }
  }
);

export const getLikedTracksThunk = createAsyncThunk(
  'getLikedTracks',
  async (getLikedTracksThunkParams: TGetLikedTracksThunk, { dispatch }) => {
    dispatch(setTracksError(''));
    dispatch(setLoadingTracks(true));
    dispatch(setTrackList([]));
    try {
      const likedSongsData = await getLikedSongsData(
        getLikedTracksThunkParams.userId
      );

      const tracksData: TTrack[] = likedSongsData.likedSongsIds.map(
        (trackId) => likedSongsData.likedSongs[trackId]
      );
      dispatch(setTrackList(tracksData));
      const currentSongs = getLikedTracksThunkParams.isShuffle
        ? shuffle(0, tracksData).shuffledArray
        : tracksData;
      dispatch(setCurrentSongs(currentSongs));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setTracksError(errorMessage));
    } finally {
      dispatch(setLoadingTracks(false));
    }
  }
);

export const addLikedTrackThunk = createAsyncThunk(
  'addLikedTrack',
  async (trackData: TTrack, { dispatch }) => {
    const { id } = trackData;
    dispatch(setTracksError(''));
    dispatch(setAddingTrackToLiked(true));
    try {
      if (auth.currentUser?.uid) {
        const hasTrackInStorage = await checkTrackInStorage(id);

        if (!hasTrackInStorage) {
          const downloadTrackData = await downloadTrack(id);
          const blob = await getBlobFromUrl(downloadTrackData.data[0].url);

          await uploadTrackToFirebase(id, blob);
        }

        const trackUrl = await downloadTrackToFirebase(id);

        await addLikedSongsData(auth.currentUser?.uid, trackData, trackUrl);
        dispatch(setIsTrackLiked(true));
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setTracksError(errorMessage));
    } finally {
      dispatch(setAddingTrackToLiked(false));
    }
  }
);

export const removeLikedTrackThunk = createAsyncThunk(
  'removeLikedTrack',
  async (trackData: TTrack, { dispatch }) => {
    const { id } = trackData;
    dispatch(setTracksError(''));
    dispatch(setAddingTrackToLiked(true));
    try {
      if (auth.currentUser?.uid) {
        await removeLikedSongData(auth.currentUser?.uid, id);
        dispatch(setIsTrackLiked(false));
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setTracksError(errorMessage));
    } finally {
      dispatch(setAddingTrackToLiked(false));
    }
  }
);
