import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Back from '../../assets/back.svg';

const Navbar = ({screen, noBackArrow}) => {

  const navigation = useNavigation();

  return (
    <View className="nav-bg flex-row items-center px-4 py-10">
    {!noBackArrow && <TouchableOpacity onPress={() =>navigation.goBack()} className=''>
    <Back/>
    </TouchableOpacity>}
    <Text className={`flex-1 text-center ${noBackArrow ? '' : 'right-4'} text-[21px] poppins-bold text-black`}>
      {screen}
    </Text>
  </View>

  )
}

export default Navbar