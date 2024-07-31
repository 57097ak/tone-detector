// src/store/sentimentSlice.js

import { createSlice } from '@reduxjs/toolkit';

/**
 * The initial state for the sentiment slice.
 *
 * @typedef {Object} InitialState
 * @property {Array<Object>} searchHistory - Array to hold search history items.
 * @property {boolean} loading - Indicates whether the sentiment data is currently being loaded.
 * @property {string|null} error - Holds error message if there's an error during sentiment data fetching.
 */

const initialState = {
  searchHistory: [],
  loading: false,
  error: null,
};

/**
 * Slice of the Redux store responsible for managing sentiment analysis state.
 *
 * @constant
 * @type {Object}
 * @property {string} name - Name of the slice.
 * @property {InitialState} initialState - Initial state for the slice.
 * @property {Object} reducers - Reducers to handle actions for the slice.
 */
const sentimentSlice = createSlice({
  name: 'sentiments',
  initialState,
  reducers: {
    /**
     * Adds a new item to the search history.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload.
     * @param {Object} action.payload - The search history item to be added.
     */
    addSearchHistory(state, action) {
      state.searchHistory.push(action.payload);
    },

    /**
     * Sets the loading state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload.
     * @param {boolean} action.payload - The new loading state.
     */
    setLoading(state, action) {
      state.loading = action.payload;
    },

    /**
     * Sets the error message.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload.
     * @param {string|null} action.payload - The error message to be set.
     */
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { addSearchHistory, setLoading, setError } = sentimentSlice.actions;

export default sentimentSlice.reducer;
