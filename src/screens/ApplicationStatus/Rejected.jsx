import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const RejectedScreen = () => {
  return (
    <View style={tw`items-center w-full justify-center`}>
      <Image
        source={require('../../assets/headerImage.png')}
        style={{ width: '100%' }}
      />
      <Image
        source={require('../../assets/rejected.png')}
        style={tw`mt-3`}
      />
      <Text style={[{ color: '#F00' },tw`text-[27px] font-bold mt-6`]}>Rejected</Text>
      <Text style={[{ color: '#7B7B7B' },tw`text-center text-[18px] mt-5 mx-10 tracking-wide`]}>Your KYC document has been rejected. Please resubmit.</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccount')}
        style={tw`py-3 btn-color w-[90%] mb-5 rounded-xl mt-12`}
      >
        <Text style={tw`text-center text-[18px] text-white`}>Resubmit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RejectedScreen