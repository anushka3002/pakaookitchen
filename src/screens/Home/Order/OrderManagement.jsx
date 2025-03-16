import { View, Text, Alert, ScrollView, Modal, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import WhiteArrow from '../../../assets/white-arrow'
import Rider from '../../../assets/rider'
import { useDispatch, useSelector } from 'react-redux'
import SwipeButton from "rn-swipe-button";
import { assignRiderData, getOrderInfo, getRiderData, updateOrderStatus } from '../../../reducers/orderSlice'
import { SafeAreaView } from 'react-native-safe-area-context'

const OrderManagement = ({ navigation, route }) => {

  const { orderId } = route.params;
  const [modalVisible, setModalVisible] = useState(false)
  const [riderDetail, setRiderDetail] = useState('')
  const { viewOrderInfo, riderData, assignRider } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRiderData())
  }, [])

  useEffect(() => {
    dispatch(getOrderInfo(orderId))
  }, [orderId])

  const handleSelectRider = (id) => {
    const data = {
      kitchen_order_id: orderId,
      block_id: id,
      rider_id: riderDetail.id
    }
    setModalVisible(false)
    dispatch(assignRiderData(data))
    Alert.alert("Rider Assigned", "You have successfully assigned the rider!");
  }
  const handleOrderStatus = () => {
    const data = {
      kitchen_order_id: orderId,
      order_status: "ready_for_pickup",
      rider_order_id: riderDetail.id
    }
    dispatch(updateOrderStatus(data))
  }

  return (
    <SafeAreaView>
      <View className='bg-white h-screen'>
        <Navbar screen={'Order Management'} />
        <ScrollView>
          <View className='px-[16] mb-10'>
            <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} className='py-[9] rounded-[10] mt-[26]'>
              {viewOrderInfo?.data?.data?.plan_info?.map((elm, ind) => {
                return <View key={ind} className={`${ind != viewOrderInfo?.data?.data?.plan_info.length - 1 ? 'border-b border-gray-300' : 'mt-2'} px-2`}>
                  <Text className='text-[17px] poppins-semibold'>{elm.plan_name}</Text>
                  <View className='flex-row items-center my-[13]'>
                    {elm.veg_count > 0 && <Text className='text-[15px] poppins-medium mr-[9]'>Veg</Text>}
                    {elm.veg_count > 0 && <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='px-[12] py-[6] rounded-[10]'>
                      <Text className='text-[14px] poppins-medium txt-grey'>10 Plates</Text></View>}
                    {elm.nveg_count > 0 && <Text className='text-[15px] poppins-medium mr-[9] ml-1'>Non-Veg</Text>}
                    {elm.nveg_count > 0 && <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='px-[12] py-[6] rounded-[10]'>
                      <Text className='text-[14px] poppins-medium txt-grey'>10 Plates</Text></View>}
                  </View>
                </View>
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

                {elm.status == null && <TouchableOpacity onPress={() => setModalVisible(true)} className='btn-grey-640 rounded-[10] px-5 py-[9] flex-row justify-between items-center mt-[28]'>
                  <Text className='text-[18px] poppins-medium text-white'>Select Rider</Text>
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
                        {riderData?.data?.data.map((elm, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => setRiderDetail(elm)}
                            className="py-3 px-4"
                          >
                            <Text className="text-[15px] poppins-regular">{elm.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </Modal>

                {elm.status != null && <Text className='text-[15px] poppins-semibold txt-green-0E mt-[15]'>{elm?.status?.split('')[0].toUpperCase() + elm?.status?.slice(1)}</Text>}
                {elm.status == null ? <View className="relative w-full">
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
                </View> : <TouchableOpacity className='btn-grey-320 py-[10] rounded-[50] flex-row items-center justify-center relative'>
                  <View className='absolute right-1'><Rider /></View>
                  <Text className='poppins-medium text-[18px] text-white'>Rider Assigned</Text>
                </TouchableOpacity>}

                <Text className='text-[15px] poppins-medium mt-[12] text-center'>Assigned Rider : Chandramohan Jha</Text>

                {elm.status == null && <TouchableOpacity onPress={() => handleOrderStatus()} className='btn-color rounded-[10] py-[10] mt-[22]'>
                  <Text className='text-[18px] text-white text-center poppins-medium'>Mark Food As Ready</Text>
                </TouchableOpacity>}
              </View>
            })}
          </View>
        </ScrollView>
      </View>
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