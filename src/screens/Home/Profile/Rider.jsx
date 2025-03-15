import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Delete from '../../../assets/delete-red'
import { useDispatch, useSelector } from 'react-redux'
import { getRiderData } from '../../../reducers/orderSlice'
import { deleteRider } from '../../../reducers/profileSlice'

const Rider = ({ navigation }) => {

  const { riderData } = useSelector(state => state.order)
  const {deleteRiderData, addRiderData} = useSelector(state => state.profileData)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getRiderData())
  },[addRiderData, deleteRiderData])

  const handleDeleteRider = (id) => {
    dispatch(deleteRider(id))
  }

  return (
    <SafeAreaView>
      <View className='bg-white h-screen'>
        <Navbar screen={'Rider'} />
        <ScrollView className='px-[15] pt-[18]'>
          {riderData?.data?.data?.map((elm, ind) => {
            return <View key={ind} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }}
              className='flex-row rounded-[10] justify-between py-[15] px-[14] mb-3'>
              <View className='flex-row items-center'>
                <Image
                  borderRadius={100}
                  source={{ uri: elm.profile_photo }}
                  style={{ width: 54, height: 54 }}
                />
                <View className='ml-3'>
                  <Text className='text-[15px] poppins-medium'>{elm.name}</Text>
                  <Text className='text-[15px] poppins-regular'>{elm.phone}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => handleDeleteRider(elm.id)} className='mt-1'>
                <Delete />
              </TouchableOpacity>
            </View>
          })}

          <TouchableOpacity onPress={() => navigation.navigate('AddRider')} className='btn-color rounded-[10] items-center py-[11] mt-[27]'>
            <Text className='text-[18px] poppins-medium text-white'>{riderData?.data.length == 0 ? 'No rider exist! Add now' : 'Add'}</Text>
          </TouchableOpacity>

          <Text style={{ lineHeight: 23 }} className='text-[14px] poppins-bold mt-[16]'>Note: <Text className='text-[14px] poppins-regular text-[#666]'>
            Ask rider to login with the same number which you have added
          </Text>
          </Text>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Rider