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
    data: null,
    loading: false,
    error: null,
  },
};

// Create a slice for user & OTP
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // User Reducers
    setUserLoading: (state) => {
      state.user.loading = true;
    },
    setUserData: (state, action) => {
      state.user.data = action.payload;
      state.user.error = null; 
      state.user.loading = false;
    },
    setUserError: (state, action) => {
      state.user.error = action.payload;
      state.user.loading = false;
      state.user.data = null;
    },


    // OTP Reducers
    setOtpLoading: (state) => {
      state.otp.loading = true;
      state.otp.error = null;
      state.otp.data = null;
    },
    setOtpSuccess: (state, action) => {
      state.otp.data = action.payload;
      state.otp.loading = false;
    },
    setOtpError: (state, action) => {
      state.otp.error = action.payload;
      state.otp.loading = false;
      state.otp.data = null
    },
  },
});

// Actions
export const { setUserLoading, setUserData, setUserError, setOtpLoading, setOtpSuccess, setOtpError } = authSlice.actions;

export const fetchUserData = (phone) => async (dispatch) => {
  try {
    dispatch(setUserLoading());

    const data = {
      "mobile_number": phone,
      "country_code": 91
    };

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczOTE4NDUwOSwiZXhwIjoxNzQ0MzY4NTA5fQ.N13LSvZ0fpwlvz3OxrPqwP84KzXI6Cs5yuEK6BWCVW4',
    };

    const response = await axios.post(`${REACT_NATIVE_API}/auth/generateOtp`, data, { headers });

    dispatch(setUserData(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setUserError(error.response.data.error));
    } else {
      dispatch(setUserError(error.message));
    }
  }
};


export const login = (userData) => async (dispatch) => {
  try {
    dispatch(setOtpLoading());

    let fcmToken = await EncryptedStorage.getItem('fcm');

    if (fcmToken) {
      try {
        fcmToken = JSON.parse(fcmToken); 
      } catch (e) {
        console.error('FCM Token Parsing Error:', e);
      }
    }
    const data = {
      "mobile_number": Number(userData.phone),
      "country_code": 91,
      "otp": userData.otpValue,
      "fcm_token": fcmToken
    };

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoia2l0Y2hlbiIsImlhdCI6MTczOTE4NDUwOSwiZXhwIjoxNzQ0MzY4NTA5fQ.N13LSvZ0fpwlvz3OxrPqwP84KzXI6Cs5yuEK6BWCVW4',
    };
    const response = await axios.post(`${REACT_NATIVE_API}/auth/validateOtp`, data, { headers });

    dispatch(setOtpSuccess(response.data));

    await EncryptedStorage.setItem(
      'auth_token',
      response?.data?.data?.data?.auth_token
    );
  } catch (error) {
    if (error.response) {
      dispatch(setOtpError(error.response.data?.error || "Something went wrong"));
    } else {
      dispatch(setOtpError(error.message));
    }
  }
};

export default authSlice.reducer;
