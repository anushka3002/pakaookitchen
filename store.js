// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './src/reducers/authSlice';
import kitchenSlice from './src/reducers/kitchenSlice';
import mapSlice from './src/reducers/mapSlice';

export const store = configureStore({
  reducer: {
    auth : authSlice,
    kitchenData: kitchenSlice,
    map: mapSlice
  },
});
