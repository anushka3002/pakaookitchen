import { View, Text, Alert, ScrollView, Modal, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import WhiteArrow from '../../../assets/white-arrow'
import Rider from '../../../assets/rider'
import { useDispatch, useSelector } from 'react-redux'
import SwipeButton from "rn-swipe-button";
import { assignRiderData, getOrderInfo, getRiderData, updateOrderStatus } from '../../../reducers/orderSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import Loader from '../../../Loader'
import { useFocusEffect } from '@react-navigation/native'

const OrderManagement = ({ navigation, route }) => {

  const { orderId } = route.params;
  const [modalVisible, setModalVisible] = useState(false)
  const [riderDetail, setRiderDetail] = useState('')
  const { viewOrderInfo, riderData, assignRider, loading, orderStatus } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRiderData())
  }, [])

  useFocusEffect(
    useCallback(() => {
      dispatch(getOrderInfo(orderId));
    }, [orderId, orderStatus?.data])
  );

  const handleSelectRider = (id) => {
    if (!riderDetail.name) {
      Alert.alert("Please select rider first");
    } else {
      const data = {
        kitchen_order_id: orderId,
        block_id: id,
        rider_id: riderDetail.id
      }
      setModalVisible(false)
      dispatch(assignRiderData(data))
      Alert.alert("Rider Assigned", "You have successfully assigned the rider!");
    }
  }

  const handleOrderStatus = (id) => {
    const data = {
      kitchen_order_id: orderId,
      order_status: "ready_for_pickup",
      rider_order_id: id
    }
    console.log(data)
    dispatch(updateOrderStatus(data))
  }

  const statusHandler = (status) => {
    let message
    switch (status) {
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
    return message
  }
  console.log(viewOrderInfo?.data?.data?.block_wise_data)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Navbar screen={'Order Management'} />
      {loading ? <Loader /> :
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}>
          <View className='px-[16] mb-10'>


            <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} className='rounded-[10] mt-[26]'>
              {viewOrderInfo?.data?.data?.plan_info?.map((val, ind) => {
                return (
                  <View className='px-4 mt-2' style={{ borderBottomWidth: 1, borderColor: "#EFEFEF" }} key={ind}>
                    <Text className='text-[17px] poppins-semibold'>{val.plan_name}</Text>
                    <View className='flex-row items-center my-[13]'>
                      {/* Show Veg Count only if it's greater than 0 */}
                      {val.veg_count > 0 && (
                        <>
                          <Text className='text-[15px] poppins-medium mr-[9]'>Veg</Text>
                          <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='px-[12] py-[6] rounded-[10]'>
                            <Text className='text-[14px] poppins-medium txt-grey'>{val.veg_count} Plates</Text>
                          </View>
                        </>
                      )}

                      {/* Show Non-Veg Count only if it's greater than 0 */}
                      {val.nveg_count > 0 && (
                        <>
                          <Text className='text-[15px] poppins-medium mr-[9]' style={{ marginLeft: val.veg_count > 0 ? 13 : 0 }}>
                            Non-Veg
                          </Text>
                          <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='px-[12] py-[6] rounded-[10]'>
                            <Text className='text-[14px] poppins-medium txt-grey'>{val.nveg_count} Plates</Text>
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>


            {viewOrderInfo?.data?.data?.block_wise_data.map((elm, ind) => {
              return <View key={ind}>
                <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} className='py-[9] rounded-[10] mt-[26] pb-[19]'>
                  <Text className='text-[17px] poppins-semibold border-b border-gray-300 px-[12] py-[6]'>ORDER CARD : CARD - {ind + 1}</Text>
                  {elm?.plans?.map((item, index) => {
                    return <View key={index} className='px-[12]'>
                      <Text className='text-[14px] poppins-semibold mt-[9]'>{item.plan_name}</Text>
                      <View className='flex-row items-center justify-between'>
                        <Text className='text-[16px] poppins-medium txt-grey-600'>{item.veg_count > 0 && item.veg_count + ' Plate (Veg)'} {item.nveg_count > 0 && 'and ' + item.nveg_count + ' (Non-veg)'}</Text>
                      </View>
                    </View>
                  })}
                </View>

                {elm.status == null && <TouchableOpacity onPress={() => setModalVisible(true)} className='btn-grey-640 rounded-[10] px-5 py-[9] flex-row justify-between items-center' style={{ marginTop: 18 }}>
                  <Text className='text-[18px] poppins-medium text-white'>{riderDetail.name ? riderDetail.name : 'Select Rider'}</Text>
                  <WhiteArrow />
                </TouchableOpacity>}

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackdrop} />
                  </TouchableWithoutFeedback>

                  <View className="flex-1 justify-center items-center">
                    <View style={{ maxHeight: 300, width: "80%", backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                      <ScrollView style={{ maxHeight: 300 }} nestedScrollEnabled={true}>
                        {riderData?.data?.data?.map((elm, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => { setRiderDetail(elm); setModalVisible(false) }}
                            className="py-3 px-4"
                          >
                            <Text className="text-[15px] poppins-regular">{elm.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </Modal>

                {elm?.status === 'ready_for_pickup' || elm?.status === 'out_for_delivery' && <Text className='text-[15px] poppins-semibold txt-green-0E mt-[15]'>{statusHandler(elm?.status)}</Text>}
                {elm?.status == 'order_processed' && elm?.riderDetails?.name == null ?
                  <View className="relative w-full mt-2">
                    <Text className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-[18px] poppins-medium text-white">
                      Assign Rider
                    </Text>
                    <SwipeButton
                      thumbIconComponent={() => <Rider />}
                      thumbIconBackgroundColor="white"
                      thumbIconBorderColor='#323232'
                      railBackgroundColor="#323232"
                      railBorderColor="#323232"
                      railFillBackgroundColor="#000"
                      title=""
                      onSwipeSuccess={() => handleSelectRider(elm.block_id)}
                      shouldResetAfterSuccess={true}
                      containerStyles={{ backgroundColor: "#323232", opacity: 1 }}
                    />
                  </View> : <TouchableOpacity className='btn-grey-320 py-[10] rounded-[50] flex-row items-center justify-center relative mb-1 mt-3'>
                    <View className='absolute right-1'><Rider /></View>
                    <Text className='poppins-medium text-[18px] text-white'>Rider Assigned</Text>
                  </TouchableOpacity>}
                {elm?.riderDetails?.name !== null && 
                  <Text className='text-[15px] poppins-medium mt-[8] text-center'>Assigned Rider : {elm?.riderDetails?.name}</Text>
                }
                {elm.status == 'order_processed' && <TouchableOpacity onPress={() => handleOrderStatus(elm?.riderDetails?.rider_order_id)} className='btn-color rounded-[10] py-[10]' style={{ marginTop: 7 }}>
                  <Text className='text-[18px] text-white text-center poppins-medium'>Mark Food As Ready</Text>
                </TouchableOpacity>}
              </View>
            })}
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});

export default OrderManagement