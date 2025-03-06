import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BlueDate from '../../assets/blue-date';
import RightArrow from '../../assets/right-arrow';
import { formatDate } from '../../constant';

const OrderCard = ({navigation, order, arrow, status}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { orderData: order })} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }}
        className="px-[18] py-[9] rounded-[10]">
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[20px] poppins-semibold">{order.meal_time.split('')[0].toUpperCase() + order.meal_time.slice(1)}</Text>
                {status && <View className={`px-5 py-1 rounded-[10] btn-blue-100 justify-center items-center`}>
                    <Text className="text-[13px] poppins-regular txt-blue">{order.kitchen_status == 'order_processed' ? 'New Order' : order.kitchen_status.split("_").map((word, index) => index === 0
                        ? word.charAt(0).toUpperCase() + word.slice(1)
                        : word)
                        .join(" ")}</Text>
                </View>}
            </View>

            <Text className="text-[15px] poppins-regular">Order No - {order.kitchen_order_id}</Text>

            <View className="flex-row items-center items-center justify-between">
                <View className="flex-row items-center">
                    <BlueDate />
                    <Text className="text-[14px] mt-2 poppins-medium txt-blue ml-2">{formatDate(order.createdAt)}</Text>
                </View>
                {arrow && <TouchableOpacity className="mt-1">
                    <RightArrow />
                </TouchableOpacity>}
            </View>
        </TouchableOpacity>
    )
}

export default OrderCard