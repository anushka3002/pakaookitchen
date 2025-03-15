import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentCycle } from '../../reducers/profileSlice'

const CurrentCycle = () => {

    const dispatch = useDispatch()
    const {currentCycleData} = useSelector(state => state.profileData)

    useEffect(()=>{
        dispatch(getCurrentCycle())
    },[])

    return (
        <View className='bg-white h-screen'>
            <Navbar screen={'Current cycle'} />
            <View className='px-[15]'>
                {currentCycleData.data.data.length == 0 ? <Text className='text-[16px] poppins-medium text-[#737373] text-center mt-[236]'>Pay out is not available</Text> : 
                <LinearGradient
                    colors={['#2650D8', '#2D479D']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 1 }}
                    style={{borderRadius:16}}
                    className="w-full px-[18] pt-[19] pb-[26] mt-[24]"
                >
                    <View className='flex-row justify-between'>
                        <Text className='text-[14px] poppins-semibold text-white'>Payout Summary</Text>
                        <Text className='text-[14px] poppins-medium text-white'>{currentCycleData?.data?.data?.startDate} - {currentCycleData?.data?.data?.endDate}</Text>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor:'#FFF'}} className='mt-[14] mb-[16]'></View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Total Order Value</Text>
                        <Text className='text-[12px] poppins-bold text-white'>₹ {currentCycleData?.data?.data?.total_order_value}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Pakaoo Commission (20%)</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {currentCycleData?.data?.data?.commission_amount}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>GST on Commission (18%)</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {currentCycleData?.data?.data?.commission_gst_amount}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Refund Hold (30%)</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {currentCycleData?.data?.data?.refundAmount}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Immediate Payout to Vendor</Text>
                        <Text className='text-[12px] poppins-bold text-[#4DE56F]'>₹ {currentCycleData?.data?.data?.immediatePayout}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Refund Deducted from Hold</Text>
                        <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {currentCycleData?.data?.data?.final_amount_on_hold}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Final Hold Amount Released</Text>
                        <Text className='text-[12px] poppins-bold text-[#4DE56F]'>₹ {currentCycleData?.data?.data?.final_amount_on_hold_after_commission}</Text>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor:'#FFF'}} className='mt-[14] mb-[16]'></View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px] poppins-medium text-white'>Total Final Vendor Payout</Text>
                        <Text className='text-[12px] poppins-bold text-white'>₹ {currentCycleData?.data?.data?.final_commission_amount}</Text>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor:'#FFF'}} className='mt-[14]'></View>
                </LinearGradient>}
            </View>
        </View>
    )
}

export default CurrentCycle