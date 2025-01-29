import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';

const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/SplashBg.png')} 
      style={styles.background}
      resizeMode="cover"
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
