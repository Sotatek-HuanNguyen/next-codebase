import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReduxState } from '~/stores/store';

export interface appState {
  counter: number;
  loading: boolean;
  lang: string;
}

const initialState: appState = {
  counter: 0,
  loading: false,
  lang: 'en',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },

    // Counter feature
    increment(state, action: PayloadAction<number>) {
      console.log('action', action);
      state.loading = true;
    },

    incrementSuccess(state, action: PayloadAction<number>) {
      state.counter = state.counter + action.payload;
      state.loading = false;
    },

    incrementFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const appActions = appSlice.actions;

// Selectors
export const selectAppLoading = (state: ReduxState) => state.app.loading;
export const selectLangLoading = (state: ReduxState) => state.app.lang;
export const selectCount = (state: ReduxState) => state.app.counter;

// Reducer
const appReducer = appSlice.reducer;
export default appReducer;
