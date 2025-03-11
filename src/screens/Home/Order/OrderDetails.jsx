import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import OrderCard from '../../Components/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../../reducers/orderSlice';

const OrderDetails = ({ navigation, route }) => {

    const { orderData } = route.params;
    const { orderDetails } = useSelector(state => state.order)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrderDetails(orderData?.kitchen_order_id))
    }, [orderData])

    return (
        <View className='bg-white h-screen'>
            <Navbar screen={'Order Management'} />
            <ScrollView>
            <View className='px-4 pb-10'>
                <Text className='text-[21px] poppins-semibold my-[10]'>Items List</Text>
                <OrderCard order={orderData} />
                <View className="rounded-[10] mt-[20] mb-[18]">
                    <View className="btn-color w-full rounded-t-[10]">
                        <Text className="text-[18px] poppins-medium text-white px-[15] py-[6]">Items</Text>
                    </View>
                    <View className="rounded-[10]" style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }}>
                        <View className="flex-row pt-[14] flex-wrap">
                            {orderDetails?.data?.data?.items_info?.map((elm, ind) => {
                                return <View key={ind} className="items-center border-r border-gray-300 px-[14]">
                                    <Text className="text-[14px] poppins-semibold">{elm.quantity ? elm.quantity + 'Pieces' : elm.weight + 'gm'}</Text>
                                    <Text className="text-[16px] poppins-medium txt-grey-600">{elm.item_name}</Text>
                                </View>
                            })}
                        </View>
                        <View className="px-[14] mb-[12]">
                            {orderDetails?.data?.data?.plan_info.map((elm, ind) => {
                                return <View key={ind} className='mb-[2]'>
                                    <Text className="text-[14px] poppins-semibold pt-[7]">{elm.plan_name}</Text>
                                    <Text className="text-[16px] poppins-medium txt-grey-600">{elm.veg_count > 0 && elm.veg_count + ' Plate'} (Veg) {elm.nveg_count > 0 && 'and '+ elm.nveg_count+' (Non-veg)'}</Text>
                                </View>
                            })}
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('OrderManagement',{orderId: orderData?.kitchen_order_id})} className="btn-color rounded-[10] w-full items-center py-[10]">
                    <Text className="text-[18px] poppins-medium text-white">Start Cooking</Text>
                </TouchableOpacity>
                <View className="flex-row mt-[12] mx-[50] justify-center">
                    <Text className="text-[15px] poppins-medium text-[#F00]">Note : </Text>
                    <Text className="text-[14px] poppins-regular txt-grey-400">Please fill the tiffin according to
                        the menu of plan</Text>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default OrderDetails