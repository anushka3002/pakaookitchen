import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Rejected from '../../assets/rejected.svg';
import HeaderImage from '../../assets/header-image.svg';

const RejectedScreen = () => {
  return (
    <View className='items-center w-full justify-center'>
      <HeaderImage width={'100%'}/>
      <View className='mx-auto'><Rejected/></View>
      <Text style={{ color: '#F00' }} className='text-[27px] font-bold mt-6'>Rejected</Text>
      <Text style={{ color: '#7B7B7B' }} className='text-center text-[18px] mt-5 mx-10 tracking-wide'>Your KYC document has been rejected. Please resubmit.</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccount')}
        className='py-3 btn-color w-[90%] mb-5 rounded-xl mt-12'
      >
        <Text className='text-center text-[18px] text-white'>Resubmit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RejectedScreen