import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserError, setLoading, setUserName } from './user.slice';
import { handleError } from 'api/handleError';
import { TUserAuth, TUserCreate } from 'types/types';
import { signIn, signUp, userSignOut } from 'api/user';
import { auth } from 'api/firebase';
import {
  initialState,
  setActiveSong,
  setCurrentSongs,
} from 'store/player/player.slice';
import { convertUserError } from 'utils/convertErrorsToHumanReadableText';

export const userSignUpThunk = createAsyncThunk(
  'userSignUp',
  async (data: TUserCreate, { dispatch }) => {
    dispatch(setUserError(''));
    dispatch(setLoading(true));
    try {
      await signUp(data);

      if (auth.currentUser?.displayName) {
        dispatch(setUserName(auth.currentUser.displayName));
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setUserError(convertUserError(errorMessage)));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const userSignInThunk = createAsyncThunk(
  'userSignIn',
  async (data: TUserAuth, { dispatch }) => {
    dispatch(setUserError(''));
    dispatch(setLoading(true));
    try {
      await signIn(data);

      if (auth.currentUser?.displayName) {
        dispatch(setUserName(auth.currentUser.displayName));
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setUserError(convertUserError(errorMessage)));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const userSignOutThunk = createAsyncThunk(
  'userSignOut',
  async (_, { dispatch }) => {
    dispatch(setUserError(''));
    dispatch(setLoading(true));
    try {
      await userSignOut();
      dispatch(setUserName(''));
      dispatch(setActiveSong(initialState));
      dispatch(setCurrentSongs([]));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setUserError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
