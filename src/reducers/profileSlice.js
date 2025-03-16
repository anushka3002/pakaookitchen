import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_API, REACT_NATIVE_X_API_KEY, REACT_NATIVE_FOOD_API, REACT_NATIVE_PAYMENT_KEY } from '@env';

// Initial state
const initialState = {
    profile: {
        data: null
    },
    editProfile: {
        data: null
    },
    addRiderData: {
        data: null
    },
    deleteRiderData: {
        data: null
    },
    notificationData: {
        data: null
    },
    readNotificationData: {
        data:null
    },
    faqData: {
        data: null,
    },
    supportData: {
        data: null
    },
    allInfoData: {
        data: null
    },
    currentCycleData: {
        data: null
    },
    transactionsData: {
        data: null
    },
    loading: false
};

// Create a slice for Profile data
export const profileSlice = createSlice({
    name: 'profileData',
    initialState,
    reducers: {
        setProfileLoading: (state) => {
            state.loading = true;
        },
        setProfileData: (state, action) => {
            state.profile.data = action.payload;
            state.loading = false;
        },
        setProfileError: (state, action) => {
            state.loading = false;
            state.profile.data = action.payload
        },

        setEditProfileLoading: (state) => {
            state.loading = true;
            state.editProfile.data = null;
        },
        setEditProfileData: (state, action) => {
            state.editProfile.data = action.payload;
            state.loading = false;
        },
        setEditProfileError: (state, action) => {
            state.loading = false;
            state.editProfile.data = action.payload
        },

        setFaqLoading: (state) => {
            state.loading = true;
        },
        setFaqData: (state, action) => {
            state.faqData.data = action.payload;
            state.loading = false;
        },
        setFaqError: (state, action) => {
            state.faqData.data = action.payload;
            state.loading = false;
        },

        setAddRiderLoading: (state) => {
            state.loading = true;
        },
        setAddRiderData: (state, action) => {
            state.addRiderData.data = action.payload;
            state.loading = false;
        },
        setAddRiderError: (state, action) => {
            state.addRiderData.data = action.payload;
            state.loading = false;
        },

        setDeleteRiderLoading: (state) => {
            state.loading = true;
        },
        setDeleteRiderData: (state, action) => {
            state.deleteRiderData.data = action.payload;
            state.loading = false;
        },
        setDeleteRiderError: (state, action) => {
            state.deleteRiderData.data = action.payload;
            state.loading = false;
        },

        setNotificationLoading: (state) => {
            state.loading = true;
        },
        setNotificationData: (state, action) => {
            state.notificationData.data = action.payload;
            state.loading = false;
        },
        setNotificationError: (state, action) => {
            state.notificationData.data = action.payload;
            state.loading = false;
        },

        setReadNotificationLoading: (state) => {
            state.loading = true;
        },
        setReadNotificationData: (state, action) => {
            state.readNotificationData.data = action.payload;
            state.loading = false;
        },
        setReadNotificationError: (state, action) => {
            state.readNotificationData.data = action.payload;
            state.loading = false;
        },

        setSupportLoading: (state) => {
            state.loading = true;
        },
        setSupportData: (state, action) => {
            state.supportData.data = action.payload;
            state.loading = false;
        },
        setSupportError: (state, action) => {
            state.supportData.data = action.payload;
            state.loading = false;
        },

        setAllInfoLoading: (state) => {
            state.loading = true;
        },
        setAllInfoData: (state, action) => {
            state.allInfoData.data = action.payload;
            state.loading = false;
        },
        setAllInfoError: (state, action) => {
            state.allInfoData.data = action.payload;
            state.loading = false;
        },

        setCurrentCycleLoading: (state) => {
            state.loading = true;
        },
        setCurrentCycleData: (state, action) => {
            state.currentCycleData.data = action.payload;
            state.loading = false;
        },
        setCurrentCycleError: (state, action) => {
            state.currentCycleData.data = action.payload;
            state.loading = false;
        },

        setTransactionLoading: (state) => {
            state.loading = true;
        },
        setTransactionData: (state, action) => {
            state.transactionsData.data = action.payload;
            state.loading = false;
        },
        setTransactionError: (state, action) => {
            state.transactionsData.data = action.payload;
            state.loading = false;
        },
    },
}
);

// Actions
export const { setProfileData, setProfileError, setProfileLoading,
    setFaqError, setFaqLoading, setFaqData, setAddRiderData, setAddRiderError,
    setAddRiderLoading, setNotificationData, setNotificationError, setNotificationLoading,
    setReadNotificationData, setReadNotificationError, setReadNotificationLoading, setEditProfileData,
    setEditProfileError, setEditProfileLoading, setDeleteRiderData, setDeleteRiderError,
    setDeleteRiderLoading, setSupportData, setSupportError, setSupportLoading, setAllInfoData,
    setAllInfoError, setAllInfoLoading, setCurrentCycleData, setCurrentCycleError,setCurrentCycleLoading,
    setTransactionData, setTransactionError, setTransactionLoading } = profileSlice.actions;

