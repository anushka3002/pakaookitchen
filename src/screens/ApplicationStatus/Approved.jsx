import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ApprovedScreen = () => {
  return (
    <View style={tw`items-center w-full justify-center`}>
      <Image
        source={require('../../assets/headerImage.png')}
        style={{ width: '100%' }}
      />
      <Image
        source={require('../../assets/approved.png')}
        style={tw`mt-3`}
      />
      <Text style={[{ color: '#05C268' },tw`text-[27px] font-bold mt-6`]}>Approved</Text>
      <Text style={[{ color: '#7B7B7B' },tw`text-center text-[18px] mt-5 mx-10 tracking-wide`]}>Your KYC document has been approved. Welcome aboard!</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccount')}
        style={tw`py-3 w-[90%] btn-color mb-5 rounded-xl mt-12`}
      >
        <Text style={tw`text-center text-[18px] text-white`}>Add Kitchen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ApprovedScreen