import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
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
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator();

function RootStack({ initialRoute }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
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
  const kitchenStatus = useSelector(state => state.kitchenData?.kitchenStatus);
  const [initialRoute, setInitialRoute] = useState("Login");
  let authToken;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialRoute = async () => {
      try {
        authToken = await EncryptedStorage.getItem('auth_token');
        EncryptedStorage.clear('auth_token')
        let ki = await EncryptedStorage.getItem('auth_token');
        if (!authToken) {
          setInitialRoute("Login");
        } else {
          dispatch(getKitchenStatus());
        }
      } catch (error) {
        setInitialRoute("Login");
      }
    };

    fetchInitialRoute();
  }, [dispatch]);

  useEffect(()=>{
    if (authToken !== undefined) {
      SplashScreen.hide()
      }
  },[])

  useEffect(() => {
    if (kitchenStatus?.data?.data?.status !== undefined) {
      if (kitchenStatus?.data?.data?.status === null) {
        setInitialRoute("CreateAccount");
      } else if (kitchenStatus?.data?.data?.status === 'pending') {
        setInitialRoute("Pending");
      } else if (kitchenStatus?.data?.data?.status === 'approved') {
        setInitialRoute("Approved");
      } else if (kitchenStatus?.data?.data?.status === 'rejected') {
        setInitialRoute("Rejected");
      }
    }
  }, [kitchenStatus]);
  return <RootStack initialRoute={initialRoute} />;
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
