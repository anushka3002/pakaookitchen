import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Back from '../../assets/back.svg';

const Navbar = () => {

  const navigation = useNavigation();

  return (
    <View className="nav-bg flex-row items-center px-4 py-10">
    <TouchableOpacity onPress={() =>navigation.goBack()} className=''>
    <Back/>
    </TouchableOpacity>
    <Text className="flex-1 text-center right-4 text-[21px] poppins-bold text-black">
      Add Kitchen
    </Text>
  </View>

  )
}

export default Navbar