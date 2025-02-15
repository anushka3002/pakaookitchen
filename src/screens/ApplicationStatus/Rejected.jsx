import { View, Text, Image, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import Rejected from '../../assets/rejected.svg';
import HeaderImage from '../../assets/header-image.svg';

const RejectedScreen = ({navigation}) => {

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
      <HeaderImage width={'100%'}/>
      <View className='mx-auto'><Rejected/></View>
      <Text style={{ color: '#F00' }} className='text-[27px] poppins-bold mt-6'>Rejected</Text>
      <Text style={{ color: '#7B7B7B' }} className='text-center text-[18px] poppins-regular mt-5 mx-10 tracking-wide'>Your KYC document has been rejected. Please resubmit.</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccount')}
        className='py-3 btn-color w-[90%] mb-5 rounded-xl mt-12'
      >
        <Text className='text-center text-[18px] text-white poppins-medium'>Resubmit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RejectedScreen