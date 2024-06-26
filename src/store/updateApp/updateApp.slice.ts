import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isOpen: boolean;
  registration: ServiceWorkerRegistration | null;
  updateAppErrorMessage?: string;
};

export const initialState: TInitialState = {
  isOpen: false,
  registration: null,
  /** Пока решил сохранять ошибки, но никак их не отображать пользователю, так как он не знает,
   * что приложение пытается загрузить обновление, и если что-то пойдёт не так, его это не будет беспокоить
   */
  updateAppErrorMessage: '',
};

const updateAppSlice = createSlice({
  name: 'updateApp',
  initialState,
  reducers: {
    setHasUpdates: (state, { payload }: PayloadAction<TInitialState>) => {
      state.isOpen = payload.isOpen;
      state.registration = payload.registration;
    },
    setUpdateAppError: (state, { payload }: PayloadAction<string>) => {
      state.updateAppErrorMessage = payload;
    },
  },
});

export const { setHasUpdates, setUpdateAppError } = updateAppSlice.actions;
export const updateAppReducers = updateAppSlice.reducer;
