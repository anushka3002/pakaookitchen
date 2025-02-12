import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../reducers/authSlice';
import PakaooLogo from '../../assets/pakaoo-logo.svg';
import LeftImg from '../../assets/left-img.svg';
import RightImg from '../../assets/right-img.svg';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {user} = useSelector(state => state.auth)
  const [authError, setAuthError] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(fetchUserData(phoneNumber))
  };

  useEffect(()=>{
    if(user?.data?.data?.message == 'success'){
      setAuthError('')
      navigation.navigate('LoginOTP',{phone: phoneNumber});
    }else{
      setAuthError(user?.error)
    }
  },[user])

  return (
    <View className='justify-center'>
      <View className='flex flex-row justify-between'>
        <LeftImg/>
        <RightImg/>
      </View>

      <View className='items-center mt-3'>
        <PakaooLogo/>
      </View>

      <View className='items-center mt-4 mb-8'>
        <Text className='text-[30px] font-bold text-black'>Welcome Back</Text>
        <Text className='text-xl font-medium text-[#7B7B7B] mt-2'>Hello there, login in to</Text>
      </View>

      <View className='px-5'>
        <View>
          <Text className='text-[15px] font-medium mb-3'>
            Phone number <Text className='text-red-500'>*</Text>
          </Text>
          <TextInput
            placeholder="Enter Phone Number"
            value={phoneNumber} 
            onChangeText={(text) => setPhoneNumber(text)}
            className='border border-gray-300 text-[16px] rounded-lg py-5 px-4 text-black'
            keyboardType="phone-pad"
          />
          {authError && <Text className='mt-1 text-red-500'>{authError}</Text>}
        </View>

        <TouchableOpacity disabled={phoneNumber.length !=10} onPress={handleLogin} className={`${phoneNumber.length !=10 ? 'btn-disabled' : 'btn-color'} rounded-lg py-4 mt-5`}>
          <Text className={`text-center text-[18px] text-white font-medium`}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
