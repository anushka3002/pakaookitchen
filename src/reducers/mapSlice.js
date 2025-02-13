import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_API, REACT_NATIVE_X_API_KEY, GOOGLE_API_KEY } from '@env';

// Initial state
const initialState = {
  searchlocation: {
    data: null,
    loading: false,
    error: null,
  },
  geolocation: {
    data: null,
    loading: false,
    error: null,
  },
  locationCord: {
    data: null,
    loading: false,
    error: null
  }
};

// Create a slice for user & OTP
export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // User Reducers
    setSearchLoading: (state) => {
      state.searchlocation.loading = true;
    },
    setSearchSuccess: (state,action) => {
      state.searchlocation.data = action.payload;
      state.searchlocation.error = null; 
      state.searchlocation.loading = false;
    },
    setSearchLocationError: (state, action) => {
      state.searchlocation.error = action.payload;
      state.searchlocation.loading = false;
      state.searchlocation.data = null;
    },


    // Location Reducers
    setGeoLocationLoading: (state) => {
      state.geolocation.loading = true;
      state.geolocation.error = null;
      state.geolocation.data = null;
    },
    setGeoLocationSuccess: (state, action) => {
      state.geolocation.data = action.payload;
      state.geolocation.loading = false;
    },
    setGeoLocationError: (state, action) => {
      state.geolocation.error = action.payload;
      state.geolocation.loading = false;
      state.geolocation.data = null
    },

    // Location Reducers
    setLocationCordLoading: (state) => {
      state.locationCord.loading = true;
      state.locationCord.error = null;
      state.locationCord.data = null;
    },
    setLocationCordSuccess: (state, action) => {
      state.locationCord.data = action.payload;
      state.locationCord.loading = false;
    },
    setLocationCordError: (state, action) => {
      state.locationCord.error = action.payload;
      state.locationCord.loading = false;
      state.locationCord.data = null
    },
  },
});

// Actions
export const { setSearchLoading, setSearchSuccess, setSearchLocationError, 
  setGeoLocationLoading, setGeoLocationSuccess, setGeoLocationError,
  setLocationCordError, setLocationCordLoading, setLocationCordSuccess } = mapSlice.actions;

export const searchMapData = (inputText) => async (dispatch) => {
  try {
    dispatch(setSearchLoading());
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&key=${GOOGLE_API_KEY}&components=country:in`)
    dispatch(setSearchSuccess(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setSearchLocationError(error.response.data.error));
    } else {
      dispatch(setSearchLocationError(error.message));
    }
  }
};

export const getGeoLocation = (address) => async (dispatch) => {
  try {
    dispatch(setGeoLocationLoading());
    const response = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`);
    dispatch(setGeoLocationSuccess(response?.data?.results[0]?.geometry?.location));
  } catch (error) {
    if (error.response) {
      dispatch(setGeoLocationError(error.response.data?.error || "Something went wrong"));
    } else {
      dispatch(setGeoLocationError(error.message));
    }
  }
};

export const getAddressFromCoordinates = (latitude, longitude) => async (dispatch) => {
    try {
      dispatch(setLocationCordLoading());
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`);
      console.log(response,'response')
      dispatch(setLocationCordSuccess(response?.data?.results[0].formatted_address));
      console.log(response?.data?.results[0].formatted_address,'adres')
    } catch (error) {
      console.log(error,'error')
      if (error.response) {
        dispatch(setLocationCordError(error.response.data?.error || "Something went wrong"));
      } else {
        dispatch(setLocationCordError(error.message));
      }
    }
  };

export default mapSlice.reducer;
