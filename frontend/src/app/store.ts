import { configureStore, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = (dispatch: AppDispatch, getState: RootState) => void;
export type AppThunkAction = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;