import * as React from 'react';
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
import { Text, View, Image } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash}/>
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

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootStack />
      {/* <View
      style={{
        borderRadius: '15px',
        backgroundColor: '#FFF',
        boxShadow: '0 -1px 15px rgba(0, 0, 0, 0.25)',
      }}
       className='flex-row justify-between bg-white py-5 px-4'>
        <View className='items-start flex-row items-center'>
          <Image
          source={require('./src/assets/home-active.png')}
          style={{width:26,height:26}}
          />
          <Text className='txt-blue text-[16px] ml-3'>Home</Text>
        </View>
        <View className='items-start'>
          <Image
          source={require('./src/assets/order-black.png')}
          style={{width:35,height:25}}
          className='my-auto'
          />
        </View>
        <View className='items-center'>
          <Image
          source={require('./src/assets/invoice-black.png')}
          style={{width:23,height:23}}
          />
        </View>
        <View className='items-center'>
          <Image
          source={require('./src/assets/profile-black.png')}
          style={{width:28,height:28}}
          />
        </View>
      </View> */}
    </NavigationContainer>
    </Provider>
  );
}