import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isLoading: boolean;
  userErrorMessage: string;
  userName: string;
};

const initialState: TInitialState = {
  isLoading: false,
  userErrorMessage: '',
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setUserError: (state, { payload }: PayloadAction<string>) => {
      state.userErrorMessage = payload;
    },
    setUserName: (state, { payload }: PayloadAction<string>) => {
      state.userName = payload;
    },
  },
});

export const { setLoading, setUserError, setUserName } = userSlice.actions;
export const userReducers = userSlice.reducer;
