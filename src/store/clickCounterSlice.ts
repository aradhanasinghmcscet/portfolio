import { createSlice } from '@reduxjs/toolkit';

interface ClickCounterState {
  count: number;
}

const initialState: ClickCounterState = {
  count: 0,
};

const clickCounterSlice = createSlice({
  name: 'clickCounter',
  initialState,
  reducers: {
    incrementClick: (state) => {
      state.count += 1;
    },
    resetClicks: (state) => {
      state.count = 0;
    },
  },
});

export const { incrementClick, resetClicks } = clickCounterSlice.actions;
export default clickCounterSlice.reducer;
