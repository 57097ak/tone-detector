// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import sentimentReducer from './sentimentSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    sentiments: sentimentReducer,
    user: userReducer,
  },
});

export default store;
