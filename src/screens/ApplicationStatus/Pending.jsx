import { View, Text, BackHandler, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Pending from '../../assets/pending.svg';
import HeaderImage from '../../assets/header-image.svg';

const PendingScreen = () => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View className='items-center w-full justify-center'>
      <HeaderImage width={'100%'} />
      <View ><Pending /></View>
      <Text
        style={{ color: '#FFC107' }}
        className='text-[27px] text-center poppins-bold mt-6'>Pending</Text>
      <Text
        style={{ color: '#7B7B7B' }}
        className='text-center text-[18px] poppins-regular mt-5 mx-10 tracking-wide'>Your KYC document is under review. Please check back soon.</Text>
    </View>
  )
}

export default PendingScreen