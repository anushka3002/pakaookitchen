import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import {tw} from 'nativewind'

const LoginOTP = ({navigation}) => {

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  let phoneNumber = "+919845673489"
  let maskedPhoneNumber = phoneNumber.replace(/(\d{8})(\d{3})$/, '$1***');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    const { key } = e.nativeEvent;
    if (key === "Backspace") {
      const updatedOtp = [...otp];
      if (updatedOtp[index]) {
        updatedOtp[index] = "";
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        updatedOtp[index - 1] = ""; 
      }

      setOtp(updatedOtp);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(new Array(6).fill("")); 
    inputRefs.current[0].focus();
    console.log("Resend OTP");
  };

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
          className='h-[106px] w-[114px]'
        />
      </View>

      <View className='items-center mt-4 mb-8'>
        <Text className='text-[30px] font-bold'>OTP Verification</Text>
        <Text className='text-xl font-medium text-[#7B7B7B] mt-2'>An authentication code has been sent to</Text>
        <Text className='text-[17px] font-medium mt-2'>{maskedPhoneNumber}</Text>
      </View>

      <View className='flex-row justify-center'>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            className='w-[46px] h-[46px] rounded-xl border-2 mx-2 border-[#D6D6D6] rounded-lg text-center text-lg font-semibold text-black focus:border-blue-500'
          />
        ))}
      </View>
      <View className={`flex-row items-center justify-center mt-8 ${timer > 0 ? 'mb-4' : 'mb-9'} mb-4`}>
        <Text className='text-[16px] font-medium text-gray-600'>I didn't receive code. </Text>
        <TouchableOpacity disabled={timer > 0}
         onPress={handleResend}
         >
          <Text
            className='text-[16px] txt-blue font-medium underline ${
              timer > 0 ? "opacity-50" : "opacity-100"
            }'
          >
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
      {timer && <Text className='text-center text-[15px] font-medium mb-9'>
        {timer > 0 ? `0:${timer < 10 ? `0${timer}` : timer} Sec left` : ""}
      </Text>}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateAccount")
        }}
        className='mx-4 btn-color py-4 rounded-lg'
      >
        <Text className='text-white text-center text-[18px] font-medium'>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginOTP;
