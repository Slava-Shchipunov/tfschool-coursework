import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
