import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, setOtpSuccess, setUserData } from '../../reducers/authSlice';
import PakaooLogo from '../../assets/pakaoo-logo.svg';
import LeftImg from '../../assets/left-img.svg';
import RightImg from '../../assets/right-img.svg';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { user, login_loading } = useSelector(state => state.auth)
  const [authError, setAuthError] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(setUserData({ data: null }))
    dispatch(fetchUserData(phoneNumber))
    dispatch(setOtpSuccess({ data: null }))
  };
  useEffect(() => {
    if (user?.data?.data?.message == 'success') {
      setAuthError('')
      navigation.navigate('LoginOTP', { phone: phoneNumber });
    } else {
      if (typeof user?.data == 'string') {
        setAuthError(user?.data)
      }
    }
  }, [user])

  const openURL = () => {
    Linking.openURL('https://pakaoo.co/termandcondition');
  };

  return (
    <View className='justify-center'>
      <View className='flex flex-row justify-between'>
        <LeftImg />
        <RightImg />
      </View>

      <View className='items-center mt-3'>
        <PakaooLogo />
      </View>

      <View className='items-center mt-4'>
        <Text className='text-[30px] poppins-bold text-black pt-[25]'>Welcome Back</Text>
        <Text className='text-xl poppins-medium text-[#7B7B7B] mt-[10]'>Hello there, login to</Text>
      </View>

      <View className='px-5 mt-[30]'>
        <View>
          <Text className='text-[15px] poppins-medium leading-normal'>
            Phone number <Text className='text-red-500'>*</Text>
          </Text>
          <TextInput
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            className='border border-gray-300 poppins-regular leading-normal text-[16px] rounded-[10px] py-4 mt-[12] px-4 text-black'
            keyboardType="phone-pad"
          />
          {authError && <Text className='mt-1 text-[14px] text-red-500 poppins-regular'>{authError}</Text>}
        </View>

        <View className="flex-row flex-wrap mt-[14] mb-[10]">
          <Text className="text-[14px] poppins-regular text-[#2B2E35]">
            By signing up I agree to the{" "}
          </Text>
          <TouchableOpacity onPress={() => openURL()}>
            <Text className="text-[14px] poppins-regular txt-blue">Terms of use</Text>
          </TouchableOpacity>
          <Text className="text-[14px] poppins-regular text-[#2B2E35]"> and </Text>
          <TouchableOpacity onPress={() => openURL()}>
          <Text className="text-[14px] poppins-regular txt-blue">Privacy Policy.</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={phoneNumber.length !== 10}
          onPress={handleLogin}
          className={`${phoneNumber.length !== 10 ? 'btn-disabled' : 'btn-color'} py-3 justify-center rounded-xl`}
          style={{ height: 56 }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {login_loading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <Text className="text-center text-[18px] text-white poppins-medium">Login Now</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
