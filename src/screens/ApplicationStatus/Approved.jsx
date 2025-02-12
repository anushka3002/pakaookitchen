import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Approved from '../../assets/approved.svg';
import HeaderImage from '../../assets/header-image.svg';


const ApprovedScreen = () => {
  return (
    <View className='items-center w-full justify-center'>
      <HeaderImage width={'100%'}/>
      <View className='mx-auto'><Approved/></View>
      <Text style={{ color: '#05C268' }} className='text-[27px] font-bold mt-6'>Approved</Text>
      <Text style={{ color: '#7B7B7B' }} className='text-center text-[18px] mt-5 mx-10 tracking-wide'>Your KYC document has been approved. Welcome aboard!</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddKitchen')}
        className='py-3 w-[90%] btn-color mb-5 rounded-xl mt-12'
      >
        <Text className='text-center text-[18px] text-white'>Add Kitchen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ApprovedScreen