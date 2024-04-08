import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from 'api/handleError';
import { setUpdateAppError } from './updateApp.slice';

export const checkServiceWorkerUpdateThunk = createAsyncThunk(
  'checkServiceWorkerRegistration',
  async (_, { dispatch }) => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.update();
      }
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setUpdateAppError(errorMessage));
    }
  }
);
