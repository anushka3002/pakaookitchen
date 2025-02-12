import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';
import { getCategory } from '../../reducers/kitchenSlice';

const Splash = ({ navigation }) => {

  const dispatch = useDispatch()

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
    <ImageBackground
      source={require('../../assets/SplashBg.png')} 
      style={styles.background}
      resizeMode="cover"
      className='bg-white'
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/SplashLogo.png')}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
