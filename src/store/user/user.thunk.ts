import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setLoading, setUserName } from './user.slice';
import { handleError } from 'api/handleError';
import { TUserAuth, TUserCreate } from 'types/types';
import { signIn, signUp } from 'api/user';
import { auth } from 'api/firebase';

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
