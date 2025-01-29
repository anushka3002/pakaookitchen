import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View className='justify-center'>
        <View className='flex flex-row justify-between'>
        <Image
         source={require('../../assets/left-img.png')}
          className='h-[106px] w-[114px]'
        />
        <Image
         source={require('../../assets/right-img.png')}
          className='h-[106px] w-[114px]'
        />
        </View>
      <View className='items-center mt-3'>
        <Image
         source={require('../../assets/pakaooLogo.png')}
          style={`h-[106px] w-[114px]`}
        />
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
          className='border border-gray-300 text-[16px] rounded-lg py-5 px-4 text-black'
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('LoginOTP')} className='btn-color rounded-lg py-4 mt-5'>
        <Text className='text-center text-[18px] text-white font-medium'>Login Now</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default LoginScreen;
