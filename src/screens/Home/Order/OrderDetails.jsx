import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import OrderCard from '../../Components/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrderStatus } from '../../../reducers/orderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../../Loader';
import { useFocusEffect } from '@react-navigation/native';

const OrderDetails = ({ navigation, route }) => {
    const { orderData } = route.params;
    const { orderDetails, loading } = useSelector(state => state.order);
    const [statusText, setStatusText] = useState();
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            dispatch(getOrderDetails(orderData?.kitchen_order_id));
        }, [orderData])
    );

    useEffect(() => {
        let message
        switch (orderDetails?.data?.data?.order_info?.kitchen_status) {
            case "order_created":
                message = "Start Cooking";
                break;
            case "order_processed":
                message = "On Going";
                break;
            case "ready_for_pickup":
                message = "Ready for pick";
                break;
            case "out_for_delivery":
                message = "Out for delivery";
                break;
            default:
                message = "No status available.";
        }
        setStatusText(message)
    }, [orderDetails?.data?.data?.order_info?.kitchen_status])

    const submitHandler = () => {
        if (orderDetails?.data?.data?.order_info?.kitchen_status === 'order_created') {
            const data = {
                kitchen_order_id: orderDetails.data.data.order_info.kitchen_order_id,
                order_status: "order_processed",
            }
            console.log(data)
            dispatch(updateOrderStatus(data))
        }
        navigation.navigate('OrderManagement', { orderId: orderData?.kitchen_order_id })
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <Navbar screen={'Order Management'} />
            <View className="flex-1">
                {loading ? (
                    <Loader />
                ) : (
                    <ScrollView className="flex-1">
                        <View className='px-4 pb-10'>
                            <Text className='text-[21px] poppins-semibold my-[10]'>Items List</Text>
                            <OrderCard order={orderData} />
                            <View className="rounded-[10] mt-[20] mb-[18]">
                                <View className="btn-color w-full rounded-t-[10]">
                                    <Text className="text-[18px] poppins-medium text-white px-[15] py-[6]">Items</Text>
                                </View>
                                <View className="rounded-[10]" style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }}>
                                    <View className="flex-row pt-[14] flex-wrap">
                                        {orderDetails?.data?.data?.items_info?.map((elm, ind) => (
                                            <View key={ind} className="items-center border-r border-gray-300 px-[14]">
                                                <Text className="text-[14px] poppins-semibold">
                                                    {elm.quantity ? elm.quantity + ' Pieces' : elm.weight + ' gm'}
                                                </Text>
                                                <Text className="text-[16px] poppins-medium txt-grey-600">{elm.item_name}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <View className="px-[14] mb-[12]" style={styles.borderTop}>
                                        {orderDetails?.data?.data?.plan_info.map((elm, ind) => {
                                            let vegText = elm.veg_count > 0 ? `${elm.veg_count} Plate (Veg)` : "";
                                            let nvegText = elm.nveg_count > 0 ? `${elm.nveg_count} Plate (Non-veg)` : "";

                                            // Determine the final display text
                                            let displayText = vegText && nvegText ? `${vegText} and ${nvegText}` : vegText || nvegText;

                                            return (
                                                <View key={ind} className='mb-[2]'>
                                                    <Text className="text-[14px] poppins-semibold pt-[7]">{elm.plan_name}</Text>
                                                    {displayText && (
                                                        <Text className="text-[16px] poppins-medium txt-grey-600">
                                                            {displayText}
                                                        </Text>
                                                    )}
                                                </View>
                                            );
                                        })}

                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={submitHandler}
                                className="btn-color rounded-[10] w-full items-center py-[10]"
                            >
                                <Text className="text-[18px] poppins-medium text-white">{statusText}</Text>
                            </TouchableOpacity>
                            <View className="flex-row mt-[12]">
                                <Text className="text-[15px] poppins-medium text-[#F00]">Note : </Text>
                                <Text className="text-[14px] poppins-regular txt-grey-400">
                                    Please fill the tiffin according to the menu of plan.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    borderTop: {
        borderTopWidth: 1,
        borderColor: "#D6D6D6",
        marginTop: 10
    }
})

export default OrderDetails;
