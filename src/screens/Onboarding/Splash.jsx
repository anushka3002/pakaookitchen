import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import appCheck from '@react-native-firebase/app-check';

const Splash = ({ navigation }) => {

   async function getAppCheckToken() {
      try {
        const token = await appCheck().getToken();
        console.log('App Check Token:', token);
        return token;
      } catch (error) {
        console.error('Error getting App Check token:', error);
      }
    }

  useEffect(() => {
    getAppCheckToken()
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
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
