import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_NATIVE_API, REACT_NATIVE_ORDER_API, REACT_NATIVE_X_API_KEY } from '@env';
import EncryptedStorage from 'react-native-encrypted-storage';

// Initial state
const initialState = {
  orderData: {
    data: null,
  },
  orderDetails: {
    data: null,
  },
  viewOrderInfo: {
    data: null
  },
  riderData: {
    data: null
  },
  assignRider: {
    data: null
  },
  feedbackData: {
    data: null
  },
  orderStatus: {
    data: null
  },
  loading: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

    setOrderDataLoading: (state) => {
      state.loading = true;
    },
    setOrderData: (state, action) => {
      state.orderData.data = action.payload;
      state.loading = false;
    },
    setOrderDataError: (state, action) => {
      state.loading = false;
      state.orderData.data = action.payload;
    },

    setOrderDetailsLoading: (state) => {
      state.loading = true;
    },
    setOrderDetailsData: (state, action) => {
      state.orderDetails.data = action.payload;
      state.loading = false;
    },
    setOrderDetailsError: (state, action) => {
      state.loading = false;
      state.orderDetails.data = action.payload;
    },

    setViewOrderInfoLoading: (state) => {
      state.loading = true;
    },
    setViewOrderInfoData: (state, action) => {
      state.viewOrderInfo.data = action.payload;
      state.loading = false;
    },
    setViewOrderInfoError: (state, action) => {
      state.loading = false;
      state.viewOrderInfo.data = action.payload;
    },

    setRiderLoading: (state) => {
      state.loading = true;
    },
    setRiderData: (state, action) => {
      state.riderData.data = action.payload;
      state.loading = false;
    },
    setRiderError: (state, action) => {
      state.loading = false;
      state.riderData.data = action.payload;
    },

    setAssignRiderLoading: (state) => {
      state.loading = true;
    },
    setAssignRiderData: (state, action) => {
      state.assignRider.data = action.payload;
      state.loading = false;
    },
    setAssignRiderError: (state, action) => {
      state.loading = false;
      state.assignRider.data = action.payload;
    },

    setFeedbackLoading: (state) => {
      state.loading = true;
    },
    setFeedbackData: (state, action) => {
      state.feedbackData.data = action.payload;
      state.loading = false;
    },
    setFeedbackError: (state, action) => {
      state.loading = false;
      state.feedbackData.data = action.payload;
    },

    setOrderStatusLoading: (state) => {
      state.loading = true;
    },
    setOrderStatusData: (state, action) => {
      state.orderStatus.data = action.payload;
      state.loading = false;
    },
    setOrderStatusError: (state, action) => {
      state.loading = false;
      state.orderStatus.data = action.payload;
    },
  },
});

// Actions
export const { setOrderData, setOrderDataError, setOrderDataLoading,
  setOrderDetailsData, setOrderDetailsError, setOrderDetailsLoading,
  setViewOrderInfoData, setViewOrderInfoError, setViewOrderInfoLoading,
  setRiderData, setRiderError, setRiderLoading, setAssignRiderData, 
  setAssignRiderError, setAssignRiderLoading, setFeedbackData, setFeedbackError,
  setFeedbackLoading, setOrderStatusData, setOrderStatusError, setOrderStatusLoading
 } = orderSlice.actions;

export const getOrderData = (status) => async (dispatch) => {
  try {
    dispatch(setOrderDataLoading());
    const authToken = await EncryptedStorage.getItem('auth_token')
    const public_key = await EncryptedStorage.getItem('public_key')
    
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken
    };
    const response = await axios.get(`${REACT_NATIVE_ORDER_API}/orders/order_info?orderStatus=${status}&page=1&limit=10`, { headers });
    dispatch(setOrderData(response?.data));
  } catch (error) {
    if (error.response) {
      dispatch(setOrderDataError(error.response.data.error));
    } else {
      dispatch(setOrderDataError(error.message));
    }
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(setOrderDetailsLoading());
    const authToken = await EncryptedStorage.getItem('auth_token')
    const public_key = await EncryptedStorage.getItem('public_key')
    
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken
    };
    const response = await axios.get(`${REACT_NATIVE_ORDER_API}/orders/ongoing_order?order_id=${id}`, { headers });
    dispatch(setOrderDetailsData(response?.data));
  } catch (error) {
    if (error.response) {
      dispatch(setOrderDetailsError(error.response.data.error));
    } else {
      dispatch(setOrderDetailsError(error.message));
    }
  }
};

