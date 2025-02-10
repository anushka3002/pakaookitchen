import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_API, REACT_NATIVE_X_API_KEY } from '@env';

// Initial state
const initialState = {
  user: {
    data: null,
    loading: false,
    error: null,
  },
  otp: {
    otpSent: false,
    loading: false,
    error: null,
  },
};

// Create a slice for user & OTP
export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // User Reducers
    setUserLoading: (state) => {
      state.user.loading = true;
    },
    setUserData: (state, action) => {
      state.user.data = action.payload;
      state.user.loading = false;
    },
    setUserError: (state, action) => {
      state.user.error = action.payload;
      state.user.loading = false;
    },

    // OTP Reducers
    setOtpLoading: (state) => {
      state.otp.loading = true;
    },
    setOtpSuccess: (state) => {
      state.otp.otpSent = true;
      state.otp.loading = false;
    },
    setOtpError: (state, action) => {
      state.otp.error = action.payload;
      state.otp.loading = false;
    },
  },
});

// Actions
export const { setUserLoading, setUserData, setUserError, setOtpLoading, setOtpSuccess, setOtpError } = authSlice.actions;

export const fetchUserData = (phone) => async (dispatch) => {
    dispatch(setUserLoading());
    const data = {
        "mobile_number": phone,
        "country_code": 91
    }
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczODA4MzEzOSwiZXhwIjoxNzQzMjY3MTM5fQ.dPsxuI8o_kwTllz1WzQqcXhnY6Tgo_Oms8eRIQdwKjM',
    };
    try {
        const response = await axios.post(`${REACT_NATIVE_API}/auth/generateOtp`, data,{headers});
        dispatch(setUserData(response.data));
    } catch (error) {
        dispatch(setUserError(error.message));
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch(setOtpLoading());
    let token = await EncryptedStorage.getItem('fcm');
    const data = {
        "mobile_number": userData.phone,
        "country_code": 91,
        "otp": userData.otp,
        "fcm_token": token
    }
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczODkyNDAzMiwiZXhwIjoxNzQ0MTA4MDMyfQ.AS0UiJSxsF9fp6NfLSWXYCvmCJDRQUQDIqTOEEf7YYs',
    };
    try {
        const response = await axios.post(`${REACT_NATIVE_API}/auth/validateOtp`, data,{headers});
        dispatch(setOtpSuccess(response.data));
        EncryptedStorage.setItem('auth_token',JSON.stringify(response?.data?.data?.data?.auth_token))
    } catch (error) {
        dispatch(setOtpError(error.message));
    }
};

export default authSlice.reducer;
