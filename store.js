// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './src/reducers/authSlice';
import kitchenSlice from './src/reducers/kitchenSlice';

export const store = configureStore({
  reducer: {
    user : authSlice,
    kitchenData: kitchenSlice
  },
});
