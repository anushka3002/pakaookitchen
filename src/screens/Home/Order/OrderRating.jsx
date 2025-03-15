import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import YelloStar from '../../../assets/yellow_star_full'
import YelloStarOutline from '../../../assets/yellow_star_outline'
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbackData } from '../../../reducers/orderSlice';
import { formatDate } from '../../../constant';

const OrderRating = () => {

    const dispatch = useDispatch()
    const {feedbackData} = useSelector(state => state.order)

    useEffect(()=>{
        dispatch(getFeedbackData('PK-15164'))
    },[])

    return (
        <View>
            <Navbar screen={'Order'} />
            <View className='px-4'>
            <Text className='text-[21px] poppins-semibold mt-[19]'>Review & Rating</Text>
            <View style={{boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)'}} className='rounded-[10] mt-[17]'>
                <Text className='text-[17px] py-[12] px-[11] poppins-semibold txt-blue border-b border-gray-300'>{feedbackData?.data?.data[0].plan_name}</Text>
                {feedbackData?.data?.data.map((elm, ind) => {
                    return <View key={ind} className='px-[11] py-[10] border-b border-gray-300'>
                        <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px] poppins-semibold'>{elm.customer_name}</Text>
                        <Text className='text-[13px] poppins-medium txt-green'>{formatDate(elm.createdAt)}</Text>
                        </View>
                        <View style={{gap:7}} className='flex-row mb-[8]'>
                            {Array.from({ length: 5 }, (_, index) =>
                                index < Math.floor(elm.rating) ? (
                                    <YelloStar key={index} />
                                ) : (
                                    <YelloStarOutline key={index} />
                                )
                            )}
                        </View>
                        <Text className='text-[14px] poppins-regular txt-grey'>
                            {elm.comment}
                        </Text>
                    </View>
                })}
            </View>
            </View>
        </View>
    )
}

export default OrderRating