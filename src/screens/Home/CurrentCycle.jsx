import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Navbar from '../Components/Navbar'
import LinearGradient from 'react-native-linear-gradient'

const CurrentCycle = () => {
    return (
        <View className='bg-white h-screen'>
            <Navbar screen={'Current cycle'} />
            <View className='px-[15]'>
                {false ? <Text className='text-[16px] poppins-medium text-[#737373] text-center'>Pay out is not available</Text> : <LinearGradient
                    colors={['#2650D8', '#2D479D']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 1 }}
                    style={{borderRadius:16}}
                    className="w-full px-[18] pt-[19] pb-[26] mt-[24]"
                >
                    <View className='flex-row justify-between'>
                        <Text className='text-[14px] poppins-semibold text-white'>Payout Summary</Text>
                        <Text className='text-[14px] poppins-medium text-white'>03 Mar - 09 Mar, 25</Text>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor:'#FFF'}} className='mt-[14] mb-[16]'></View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Total Order Value</Text>
                        <Text className='text-[12px] poppins-bold text-white'>₹ 10,000</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Pakaoo Commission (20%)</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ 1,905</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>GST on Commission (18%)</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ 1,905</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Refund Hold (30%)</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ 1,905</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Immediate Payout to Vendor</Text>
                        <Text className='text-[12px] poppins-bold text-[#4DE56F]'>₹ 1,905</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Refund Deducted from Hold</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ 1,905</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Final Hold Amount Released</Text>
                        <Text className='text-[12px] poppins-bold text-[#4DE56F]'>₹ 1,905</Text>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor:'#FFF'}} className='mt-[14] mb-[16]'></View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Total Final Vendor Payout</Text>
                        <Text className='text-[12px] poppins-bold text-white'>₹ 7,452</Text>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor:'#FFF'}} className='mt-[14]'></View>
                </LinearGradient>}
            </View>
        </View>
    )
}

export default CurrentCycle