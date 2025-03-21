import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { REACT_NATIVE_FOOD_API, REACT_NATIVE_X_API_KEY } from '@env';

const initialState = {
    planDetails: {
        data: null,
    },
    menuDraft: {
        data: null,
    },
    addPlan: {
        data: null,
    },
    addItemDetails: {
        data: null,
    },
    submitMenuData: {
        data: null
    },
    loading: false
};

export const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlanDetailsLoading: (state) => {
            state.loading = true;
        },
        setPlanDetailsData: (state, action) => {
            state.planDetails.data = action.payload;
            state.loading = false;
        },
        setPlanDetailsError: (state, action) => {
            state.planDetails.data = action.payload;
            state.loading = false;
        },

        setMenuDraftLoading: (state) => {
            state.loading = true;
        },
        setMenuDraftData: (state, action) => {
            state.menuDraft.data = action.payload;
            state.loading = false;
        },
        setMenuDraftError: (state) => {
            state.menuDraft.data = action.payload;
            state.loading = false;
        },

        setAddPlanLoading: (state) => {
            state.loading = true;
        },
        setAddPlanData: (state, action) => {
            state.addPlan.data = action.payload;
            state.loading = false;
        },
        setAddPlanError: (state, action) => {
            state.addPlan.data = action.payload;
            state.loading = false;
        },

        setAddItemDetailsLoading: (state) => {
            state.loading = true;
        },
        setAddItemDetailsData: (state, action) => {
            state.addItemDetails.data = action.payload;
            state.loading = false;
        },
        setAddItemDetailsError: (state, action) => {
            state.addItemDetails.data = action.payload;
            state.loading = false;
        },

        setSubmitMenuLoading: (state) => {
            state.loading = true;
        },
        setSubmitMenuData: (state, action) => {
            state.submitMenuData.data = action.payload;
            state.loading = false;
        },
        setSubmitMenuError: (state, action) => {
            state.submitMenuData.data = action.payload;
            state.loading = false;
        },
    },
});

// Actions
export const { setPlanDetailsLoading, setPlanDetailsData, setPlanDetailsError, setMenuDraftLoading,
    setMenuDraftData, setMenuDraftError, setAddPlanData, setAddPlanError, setAddPlanLoading,
    setAddItemDetailsData, setAddItemDetailsError, setAddItemDetailsLoading, setSubmitMenuData,
    setSubmitMenuError, setSubmitMenuLoading } = planSlice.actions;

export const getPlanDetails = (meal) => async (dispatch) => {
    try {
        dispatch(setPlanDetailsLoading());

        const authToken = await EncryptedStorage.getItem('auth_token')
        const public_key = await EncryptedStorage.getItem('public_key')

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken
        };

        const response = await axios.get(`${REACT_NATIVE_FOOD_API}/kitchen/plan_detail?meal=${meal}`, { headers });
        dispatch(setPlanDetailsData(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setPlanDetailsError(error.response.data.error));
        } else {
            dispatch(setPlanDetailsError(error.message));
        }
    }
};

export const getMenuDraft = (id, veg, nveg, edit, navigation, elm, ind) => async (dispatch) => {
    try {
        dispatch(setMenuDraftLoading());

        const authToken = await EncryptedStorage.getItem('auth_token')
        const public_key = await EncryptedStorage.getItem('public_key')

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken
        };
        const response = await axios.get(`${REACT_NATIVE_FOOD_API}/kitchen/plan_draft?planId=${id}&veg=${veg}&nveg=${nveg}&menu_editing=${edit}`, { headers });
        dispatch(setMenuDraftData(response?.data))
        if (elm.status == 'approved') {
            navigation.navigate('PlanDetails', { planData: elm, ind: ind, editMenu: 1 })
        } else{
            if (elm.stepper) {
                navigation.navigate('PlanStepper', { planId: id, planData: elm, ind: ind, edit: 1  })
            } else {
                navigation.navigate('PlanDetails', { planData: elm, ind: ind})
            }
        } 
    } catch (error) {
        if (error.response) {
            dispatch(setMenuDraftError(error.response.data.error));
        } else {
            dispatch(setMenuDraftError(error.message));
        }
    }
};

export const addPlanDetails = (data, navigation) => async (dispatch) => {
    try {
        dispatch(setAddPlanLoading());

        const authToken = await EncryptedStorage.getItem('auth_token')
        const public_key = await EncryptedStorage.getItem('public_key')

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken
        };

        const response = await axios.post(`${REACT_NATIVE_FOOD_API}/kitchen/add_plan`, data, { headers });
        dispatch(setAddPlanData(response.data));
        dispatch(getPlanDetails(null))
        navigation.navigate('PlanStepper', { planId: response.data.data.planId })
    } catch (error) {
        if (error.response) {
            dispatch(setAddPlanError(error.response.data.error));
        } else {
            dispatch(setAddPlanError(error.message));
        }
    }
};

export const addFoodDetails = (data) => async (dispatch) => {
    try {
        dispatch(setAddItemDetailsLoading());

        const authToken = await EncryptedStorage.getItem('auth_token')
        const public_key = await EncryptedStorage.getItem('public_key')

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken
        };
        const response = await axios.post(`${REACT_NATIVE_FOOD_API}/kitchen/add_item`, data, { headers });
        dispatch(setAddItemDetailsLoading(response.data));
    } catch (error) {
        if (error.response) {
            dispatch(setAddItemDetailsError(error.response.data.error));
        } else {
            dispatch(setAddItemDetailsError(error.message));
        }
    }
};

export const submitMenu = (menu, navigation) => async (dispatch) => {
    try {
        dispatch(setSubmitMenuLoading());

        const authToken = await EncryptedStorage.getItem('auth_token')
        const public_key = await EncryptedStorage.getItem('public_key')

        const headers = {
            'x-api-key': REACT_NATIVE_X_API_KEY,
            'x-public-key': public_key,
            'x-auth-key': authToken
        };

        const response = await axios.put(`${REACT_NATIVE_FOOD_API}/kitchen/submit_menu`, menu, { headers });
        dispatch(setSubmitMenuData(response.data));
        navigation.navigate('Plan')
    } catch (error) {
        if (error.response) {
            dispatch(setSubmitMenuError(error.response.data.error));
        } else {
            dispatch(setSubmitMenuError(error.message));
        }
    }
};

export default planSlice.reducer;
