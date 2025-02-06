import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Navbar = ({screen}) => {

  const navigation = useNavigation();

  return (
    <View className="nav-bg flex-row items-center px-4 py-10">
    <TouchableOpacity onPress={() =>navigation.goBack()} className=''>
    <Image
        source={require('../../assets/back.png')}
        />
    </TouchableOpacity>
    <Text className="flex-1 text-center right-4 text-[21px] font-bold text-black">
      {screen}
    </Text>
  </View>

  )
}

export default Navbar