import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import "./global.css";
import PendingScreen from './src/screens/ApplicationStatus/Pending';
import ApprovedScreen from './src/screens/ApplicationStatus/Approved';
import RejectedScreen from './src/screens/ApplicationStatus/Rejected';
import Splash from './src/screens/Onboarding/Splash';
import LoginScreen from './src/screens/Onboarding/Login';
import LoginOTP from './src/screens/Onboarding/LoginOTP';
import CreateAccount from './src/screens/Onboarding/CreateAccount';
import AddKitchen from './src/screens/Onboarding/AddKitchen';
import Dashboard from './src/screens/Home/Dashboard';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getKitchenStatus } from "./src/reducers/kitchenSlice";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginOTP" component={LoginOTP} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Pending" component={PendingScreen} />
      <Stack.Screen name="Approved" component={ApprovedScreen} />
      <Stack.Screen name="Rejected" component={RejectedScreen} />
      <Stack.Screen name="AddKitchen" component={AddKitchen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

function AppWrapper() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const kitchenStatus = useSelector(state => state.kitchenData?.kitchenStatus);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const authToken = await EncryptedStorage.getItem('auth_token');
        if (authToken) {
          dispatch(getKitchenStatus());
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
  }, [dispatch]);

  useEffect(() => {
    if (kitchenStatus?.data?.data?.status === null) {
      navigation.navigate('CreateAccount');
    } else if (kitchenStatus?.data?.data?.status === 'pending') {
      navigation.navigate('Pending');
    } else if (kitchenStatus?.data?.data?.status === 'approved') {
      navigation.navigate('Approved');
    } else if (kitchenStatus?.data?.data?.status === 'rejected') {
      navigation.navigate('Rejected');
    }
  }, [kitchenStatus, navigation]);

  return <RootStack />;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppWrapper />
      </NavigationContainer>
    </Provider>
  );
}
