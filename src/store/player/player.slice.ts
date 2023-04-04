import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isPlay: boolean;
  activeSong: {
    src: string;
  };
};

// для проверки работы воспроизведения/паузы трека в initialState добавлена ссылка в activeSong
// в дальнейшем это будет пустой объект
const initialState: TInitialState = {
  isPlay: false,
  activeSong: {
    src: 'https://p.scdn.co/mp3-preview/effd763b0241c4973a3ebad491ac7fd13c93e6c5?cid=d8a5ed958d274c2e8ee717e6a4b0971d',
  },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state, { payload }) => {
      state.isPlay = payload;
    },
  },
});

export const { playPause } = playerSlice.actions;
export const playerRedusers = playerSlice.reducer;
