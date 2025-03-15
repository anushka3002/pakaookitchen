import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_API, REACT_NATIVE_X_API_KEY, REACT_NATIVE_FOOD_API } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState = {
  createProfile: {
    data: null,
  },
  addKitchen: {
    data: null,
  },
  categoryData: {
    data: null,
  },
  foodStyle: {
    data: null,
  },
  kitchenStatus: {
    data: null,
  },
  loading: false
};

// Create a slice for Kitchen data
export const kitchenSlice = createSlice({
  name: 'kitchenData',
  initialState,
  reducers: {
    // Kitchen Reducers
    setProfileLoading: (state) => {
      state.createProfile.loading = true;
    },
    setProfileData: (state, action) => {
      state.createProfile.data = action.payload;
      state.loading = false;
    },
    setProfileError: (state, action) => {
      state.createProfile.data = action.payload;
      state.loading = false;
    },

    // Add Kitchen Reducers
    setAddKitchenLoading: (state) => {
      state.addKitchen.loading = true;
    },
    setAddKitchenSuccess: (state, action) => {
      state.addKitchen.data = action.payload;
      state.loading = false;
    },
    setAddKitchenError: (state, action) => {
      state.addKitchen.data = action.payload;
      state.loading = false;
    },

    //Get Category Reducers
    setCategoryLoading: (state) => {
      state.loading = true;
    },
    setCategorySuccess: (state, action) => {
      state.categoryData.data = action.payload;
      state.loading = false;
    },
    setCategoryError: (state, action) => {
      state.categoryData.data = action.payload;
      state.loading = false;
    },

    //food style
    setFoodStyleLoading: (state) => {
      state.loading = true;
    },
    setFoodStyleSuccess: (state, action) => {
      state.foodStyle.data = action.payload;
      state.loading = false;
    },
    setFoodStyleError: (state, action) => {
      state.foodStyle.data = action.payload;
      state.loading = false;
    },

    //kitchen status
    setKitchenStatusLoading: (state) => {
      state.loading = true;
    },
    setKitchenStatusSuccess: (state, action) => {
      state.kitchenStatus.data = action.payload;
      state.loading = false;
    },
    setKitchenStatusError: (state, action) => {
      state.kitchenStatus.data = action.payload;
      state.loading = false;
    },
  },
}
);

// Actions
export const { setProfileLoading, setProfileData, setProfileError, setAddKitchenLoading,
  setAddKitchenSuccess, setAddKitchenError, setCategorySuccess, setCategoryError,
  setCategoryLoading, setFoodStyleLoading, setFoodStyleError, setFoodStyleSuccess,
  setKitchenStatusLoading, setKitchenStatusSuccess, setKitchenStatusError } = kitchenSlice.actions;
  
export const createUserData = (userData) => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
    };

    const response = await axios.post(`${REACT_NATIVE_API}/profile/kitchen/registration`, userData, { headers });
    dispatch(setProfileData(response.data));
    EncryptedStorage.setItem('application_id', response?.data?.data?.user_data?.application_id)
  } catch (error) {
    if (error.response) {
      dispatch(setProfileError(error.response.data.error));
  } else {
      dispatch(setProfileError(error.message));
  }
  }
};

export const addKitchenData = (kitchenData, navigation) => async (dispatch) => {
  try {
    dispatch(setAddKitchenLoading());
    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
      'Content-Type': 'application/json'
    };

    const response = await axios.post(`${REACT_NATIVE_API}/profile/kitchen/add_kitchen`, kitchenData, { headers });
    dispatch(setAddKitchenSuccess(response.data));
    if (response?.data?.data?.message == 'success') {
      navigation.navigate('Dashboard')
      AsyncStorage.removeItem('kitchenApproved')
  }
  } catch (error) {
    if (error.response) {
      dispatch(setAddKitchenError(error.response.data.error));
  } else {
      dispatch(setAddKitchenError(error.message));
  }
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    dispatch(setCategoryLoading());
    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
    };
    const response = await axios.get(`${REACT_NATIVE_FOOD_API}/kitchen/category`, { headers });
    dispatch(setCategorySuccess(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setCategoryError(error.response.data.error));
  } else {
      dispatch(setCategoryError(error.message));
  }
  }
};

export const getFoodStyle = (value) => async (dispatch) => {
  try {
    dispatch(setFoodStyleLoading());
    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
    };
    const response = await axios.get(`${REACT_NATIVE_FOOD_API}/kitchen/cuisine_style?name=${value}`, { headers });
    dispatch(setFoodStyleSuccess(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setFoodStyleError(error.response.data.error));
  } else {
      dispatch(setFoodStyleError(error.message));
  }
  }
};

export const getKitchenStatus = () => async (dispatch) => {
  try {
    dispatch(setKitchenStatusLoading());
    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
    };
    const response = await axios.get(`${REACT_NATIVE_API}/profile/kitchen/get_application_status`, { headers });
    dispatch(setKitchenStatusSuccess(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setKitchenStatusError(error.response.data.error));
  } else {
      dispatch(setKitchenStatusError(error.message));
  }
  }
};

export default kitchenSlice.reducer;
