import { View, Text, Image } from 'react-native'
import React from 'react'

const PendingScreen = () => {
  return (
    <View style={tw`items-center w-full justify-center`}>
      <Image
        source={require('../../assets/headerImage.png')}
        style={{width:'100%'}}
        />
        <Image
        source={require('../../assets/pending.png')}
        style={tw`mt-3`}
        />
      <Text style={[{color:'#FFC107'},tw`text-[27px] font-bold mt-6`]}>Pending</Text>
      <Text style={[{color:'#7B7B7B'},tw`text-center text-[18px] mt-5 mx-10 tracking-wide`]}>Your KYC document is under review. Please check back soon.</Text>
    </View>
  )
}

export default PendingScreen