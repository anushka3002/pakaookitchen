import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "./global.css";
import PendingScreen from './src/screens/ApplicationStatus/Pending';
import ApprovedScreen from './src/screens/ApplicationStatus/Approved';
import RejectedScreen from './src/screens/ApplicationStatus/Rejected';
import LoginScreen from './src/screens/Onboarding/Login';
import LoginOTP from './src/screens/Onboarding/LoginOTP';
import CreateAccount from './src/screens/Onboarding/CreateAccount';
import AddKitchen from './src/screens/Onboarding/AddKitchen';
import Dashboard from './src/screens/Home/Dashboard';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getKitchenStatus } from "./src/reducers/kitchenSlice";
import SplashScreen from 'react-native-splash-screen';
import AddPlan from "./src/screens/Home/Plan/AddPlan";
import Plan from "./src/screens/Home/Plan/Plan";
import PlanStepper from "./src/screens/Home/Plan/PlanStepper";
import { getPublicKey } from "./src/reducers/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlanDetails from "./src/screens/Home/Plan/PlanDetails";
import Order from "./src/screens/Home/Order/Order";
import OrderManagement from "./src/screens/Home/Order/OrderManagement";
import OrderRating from "./src/screens/Home/Order/OrderRating";
import OrderDetails from "./src/screens/Home/Order/OrderDetails";
import Profile from "./src/screens/Home/Profile/Profile";
import FAQ from "./src/screens/Home/Profile/FAQ";
import TermsConditions from "./src/screens/Home/Profile/TermsConditions";
import InactiveHome from './src/assets/black-home'
import InactiveOrder from './src/assets/black-order'
import InactiveInvoice from './src/assets/black-invoice'
import InactiveProfile from './src/assets/black-profile'
import ActiveHome from './src/assets/active-home'
import ActiveOrder from './src/assets/active-order'
import ActiveInvoice from './src/assets/active-invoice'
import ActiveProfile from './src/assets/active-profile'
import { Text, View } from "react-native";
import Notification from "./src/screens/Home/Profile/Notification";
import Payouts from "./src/screens/Home/Payouts";
import CurrentCycle from "./src/screens/Home/CurrentCycle";
import ContactUs from "./src/screens/Home/Profile/ContactUs";
import Rider from "./src/screens/Home/Profile/Rider";
import AddRider from "./src/screens/Home/Profile/AddRider";
import LottieView from "lottie-react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PayoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Payouts" component={Payouts} />
      <Stack.Screen name="CurrentCycle" component={CurrentCycle} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2650D8",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 10, boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' },
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          let label;

          switch (route.name) {
            case "Dashboard":
              IconComponent = focused ? ActiveHome : InactiveHome;
              label = "Dashboard";
              break;
            case "Order":
              IconComponent = focused ? ActiveOrder : InactiveOrder;
              label = "Order";
              break;
            case "PayoutStack":
              IconComponent = focused ? ActiveInvoice : InactiveInvoice;
              label = "PayoutStack";
              break;
            case "Profile":
              IconComponent = focused ? ActiveProfile : InactiveProfile;
              label = "Profile";
              break;
            default:
              IconComponent = InactiveHome;
              label = "";
          }

          return (
            <View className="items-center flex-row" style={{ gap: 5 }}>
              <IconComponent />
              {focused && <Text className={`poppins-regular text-[16px] txt-blue`}>
                {label}
              </Text>}
            </View>
          );
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="PayoutStack" component={PayoutStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function RootStack({ initialRoute }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabs}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginOTP" component={LoginOTP} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Pending" component={PendingScreen} />
      <Stack.Screen name="Approved" component={ApprovedScreen} />
      <Stack.Screen name="Rejected" component={RejectedScreen} />
      <Stack.Screen name="AddKitchen" component={AddKitchen} />
      <Stack.Screen name="AddPlan" component={AddPlan} />
      <Stack.Screen name="Plan" component={Plan} />
      <Stack.Screen name="PlanStepper" component={PlanStepper} />
      <Stack.Screen name="PlanDetails" component={PlanDetails} />
      <Stack.Screen name="OrderManagement" component={OrderManagement} />
      <Stack.Screen name="OrderRating" component={OrderRating} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="CurrentCycle" component={CurrentCycle} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Rider" component={Rider} />
      <Stack.Screen name="AddRider" component={AddRider} />
    </Stack.Navigator>
  );
}

function AppWrapper() {
  const dispatch = useDispatch();
  const kitchenStatus = useSelector(state => state.kitchenData?.kitchenStatus);
  const { logout, loading, auth_token } = useSelector(state => state.auth)
  const {loading: kitchenLoading} = useSelector(state => state.kitchenData)
  const {loading: orderLoading} = useSelector(state => state.order)
  const {loading: planLoading} = useSelector(state => state.plan)
  const {loading: profileLoading} = useSelector(state => state.profileData)

  const [initialRoute, setInitialRoute] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [storedKitchenStatus, setStoredKitchenStatus] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    dispatch(getPublicKey());
    const fetchInitialRoute = async () => {
      try {
        const token = await EncryptedStorage.getItem('auth_token');
        setAuthToken(token);
        if (!token) {
          setInitialRoute("Login");
        } else {
          dispatch(getKitchenStatus());
        }
      } catch (error) {
        setInitialRoute("Login");
      }
    };
    fetchInitialRoute();
  }, [dispatch, logout]);

  useEffect(() => {
    const fetchKitchenStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('kitchenApproved');
        setStoredKitchenStatus(status);
      } catch (error) {
        console.error("Error retrieving kitchen status", error);
      }
    };
    fetchKitchenStatus();
  }, []);

  useEffect(() => {
    if (authToken !== null) {
      if (kitchenStatus?.data?.data?.status === null) {
        setInitialRoute("CreateAccount");
      } else if (kitchenStatus?.data?.data?.status === 'pending') {
        setInitialRoute("Pending");
      } else if (kitchenStatus?.data?.data?.status === 'approved') {
        if (kitchenStatus?.data?.data?.kitchen_added) {
          setInitialRoute('Home')
        } else if (!kitchenStatus?.data?.data?.kitchen_added) {
          setInitialRoute("AddKitchen");
        }else{
        setInitialRoute('Approved')
        }
      } else if (kitchenStatus?.data?.data?.status === 'rejected') {
        setInitialRoute("Rejected");
      }
    }
    setInitialLoading(false)
  }, [authToken]);

  useEffect(() => {
    if (!loading && initialRoute !== null) {
      SplashScreen.hide();
    }
  }, [initialLoading, initialRoute]);

  if (loading || initialRoute == null) 
  return <View className="items-center justify-center h-screen">
    <LottieView
      source={require("./src/assets/Loader.json")}
      autoPlay
      loop
      style={{ width: 150, height: 150 }}
    />
  </View>

  return <>{initialRoute && <RootStack initialRoute={initialRoute} />}</>
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
