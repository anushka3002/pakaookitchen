import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashImg from '../../assets/Splash.svg';
import { View } from 'react-native';

const Splash = () => {

  async function getFCMToken() {
    try {
        const token = await messaging().getToken();
        EncryptedStorage.setItem('fcm', JSON.stringify(token));
    } catch (error) {
        console.error('Error getting FCM token:', error);
    }
}

  useEffect(() => {
    getFCMToken()
  }, []);

  return (
    <View className='w-[100%] border'>
    <SplashImg/>
    </View>
  );
};

export default Splash;
