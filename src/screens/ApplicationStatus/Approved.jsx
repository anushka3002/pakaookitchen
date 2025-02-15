import { View, Text, Image, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import Approved from '../../assets/approved.svg';
import HeaderImage from '../../assets/header-image.svg';

const ApprovedScreen = ({navigation}) => {

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
      <View className='mx-auto'><Approved/></View>
      <Text style={{ color: '#05C268' }} className='text-[27px] poppins-bold mt-6'>Approved</Text>
      <Text style={{ color: '#7B7B7B' }} className='text-center poppins-regular text-[18px] mt-5 mx-10 tracking-wide'>Your KYC document has been approved. Welcome aboard!</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddKitchen')}
        className='py-3 w-[90%] btn-color mb-5 rounded-xl mt-12'
      >
        <Text className='text-center text-[18px] poppins-medium text-white'>Add Kitchen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ApprovedScreen