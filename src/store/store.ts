import { configureStore } from '@reduxjs/toolkit';
import { playerRedusers } from './player/player.slice';

export const store = configureStore({
  reducer: {
    player: playerRedusers,
  },
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
