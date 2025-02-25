import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_API, REACT_NATIVE_X_API_KEY, REACT_NATIVE_FOOD_API } from '@env';

// Initial state
const initialState = {
  createProfile: {
    data: null,
    loading: false,
    error: null,
  },
  addKitchen: {
    data: null,
    loading: null,
    error: null
  },
  categoryData: {
    data: null,
    loading: null,
    error: null
  },
  foodStyle: {
    data: null,
    loading: null,
    error: null
  },
  kitchenStatus: {
    data: null,
    loading: null,
    error: null
  }
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
      state.createProfile.loading = false;
    },
    setProfileError: (state, action) => {
      state.createProfile.error = action.payload;
      state.createProfile.loading = false;
    },

    // Add Kitchen Reducers
    setAddKitchenLoading: (state) => {
      state.addKitchen.loading = true;
    },
    setAddKitchenSuccess: (state, action) => {
      state.addKitchen.data = action.payload;
      state.addKitchen.loading = false;
    },
    setAddKitchenError: (state, action) => {
      state.addKitchen.error = action.payload;
      state.addKitchen.loading = false;
    },

    //Get Category Reducers
    setCategoryLoading: (state) =>{
      state.categoryData.loading = true;
    },
    setCategorySuccess: (state, action) => {
      state.categoryData.data = action.payload;
      state.categoryData.loading = false;
    },
    setCategoryError: (state, action) => {
      state.categoryData.error = action.payload;
      state.categoryData.loading = false;
    },

    //food style
    setFoodStyleLoading: (state) =>{
      state.foodStyle.loading = true;
    },
    setFoodStyleSuccess: (state, action) => {
      state.foodStyle.data = action.payload;
      state.foodStyle.loading = false;
    },
    setFoodStyleError: (state, action) => {
      state.foodStyle.error = action.payload;
      state.foodStyle.loading = false;
    },

     //kitchen status
     setKitchenStatusLoading: (state) =>{
      state.kitchenStatus.loading = true;
    },
    setKitchenStatusSuccess: (state, action) => {
      state.kitchenStatus.data = action.payload;
      state.kitchenStatus.loading = false;
    },
    setKitchenStatusError: (state, action) => {
      state.kitchenStatus.error = action.payload;
      state.kitchenStatus.loading = false;
    },
  },
}
);

// Actions
export const { setProfileLoading, setProfileData, setProfileError, setAddKitchenLoading,
   setAddKitchenSuccess, setAddKitchenError, setCategorySuccess, setCategoryError,
    setCategoryLoading, setFoodStyleLoading, setFoodStyleError, setFoodStyleSuccess,
    setKitchenStatusLoading, setKitchenStatusSuccess, setKitchenStatusError } = kitchenSlice.actions;[]
export const createUserData = (userData) => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
      const authToken = await EncryptedStorage.getItem('auth_token');
     
      const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczOTI2NTU0MywiZXhwIjoxNzQ0NDQ5NTQzfQ._QyPN26yH1XlHMY0TdA7eaWJWrPu-_2o0Sx0itSobDc',
        'x-auth-key': authToken, 
      };
    
        const response = await axios.post(`${REACT_NATIVE_API}/profile/kitchen/registration`, userData, {headers});
        dispatch(setProfileData(response.data));
        EncryptedStorage.setItem('application_id',response?.data?.data?.user_data?.application_id)
    } catch (error) {
        dispatch(setProfileError(error.message));
    }
};

export const addKitchenData = (kitchenData) => async (dispatch) => {
  try {
    dispatch(setAddKitchenLoading());
      const authToken = await EncryptedStorage.getItem('auth_token'); 
  
      const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczOTYzOTY1NCwiZXhwIjoxNzQ0ODIzNjU0fQ.2Hi-ZZkDY8_cANERVRaFmI-v2_EHFia_lC7rX2Ok79A',
        'x-auth-key': authToken, 
        'Content-Type': 'application/json'
      };
    
        const response = await axios.post(`${REACT_NATIVE_API}/profile/kitchen/add_kitchen`, kitchenData, {headers});
        dispatch(setAddKitchenSuccess(response.data));
    } catch (error) {
        dispatch(setAddKitchenError(error.message));
    }
};

export const getCategory = () => async (dispatch) => {
  try {
    dispatch(setCategoryLoading());
      const authToken = await EncryptedStorage.getItem('auth_token'); 
      const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczOTA4NDEzNSwiZXhwIjoxNzQ0MjY4MTM1fQ.zojiBGcNU0kMO4uvWrCQoLMG6XCPgRoVjwkXDt3hpAI',
        'x-auth-key': authToken, 
      };
        const response = await axios.get(`${REACT_NATIVE_FOOD_API}/kitchen/category`, {headers});
        dispatch(setCategorySuccess(response.data));
    } catch (error) {
        dispatch(setCategoryError(error.message));
    }
};

export const getFoodStyle = (value) => async (dispatch) => {
  try {
    dispatch(setFoodStyleLoading());
      const authToken = await EncryptedStorage.getItem('auth_token'); 
  
      const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczOTA4NDEzNSwiZXhwIjoxNzQ0MjY4MTM1fQ.zojiBGcNU0kMO4uvWrCQoLMG6XCPgRoVjwkXDt3hpAI',
        'x-auth-key': authToken, 
      };
        const response = await axios.get(`${REACT_NATIVE_FOOD_API}/kitchen/cuisine_style?name=${value}`, {headers});
        dispatch(setFoodStyleSuccess(response.data));
    } catch (error) {
        dispatch(setFoodStyleError(error.message));
    }
};

export const getKitchenStatus = () => async (dispatch) => {
  try {
    dispatch(setKitchenStatusLoading());
      const authToken = await EncryptedStorage.getItem('auth_token'); 
  
      const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczOTA4NDEzNSwiZXhwIjoxNzQ0MjY4MTM1fQ.zojiBGcNU0kMO4uvWrCQoLMG6XCPgRoVjwkXDt3hpAI',
        'x-auth-key': authToken, 
      };
        const response = await axios.get(`${REACT_NATIVE_API}/profile/kitchen/get_application_status`, {headers});
        dispatch(setKitchenStatusSuccess(response.data));
    } catch (error) {
        dispatch(setKitchenStatusError(error.message));
    }
};

export default kitchenSlice.reducer;
