import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, login, setUserData } from '../../reducers/authSlice';
import Otp from '../../assets/otp.svg';
import LeftImg from '../../assets/left-img.svg';
import RightImg from '../../assets/right-img.svg';
import { getCategory, getKitchenStatus } from '../../reducers/kitchenSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginOTP = ({ navigation, route }) => {

  const { user, otp } = useSelector(state => state.auth)
  const { kitchenStatus } = useSelector(state => state.kitchenData)
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [storedKitchenStatus, setStoredKitchenStatus] = useState(null);
  const [timer, setTimer] = useState(60);
  const [otpError, setOtpError] = useState('')
  const inputRefs = useRef([]);
  const { phone } = route.params;
  let phoneNumber = `+91${phone}`
  let maskedPhoneNumber = phoneNumber.replace(/(\d{8})(\d{3})$/, '$1***');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value, index) => {
    const updatedOtp = [...otpValue];
    updatedOtp[index] = value;
    setOtpValue(updatedOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    const { key } = e.nativeEvent;
    if (key === "Backspace") {
      const updatedOtp = [...otpValue];
      if (updatedOtp[index]) {
        updatedOtp[index] = "";
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        updatedOtp[index - 1] = "";
      }
      setOtpValue(updatedOtp);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setOtpValue(new Array(6).fill(""));
    inputRefs.current[0].focus();
    dispatch(fetchUserData(phone))
  };
  const dispatch = useDispatch()

  const handleLogin = () => {
    const userData = {
      "phone": phone,
      "otpValue": Number(otpValue.join(''))
    }
    dispatch(login(userData))
    dispatch(getCategory())
    dispatch(setUserData({ data: null, loading: false, error: null }))
  }

  useEffect(() => {
    const fetchKitchenStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('kitchenApproved');
        setStoredKitchenStatus(status);
      } catch (error) {
        console.error('Error retrieving kitchen status', error);
      }
    };

    fetchKitchenStatus();
  }, []);

  useEffect(() => {
    if (otp?.data?.success == true) {
      setOtpError('')
      if (otp?.data?.data?.data?.new_user == true) {
        navigation.replace('CreateAccount', { phone: phoneNumber });
      } else if (kitchenStatus?.data?.data?.status == 'pending') {
        navigation.replace('Pending')
      } else if (kitchenStatus?.data?.data?.status == 'approved') {
        if (storedKitchenStatus == 'kitchenApproved') {
          if (kitchenStatus?.data?.data?.kitchen_added == true) {
            navigation.replace('Dashboard')
          }else{
            navigation.replace("AddKitchen");
          }
        } else{
          navigation.replace('Dashboard')
        }
      } else if (kitchenStatus?.data?.data?.status == 'rejected') {
        navigation.replace('Rejected')
      }
    } else if (otp?.error) {
      setOtpError(otp?.error)
    }
  }, [otp, kitchenStatus, storedKitchenStatus])

  useEffect(() => {
    dispatch(getKitchenStatus())
  }, [dispatch])

  return (
    <View className='justify-center'>
      <View className='flex flex-row justify-between'>
        <LeftImg />
        <RightImg />
      </View>
      <View className='items-center mt-3'>
        <Otp />
      </View>

      <View className='items-center mt-4 mb-8'>
        <Text className='text-[30px] poppins-bold'>OTP Verification</Text>
        <Text className='text-xl poppins-medium text-[#7B7B7B] mt-2 text-center'>An authentication code has been sent to</Text>
        <Text className='text-[17px] poppins-medium mt-2'>{maskedPhoneNumber}</Text>
      </View>

      <View className="flex-row h-[46px] justify-center items-center">
        {otpValue.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            className="w-[46px] mx-2 h-[46px] rounded-[10px] border-[2px] border-[#D6D6D6] 
            text-center text-lg poppins-semibold text-black focus:border-blue-500 
            leading-none"
          />
        ))}
      </View>

      {/* {otpError && <View className='px-4'><Text className='px-4 mt-2 text-[12px] poppins-regular text-red-500'>{otpError}</Text></View>} */}
      <View className={`flex-row items-center justify-center mt-8 ${timer > 0 ? 'mb-4' : 'mb-9'} mb-4`}>
        <Text className='text-[16px] poppins-medium text-gray-600'>I didn't receive code. </Text>
        <TouchableOpacity disabled={timer > 0}
          onPress={handleResend}
        >
          <Text
            className='text-[16px] txt-blue poppins-medium underline ${
              timer > 0 ? "opacity-50" : "opacity-100"
            }'
          >
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
      {timer && <Text className='text-center text-[15px] poppins-medium mb-9'>
        {timer > 0 ? `0:${timer < 10 ? `0${timer}` : timer} Sec left` : ""}
      </Text>}
      <TouchableOpacity
        disabled={!otpValue.every(digit => digit !== "" && /^\d$/.test(digit))}
        onPress={handleLogin}
        className={`${otpValue.every(digit => digit !== "" && /^\d$/.test(digit)) ? 'btn-color' : 'btn-disabled'} mx-4 py-3 rounded-xl mt-5`}
        style={{ height: 56 }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {otp?.loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Text className="text-center text-[18px] text-white poppins-medium">Submit</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginOTP;
