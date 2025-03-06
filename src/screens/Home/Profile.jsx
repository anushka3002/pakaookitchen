import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Pakaoo from '../../assets/pakaoo-logo'
import Email from '../../assets/email'
import Phone from '../../assets/phone'
import Location from '../../assets/blue-location'
import Rider from '../../assets/white-rider'
import EditProfile from '../../assets/edit-profile'
import Notification from '../../assets/Bell'
import Terms from '../../assets/terms'
import Contact from '../../assets/contact'
import Faq from '../../assets/faq'
import RightArrow from '../../assets/right-arrow'
import Dropdown from '../../assets/grey-dropdown'

const Profile = () => {

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteFlag, setDeleteFlag] = useState('YES')

  const accountList = [
    { name: 'Riders', icon: <Rider />, route: '' },
    { name: 'Edit Profile', icon: <EditProfile />, route: '' },
    { name: 'Notification', icon: <Notification />, route: '' },
    { name: 'Terms & Conditions', icon: <Terms />, route: '' },
  ]

  const helpList = [
    { name: 'Contact Us', icon: <Contact />, route: '' },
    { name: 'FAQ', icon: <Faq />, route: '' },
  ]

  const handleDelete = (value) =>{
    if(value == 'NO'){
      setModalVisible(false)
    }else{
      setModalVisible(false)
    }
  }

  return (
    <ScrollView className='bg-white'>
      <Navbar screen={'Profile'} noBackArrow={true} />
      <View className='px-4'>
        <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} className='pt-[60] mt-[64] relative items-center rounded-[10] justify-center'>
          <View className='rounded-full overflow-hidden absolute top-[-50]'>
            <Pakaoo />
          </View>
          <Text className='text-[19px] poppins-semibold mt-[9]'>Roselyn Felton </Text>
          <View className='flex-row items-center'>
            <Email />
            <Text className='text-[15px] poppins-regular ml-2'>roselynfelton@gmail.com</Text>
          </View>
          <View className='flex-row items-center my-[10]'>
            <Phone />
            <Text className='text-[15px] poppins-regular ml-2'>+1 98250 98250</Text>
          </View>
          <View className='flex-row w-[300px] items-start pb-[12]'>
            <Location />
            <Text className='text-[15px] poppins-regular ml-2'>Apt. 171 95228 Nicky Skyway,
              South Paul, UT 75689</Text>
          </View>
        </View>

        <Text className='text-[18px] poppins-bold mt-[30] mb-4'>Account</Text>
        {accountList.map((elm, ind) => {
          return <TouchableOpacity key={ind} className='flex-row justify-between items-center mb-[12]'>
            <View className='flex-row items-center'>
              <View className='btn-color rounded-full py-3 px-3 mr-[17]'>
                {elm.icon}
              </View>
              <Text className='text-[17px] poppins-medium'>{elm.name}</Text>
            </View>
            <RightArrow />
          </TouchableOpacity>
        })}

        <Text className='text-[18px] poppins-bold mt-[30] mb-4'>Help</Text>
        {helpList.map((elm, ind) => {
          return <TouchableOpacity key={ind} className='flex-row justify-between items-center mb-[12]'>
            <View className='flex-row items-center'>
              <View className='btn-color rounded-full py-3 px-3 mr-[17]'>
                {elm.icon}
              </View>
              <Text className='text-[17px] poppins-medium'>{elm.name}</Text>
            </View>
            <RightArrow />
          </TouchableOpacity>
        })}

        <View style={{ gap: 12, marginTop: '68' }} className='flex-row mb-10'>
          <TouchableOpacity className='btn-light-blue rounded-[10] py-[10] flex-1'>
            <Text className='text-[18px] poppins-medium txt-blue text-center'>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={{ backgroundColor: '#FFBDBD' }} className='rounded-[10] py-[10] flex-1'>
            <Text style={{ color: '#FF0F0F' }} className='text-[18px] poppins-medium text-center'>Delete Account</Text>
          </TouchableOpacity>
        </View>

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
            <View style={styles.modalContent}>
              <Text className="text-[18px] poppins-semibold txt-blue text-center">Are You Sure ?</Text>
              <Text className='text-[15px] poppins-regular text-center'>Are you sure you want to
              Delete?</Text>
              <View style={{borderWidth:1, borderColor:'#D8D8D8', borderRadius:5}} className='flex-row items-center mt-[11] py-[7] px-[16] justify-between'>
                <Text className='text-[14px] poppins-medium txt-grey'>Select reason</Text>
                <Dropdown/>
              </View>
              <View style={{gap: 22}} className='flex-row mt-[19]'>
                {['NO','YES'].map((elm)=>{
                  return <TouchableOpacity onPress={()=>handleDelete(elm)} style={{borderWidth:1, borderColor: '#2650D8', backgroundColor: deleteFlag == elm ? '#2650D8' : '#FFF'}} className='text-white rounded-[30] py-1 items-center border flex-1'>
                  <Text style={{ color: deleteFlag == elm ? '#FFFFFF' : '#595959'}} className='text-[16px] poppins-medium text-center'>{elm}</Text>
                </TouchableOpacity>
                })}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
    borderRadius: 23,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 8,
  },
})

export default Profile