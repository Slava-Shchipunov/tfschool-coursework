import { configureStore } from '@reduxjs/toolkit';
import { playerReducers } from './player/player.slice';
import { userReducers } from './user/user.slice';
import { tracksReducers } from './tracks/tracks.slice';
import { updateAppReducers } from './updateApp/updateApp.slice';

export const store = configureStore({
  reducer: {
    player: playerReducers,
    user: userReducers,
    tracks: tracksReducers,
    updateApp: updateAppReducers,
  },
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
