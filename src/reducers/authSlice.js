import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_API, REACT_NATIVE_X_API_KEY } from '@env';
import { getKitchenStatus } from './kitchenSlice';

const initialState = {
  publicKey: {
    data: null
  },
  user: {
    data: null
  },
  otp: {
    data: null
  },
  auth_token: null,
  deleteReasons: {
    data: null
  },
  deleteProfile: {
    data: null
  },
  logout: {
    data: null
  },
  loading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

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

    setUserLoading: (state) => {
      state.user.loading = true;
    },
    setUserData: (state, action) => {
      state.user.data = action.payload;
      state.loading = false;
    },
    setUserError: (state, action) => {
      state.loading = false;
      state.user.data = action.payload;
    },

    setOtpLoading: (state) => {
      state.loading = true;
      state.otp.data = null;
    },
    setOtpSuccess: (state, action) => {
      state.otp.data = action.payload;
      state.loading = false;
    },
    setAuthToken: (state, action) => {
      state.auth_token = action.payload
    },
    setOtpError: (state, action) => {
      state.loading = false;
      state.otp.data = action.payload
    },

    setDeleteReasonsLoading: (state) => {
      state.loading = true;
    },
    setDeleteReasonsData: (state, action) => {
      state.deleteReasons.data = action.payload;
      state.loading = false;
    },
    setDeleteReasonsError: (state, action) => {
      state.loading = false;
      state.deleteReasons.data = action.payload
    },

    setDeleteProfileLoading: (state) => {
      state.loading = true;
      state.deleteProfile.data = null;
    },
    setDeleteProfileData: (state, action) => {
      state.deleteProfile.data = action.payload;
      state.loading = false;
    },
    setDeleteProfileError: (state, action) => {
      state.loading = false;
      state.deleteProfile.data = action.payload
    },

    setLogoutLoading: (state) => {
      state.loading = true;
      state.logout.data = null;
    },
    setLogoutData: (state, action) => {
      state.logout.data = action.payload;
      state.loading = false;
    },
    setLogoutError: (state, action) => {
      state.loading = false;
      state.logout.data = action.payload
    },
  },
});

// Actions
export const { setPublicKeyLoading, setPublicKeyData, setPublicKeyError, setUserLoading,
  setUserData, setUserError, setOtpLoading, setOtpSuccess, setOtpError,
  setProfileError, setProfileLoading, setProfileData, setDeleteReasonsData,
  setDeleteReasonsError, setDeleteReasonsLoading, setDeleteProfileData,
  setDeleteProfileError, setDeleteProfileLoading, setLogoutLoading, setLogoutData, 
  setLogoutError, setAuthToken } = authSlice.actions;

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
    dispatch(setAuthToken(response?.data?.data?.data?.auth_token))

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

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLogoutLoading());
    EncryptedStorage.removeItem('public_key');
    EncryptedStorage.removeItem('auth_token');
    dispatch(setLogoutData('Logged out'));
  } catch (error) {
    if (error) {
      dispatch(setLogoutError(error));
    } 
  }
};

export const getDeleteReasons = () => async (dispatch) => {
  try {
    dispatch(setDeleteReasonsLoading());

    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
    };
    const response = await axios.get(`${REACT_NATIVE_API}/profile/customer/delete_reason`, { headers });
    dispatch(setDeleteReasonsData(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setDeleteReasonsError(error.response.data.error));
    } else {
      dispatch(setDeleteReasonsError(error.message));
    }
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch(setDeleteProfileLoading());

    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
    };
    const response = await axios.get(`${REACT_NATIVE_API}/profile/customer/delete_account?deleted_reason_id=${id}`, { headers });
    dispatch(setDeleteProfileData(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setDeleteProfileError(error.response.data.error));
    } else {
      dispatch(setDeleteProfileError(error.message));
    }
  }
};

export default authSlice.reducer;
