import { configureStore } from '@reduxjs/toolkit';
import { playerReducers } from './player/player.slice';
import { userReducers } from './user/user.slice';

export const store = configureStore({
  reducer: {
    player: playerReducers,
    user: userReducers,
  },
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
