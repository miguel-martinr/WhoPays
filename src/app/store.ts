import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import whoPaysReducer from '../features/state/whoPaysSlice';

export const store = configureStore({
  reducer: {
    WhoPays: whoPaysReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
