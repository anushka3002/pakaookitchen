import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_API, REACT_NATIVE_X_API_KEY } from '@env';
import { getKitchenStatus } from './kitchenSlice';

// Initial state
const initialState = {
  publicKey: {
    data: null,
    loading: null,
  },
  user: {
    data: null,
    loading: false,
  },
  otp: {
    data: null,
    loading: false,
  },
};

// Create a slice for user & OTP
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    //public key
    setPublicKeyLoading: (state) => {
      state.publicKey.loading = true;
    },
    setPublicKeyData: (state, action) => {
      state.publicKey.data = action.payload;
      state.publicKey.loading = false;
    },
    setPublicKeyError: (state, action) => {
      state.publicKey.loading = false;
      state.publicKey.data = action.payload;
    },

    // PublicKey Reducers
    setUserLoading: (state) => {
      state.user.loading = true;
    },
    setUserData: (state, action) => {
      state.user.data = action.payload;
      state.user.loading = false;
    },
    setUserError: (state, action) => {
      state.user.loading = false;
      state.user.data = action.payload;
    },


    // OTP Reducers
    setOtpLoading: (state) => {
      state.otp.loading = true;
      state.otp.data = null;
    },
    setOtpSuccess: (state, action) => {
      state.otp.data = action.payload;
      state.otp.loading = false;
    },
    setOtpError: (state, action) => {
      state.otp.loading = false;
      state.otp.data = action.payload
    },
  },
});

// Actions
export const { setPublicKeyLoading, setPublicKeyData, setPublicKeyError, setUserLoading, setUserData, setUserError, setOtpLoading, setOtpSuccess, setOtpError } = authSlice.actions;

export const getPublicKey = () => async (dispatch) => {
  try {
    dispatch(setPublicKeyLoading());

    const headers = {
      'x-app-check': 'asdasd',
      'x-api-key': REACT_NATIVE_X_API_KEY,
    };
    const response = await axios.get(`${REACT_NATIVE_API}/auth/generatePublickToken`, { headers });
    await EncryptedStorage.setItem(
      'public_key',
      response?.data?.data?.public_key
    );
    dispatch(setPublicKeyData(response?.data?.data?.public_key));
  } catch (error) {
    if (error.response) {
      dispatch(setPublicKeyError(error.response.data.error));
    } else {
      dispatch(setPublicKeyError(error.message));
    }
  }
};


export const fetchUserData = (phone) => async (dispatch) => {
  try {
    dispatch(setUserLoading());
    let public_key = await EncryptedStorage.getItem('public_key');

    const data = {
      "mobile_number": phone,
      "country_code": 91
    };

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key
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
    let public_key = await EncryptedStorage.getItem('public_key');

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
      'x-public-key': public_key
    };
    const response = await axios.post(`${REACT_NATIVE_API}/auth/validateOtp`, data, { headers });

    dispatch(setOtpSuccess(response.data));

    await EncryptedStorage.setItem(
      'auth_token',
      response?.data?.data?.data?.auth_token
    );
    dispatch(getKitchenStatus())
  } catch (error) {
    if (error.response) {
      dispatch(setOtpError(error.response.data?.error || "Something went wrong"));
    } else {
      dispatch(setOtpError(error.message));
    }
  }
};

export default authSlice.reducer;
