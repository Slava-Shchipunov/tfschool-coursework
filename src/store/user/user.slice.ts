import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  userName: string;
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
    },
    setUserName: (state, { payload }: PayloadAction<string>) => {
      state.userName = payload;
    },
  },
});

export const { setLoading, setError, setUserName } = userSlice.actions;
export const userReducers = userSlice.reducer;
