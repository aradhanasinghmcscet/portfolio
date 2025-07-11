import { configureStore } from '@reduxjs/toolkit';
import chessReducer from './chessSlice';
import clickCounterReducer from './clickCounterSlice';

export const store = configureStore({
  reducer: {
    chess: chessReducer,
    clickCounter: clickCounterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