export const getOrderInfo = (id) => async (dispatch) => {
  try {
    dispatch(setViewOrderInfoLoading());
    const authToken = await EncryptedStorage.getItem('auth_token')
    const public_key = await EncryptedStorage.getItem('public_key')
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken
    };
    const response = await axios.get(`${REACT_NATIVE_ORDER_API}/orders/view_order_info?kitchen_order_id=${id}`, { headers });
    dispatch(setViewOrderInfoData(response?.data));
  } catch (error) {
    if (error.response) {
      dispatch(setViewOrderInfoError(error.response.data.error));
    } else {
      dispatch(setViewOrderInfoError(error.message));
    }
  }
};

export const getRiderData = () => async (dispatch) => {
  try {
    dispatch(setRiderLoading());
    const authToken = await EncryptedStorage.getItem('auth_token')
    const public_key = await EncryptedStorage.getItem('public_key')
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken
    };
    const response = await axios.get(`${REACT_NATIVE_API}/profile/kitchen/all_rider`, { headers });
    dispatch(setRiderData(response?.data));
  } catch (error) {
    if (error.response) {
      dispatch(setRiderError(error.response.data.error));
    } else {
      dispatch(setRiderError(error.message));
    }
  }
};

export const assignRiderData = (data) => async (dispatch) => {
  try {
    dispatch(setAssignRiderLoading());
    const authToken = await EncryptedStorage.getItem('auth_token')
    const public_key = await EncryptedStorage.getItem('public_key')
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken
    };
    const response = await axios.put(`${REACT_NATIVE_ORDER_API}/orders/assign_rider`, data, { headers });
    dispatch(setAssignRiderData(response?.data));
  } catch (error) {
    if (error.response) {
      dispatch(setAssignRiderError(error.response.data.error));
    } else {
      dispatch(setAssignRiderError(error.message));
    }
  }
};

export const getFeedbackData = (id) => async (dispatch) => {
  try {
    dispatch(setFeedbackLoading());
    const authToken = await EncryptedStorage.getItem('auth_token')
    const public_key = await EncryptedStorage.getItem('public_key')
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken
    };
    const response = await axios.get(`${REACT_NATIVE_ORDER_API}/orders/order_feedback?page=1&limit=5&kitchen_order_id=${id}`, { headers });
    dispatch(setFeedbackData(response?.data));
  } catch (error) {
    if (error.response) {
      dispatch(setFeedbackError(error.response.data.error));
    } else {
      dispatch(setFeedbackError(error.message));
    }
  }
};

export const updateOrderStatus = (data) => async (dispatch) => {
  try {
    dispatch(setOrderStatusLoading());
    const authToken = await EncryptedStorage.getItem('auth_token')
    const public_key = await EncryptedStorage.getItem('public_key')
    const headers = {
        'x-api-key': REACT_NATIVE_X_API_KEY,
        'x-public-key': public_key,
        'x-auth-key': authToken
    };
    const response = await axios.put(`${REACT_NATIVE_ORDER_API}/orders/order_status`, data, { headers });
    dispatch(setOrderStatusData(response?.data));
  } catch (error) {
    if (error.response) {
      dispatch(setOrderStatusError(error.response.data.error));
    } else {
      dispatch(setOrderStatusError(error.message));
    }
  }
};

export default orderSlice.reducer;