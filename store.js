// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './src/reducers/authSlice';
import kitchenSlice from './src/reducers/kitchenSlice';
import mapSlice from './src/reducers/mapSlice';
import planSlice from './src/reducers/planSlice';
import orderSlice from './src/reducers/orderSlice';
import profileSlice from './src/reducers/profileSlice';

export const store = configureStore({
  reducer: {
    auth : authSlice,
    kitchenData: kitchenSlice,
    map: mapSlice,
    plan: planSlice,
    order: orderSlice,
    profileData: profileSlice,
    auth_token: authSlice
  },
});
