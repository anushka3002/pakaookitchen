import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { currentCycleDetails, getTransactionDetail } from '../../reducers/profileSlice'
import { formatPayoutDate } from '../../constant'

const CurrentCycle = ({route}) => {

    const {id} = route.params;
    const dispatch = useDispatch()
    const { currentDetails, transactionDetail } = useSelector(state => state.profileData)

    useEffect(() => {
        if(id != -1){
            dispatch(getTransactionDetail(id))
        }else{
            dispatch(currentCycleDetails())
        }
    }, [dispatch])

    const value = id == -1 ? currentDetails?.data?.data : transactionDetail?.data?.return_payout;

    return (
        <SafeAreaView>
            <View className='bg-white h-screen'>
                <Navbar screen={'Current cycle'} />
                <View className='px-[15]'>
                    {value?.length == 0 ? <Text className='text-[16px] poppins-medium text-[#737373] text-center mt-[236]'>Pay out is not available</Text> :
                        <LinearGradient
                            colors={['#2650D8', '#2D479D']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 1 }}
                            style={{ borderRadius: 16 }}
                            className="w-full0 mt-[24]"
                        >
                            <View className='px-[18] pt-[19] pb-[26]'>
                            <View className='flex-row justify-between'>
                                <Text className='text-[14px] poppins-semibold text-white'>Payout Summary</Text>
                                <Text className='text-[14px] poppins-medium text-white'>{formatPayoutDate(value?.start_date,'start')} - {formatPayoutDate(value?.end_date, 'end')}</Text>
                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: '#FFF' }} className='mt-[14] mb-[16]'></View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-medium text-white'>Total Order Value</Text>
                                <Text className='text-[12px] poppins-bold text-white'>₹ {value?.total_amount ?? 0}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-medium text-white'>Pakaoo Commission (20%)</Text>
                                <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {value?.commission ?? 0}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-medium text-white'>GST on Commission (18%)</Text>
                                <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {value?.commission_gst ?? 0}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-medium text-white'>Refund Hold (30%)</Text>
                                <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {value?.amount_hold ?? 0}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-medium text-white'>Immediate Payout to Vendor</Text>
                                <Text className='text-[12px] poppins-bold text-[#4DE56F]'>₹ {value?.immediate_payout ?? 0}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-medium text-white'>Refund Deducted from Hold</Text>
                                <Text className='text-[12px] poppins-bold text-[#FF4646]'>₹ {value?.refund ?? 0}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-medium text-white'>Final Hold Amount Released</Text>
                                <Text className='text-[12px] poppins-bold text-[#4DE56F]'>₹ {value?.release_hold_amount ?? 0}</Text>
                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: '#FFF' }} className='mt-[14] mb-[10]'></View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px] poppins-bold text-white'>Total Final Vendor Payout</Text>
                                <Text className='text-[12px] poppins-bold text-white'>₹ {value?.payout ?? 0}</Text>
                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: '#FFF' }} className='mt-[10]'></View>
                            </View>
                        </LinearGradient>}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CurrentCycle