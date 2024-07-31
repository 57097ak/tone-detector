// src/store/sentimentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchHistory: [],
  loading: false,
  error: null,
};

const sentimentSlice = createSlice({
  name: 'sentiments',
  initialState,
  reducers: {
    addSearchHistory(state, action) {
      state.searchHistory.push(action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { addSearchHistory, setLoading, setError } = sentimentSlice.actions;

export default sentimentSlice.reducer;