export const getProfileData = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());

    const authToken = await EncryptedStorage.getItem('auth_token');
    const public_key = await EncryptedStorage.getItem('public_key');

    const headers = {
      'x-api-key': REACT_NATIVE_X_API_KEY,
      'x-public-key': public_key,
      'x-auth-key': authToken,
    };
    const response = await axios.get(`${REACT_NATIVE_API}/profile/kitchen/me`, { headers });
    dispatch(setProfileData(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(setProfileError(error.response.data.error));
    } else {
      dispatch(setProfileError(error.message));
    }
  }
};

export const editProfileData = (data) => async (dispatch) => {
    try {
      dispatch(setEditProfileLoading());
  
      const authToken = await EncryptedStorage.getItem('auth_token');
      const public_key = await EncryptedStorage.getItem('public_key');
  
      const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken,
      };
      const response = await axios.post(`${REACT_NATIVE_API}/profile/kitchen/edit_profile`, data, { headers });
      dispatch(setEditProfileData(response.data));
    } catch (error) {
      if (error.response) {
        dispatch(setEditProfileError(error.response.data.error));
      } else {
        dispatch(setEditProfileError(error.message));
      }
    }
  };

export const getFAQ = () => async (dispatch) => {
    try {
        dispatch(setFaqLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.get(`${REACT_NATIVE_FOOD_API}/order/faq`, { headers });
        dispatch(setFaqData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setFaqError(error.response.data.error));
        } else {
            dispatch(setFaqError(error.message));
        }
    }
};

export const addRider = (riderData) => async (dispatch) => {
    try {
        dispatch(setAddRiderLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.post(`${REACT_NATIVE_API}/profile/kitchen/add_rider`, riderData, { headers });
        dispatch(setAddRiderData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setAddRiderError(error.response.data.error));
        } else {
            dispatch(setAddRiderError(error.message));
        }
    }
};

export const deleteRider = (id) => async (dispatch) => {
    try {
        dispatch(setDeleteRiderLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };

        const riderData = {
            rider_id: id
        }

        const response = await axios.put(`${REACT_NATIVE_API}/profile/kitchen/delete_rider`, riderData, { headers });
        dispatch(setDeleteRiderData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setDeleteRiderError(error.response.data.error));
        } else {
            dispatch(setDeleteRiderError(error.message));
        }
    }
};

export const getNotification = () => async (dispatch) => {
    try {
        dispatch(setNotificationLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.get(`${REACT_NATIVE_API}/profile/kitchen/notification`, { headers });
        dispatch(setNotificationData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setNotificationError(error.response.data.error));
        } else {
            dispatch(setNotificationError(error.message));
        }
    }
};

export const readNotification = (data) => async (dispatch) => {
    try {
        dispatch(setReadNotificationLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.put(`${REACT_NATIVE_API}/profile/kitchen/mark_notification`, data, { headers });
        dispatch(setReadNotificationData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setReadNotificationError(error.response.data.error));
        } else {
            dispatch(setReadNotificationError(error.message));
        }
    }
};

export const support = (data) => async (dispatch) => {
    try {
        dispatch(setSupportLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.post(`${REACT_NATIVE_FOOD_API}/order/kitchen/support`, data, { headers });
        dispatch(setSupportData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setSupportError(error.response.data.error));
        } else {
            dispatch(setSupportError(error.message));
        }
    }
};

export const getAllInfo = () => async (dispatch) => {
    try {
        dispatch(setAllInfoLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.get(`${REACT_NATIVE_API}/profile/kitchen/all_info`, { headers });
        dispatch(setAllInfoData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setAllInfoError(error.response.data.error));
        } else {
            dispatch(setAllInfoError(error.message));
        }
    }
};

export const getCurrentCycle = () => async (dispatch) => {
    try {
        dispatch(setCurrentCycleLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.get(`${REACT_NATIVE_PAYMENT_KEY}/kitchenWallet/currentcycle`, { headers });
        dispatch(setCurrentCycleData(response.data));
    } catch (error) {
        if (error.response.data.error) {
            dispatch(setCurrentCycleError(error.response.data.error));
        } else {
            dispatch(setCurrentCycleError(error.message));
        }
    }
};

export const getTransactions = () => async (dispatch) => {
    try {
        dispatch(setTransactionLoading());
        const authToken = await EncryptedStorage.getItem('auth_token');
        const public_key = await EncryptedStorage.getItem('public_key');

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken,
        };
        const response = await axios.get(`${REACT_NATIVE_PAYMENT_KEY}/kitchenWallet/payoutList`, { headers });
        dispatch(setTransactionData(response.data));
    } catch (error) {
        if (error.response.data.error) {
            dispatch(setTransactionError(error.response.data.error));
        } else {
            dispatch(setTransactionError(error.message));
        }
    }
};

export default profileSlice.reducer;
