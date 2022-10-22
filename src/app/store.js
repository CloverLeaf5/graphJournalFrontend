import { configureStore } from '@reduxjs/toolkit';
import ReduxLogger from "redux-logger"
import authReducer from './authSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxLogger),
  reducer: {
    auth: authReducer
  },
});
