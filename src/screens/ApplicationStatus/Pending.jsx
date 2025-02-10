import { View, Text, Image } from 'react-native'
import React from 'react'
import Pending from '../../assets/pending.svg';
import HeaderImage from '../../assets/header-image.svg';

const PendingScreen = () => {
  return (
    <View style='items-center w-full justify-center'>
      <HeaderImage width={'100%'}/>
        <View className='mx-auto'><Pending/></View>
      <Text 
      style={{color:'#FFC107'}}
       className='text-[27px] text-center font-bold mt-6'>Pending</Text>
      <Text 
      style={{color:'#7B7B7B'}}
       className='text-center text-[18px] mt-5 mx-10 tracking-wide'>Your KYC document is under review. Please check back soon.</Text>
    </View>
  )
}

export default PendingScreen