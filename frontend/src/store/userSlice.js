// src/store/userSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Slice of the Redux store responsible for managing user authentication state.
 *
 * @constant
 * @type {Object}
 * @property {string} name - Name of the slice.
 * @property {Object} initialState - Initial state for the slice.
 * @property {Object} reducers - Reducers to handle actions for the slice.
 */
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
  },
  reducers: {
    /**
     * Sets user information in the state upon successful login.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload.
     * @param {Object} action.payload - The user information to be set.
     */
    loginSuccess(state, action) {
      state.userInfo = action.payload;
    },

    /**
     * Clears user information from the state upon logout.
     *
     * @param {Object} state - The current state of the slice.
     */
    logout(state) {
      state.userInfo = null;
    },
  },
});

/**
 * Asynchronous thunk action to handle user login.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Function} A thunk function to be dispatched.
 */
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(loginSuccess(data));
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
  }
};

// Export actions and reducer
export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
