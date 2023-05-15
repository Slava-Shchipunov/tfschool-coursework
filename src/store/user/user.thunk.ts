import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setLoading, setUserName } from './user.slice';
import { handleError } from 'api/handleError';
import { TUserAuth, TUserCreate } from 'types/types';
import { signIn, signUp, userSignOut } from 'api/user';
import { auth } from 'api/firebase';
import { initialState, setActiveSong } from 'store/player/player.slice';
import { setCurrentSongs } from 'store/tracks/tracks.slice';

export const userSignUpThunk = createAsyncThunk(
  'userSignUp',
  async (data: TUserCreate, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      await signUp(data);

      if (auth.currentUser?.displayName) {
        dispatch(setUserName(auth.currentUser.displayName));
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const userSignInThunk = createAsyncThunk(
  'userSignIn',
  async (data: TUserAuth, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      await signIn(data);

      if (auth.currentUser?.displayName) {
        dispatch(setUserName(auth.currentUser.displayName));
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const userSignOutThunk = createAsyncThunk(
  'userSignOut',
  async (_, { dispatch }) => {
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      await userSignOut();
      dispatch(setUserName(''));
      dispatch(setActiveSong(initialState));
      dispatch(setCurrentSongs([]));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
