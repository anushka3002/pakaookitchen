import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import ReadTick from '../../../assets/read-tick.svg'
import Discount from '../../../assets/Discount.svg'
import Delete from '../../../assets/delete-red.svg'
import NoNoti from '../../../assets/no-notification.svg'
import Commercial from '../../../assets/commercial.svg'
import Updated from '../../../assets/updated-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification, readNotification } from '../../../reducers/profileSlice'
import LottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../../Loader'

const Notification = ({ navigation }) => {

    const { notificationData, readNotificationData, loading } = useSelector(state => state.profileData)
    const dispatch = useDispatch()
    const screenWidth = Dimensions.get("window").width

    useEffect(() => {
        dispatch(getNotification())
    }, [readNotificationData])

    const handleAllNotification = (mark, id, deleted) => {
        const data = {
            mark_all_read: mark,
            id: id,
            deleted: deleted
        }
        dispatch(readNotification(data))
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View className='bg-white'>
                <Navbar screen={'Notification'} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }} >
                    {notificationData?.data?.data?.length > 0 && !loading && <TouchableOpacity onPress={() => handleAllNotification(1, null, 0)} className='flex-row justify-end items-center mt-[15] mb-[5] px-[15]'>
                        <Text className='txt-blue text-[15px] poppins-medium mr-[5]'>Mark all as read</Text>
                        <ReadTick />
                    </TouchableOpacity>}
                    {loading ? <Loader /> : notificationData?.data?.data?.length > 0 ? notificationData?.data?.data.map((elm, ind) => {
                        return <ScrollView key={ind} horizontal={true} showsHorizontalScrollIndicator={false}
                            contentContainerClassName='items-center px-[15]'>
                            <TouchableOpacity className='rounded-[10] px-[14] py-[13] flex-row items-center my-[10] mr-[13] w-screen'
                                style={{ width: screenWidth - 30, boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} onPress={() => navigation.navigate('Order', { tab:"delivered" })}>
                                <View className='btn-color rounded-[8] p-[8] mr-[10]'>
                                    {elm.notification_type == 'feedbackRecieved' || elm.notification_type == 'orderRecieved' ? <Commercial /> : elm.notification_type == 'promotional ' ? <Discount /> : <Updated />}
                                </View>
                                <View>
                                    <Text className='text-[15px] poppins-semibold'>{elm.title}</Text>
                                    <Text className='text-[14px] poppins-regular txt-grey-666 w-[96%]'>{elm.body}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleAllNotification(0, elm.id, 1)}>
                                <Delete />
                            </TouchableOpacity>
                        </ScrollView>
                    }) : <View className='items-center justify-center flex-1'>
                        <NoNoti />
                        <Text className='text-[21px] poppins-semibold mt-[27]'>No Notification Yet</Text>
                    </View>}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Notification