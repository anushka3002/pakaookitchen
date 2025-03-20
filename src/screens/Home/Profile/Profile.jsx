import {
  View, Text, ScrollView, TouchableOpacity,
  Modal, TouchableWithoutFeedback, StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Pakaoo from '../../../assets/pakaoo-circle'
import Email from '../../../assets/email'
import Phone from '../../../assets/phone'
import Location from '../../../assets/blue-location'
import Rider from '../../../assets/white-rider'
import Notification from '../../../assets/Bell'
import Terms from '../../../assets/terms'
import Contact from '../../../assets/contact'
import Faq from '../../../assets/faq'
import RightArrow from '../../../assets/arrow-right'
import Dropdown from '../../../assets/grey-dropdown'
import Logout from '../../../assets/logout'
import Delete from '../../../assets/delete'
import BlueBg from '../../../assets/blue-bg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, logout } from '../../../reducers/authSlice'
import { getProfileData, getDeleteReasons } from '../../../reducers/profileSlice'
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteFlag, setDeleteFlag] = useState('Logout')
  const [modalValue, setModalValue] = useState('')
  const [deleteVisible, setDeleteVisible] = useState('')
  const [deleteReason, setDeleteReason] = useState('')
  const { auth_token } = useSelector(state => state.auth)
  const { profile, deleteReasons } = useSelector(state => state.profileData)
  const dispatch = useDispatch()

  const accountList = [
    { name: 'Riders', icon: <Rider />, route: 'Rider' },
    { name: 'Notification', icon: <Notification />, route: 'Notification' },
    { name: 'Terms & Conditions', icon: <Terms />, route: 'TermsConditions' },
  ]

  const helpList = [
    { name: 'Contact Us', icon: <Contact />, route: 'ContactUs' },
    { name: 'FAQ', icon: <Faq />, route: 'FAQ' },
  ]

  const openURL = () => {
    Linking.openURL('https://pakaoo.co/termandcondition');
  };

  const handleDeleteReason = () => {
    setModalValue('Delete')
    setModalVisible(true)
    dispatch(getDeleteReasons())
  }

  const handleDelete = (value) => {
    if (value == 'Delete') {
      dispatch(deleteAccount(deleteReason.id))
    } else {
      dispatch(logout(navigation))
      setModalVisible(false)
    }
  }

  useEffect(() => {
    dispatch(getProfileData())
  }, [])

  return (
    <SafeAreaView>
      <View className='h-screen bg-white'>
      <Navbar screen={'Profile'} noBackArrow={true} />
      <ScrollView>
        <View className='px-4 pb-[140]'>
          <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} className='pt-[60] mt-[64] relative items-center rounded-[10] justify-center'>
            <View className='rounded-full overflow-hidden absolute top-[-50]'>
              <Pakaoo />
            </View>
            <Text className='text-[19px] poppins-semibold mt-[9]'>{profile?.data?.data?.kitchen_name}</Text>
            <View className='flex-row items-center'>
              <Email />
              <Text className='text-[15px] poppins-regular ml-2'>{profile?.data?.data?.owner_email}</Text>
            </View>
            <View className='flex-row items-center my-[10]'>
              <Phone />
              <Text className='text-[15px] poppins-regular ml-2'>{profile?.data?.data?.owner_contact}</Text>
            </View>
            <View className='flex-row w-[300px] items-start pb-[12]'>
              <Location />
              <Text className='text-[15px] poppins-regular ml-2'>{profile?.data?.data?.address_line1}&nbsp;
                {profile?.data?.data?.address_line2}</Text>
            </View>
          </View>

          <Text className='text-[18px] poppins-bold mt-[30] mb-4'>Account</Text>
          {accountList.map((elm, ind) => {
            return <TouchableOpacity key={ind} onPress={() => elm.name == 'Terms & Conditions' ? openURL() : elm.name == 'Edit Profile' ? navigation.navigate(elm.route, { page: 'edit' }) : navigation.navigate(elm.route)} className='flex-row justify-between items-center mb-[12]'>
              <View className='flex-row items-center'>
                <View className='btn-color rounded-full py-3 px-3 mr-[17]'>
                  {elm.icon}
                </View>
                <Text className='text-[17px] poppins-medium'>{elm.name}</Text>
              </View>
              <RightArrow />
            </TouchableOpacity>
          })}

          <Text className='text-[18px] poppins-bold mt-[11] mb-4'>Help</Text>
          {helpList.map((elm, ind) => {
            return <TouchableOpacity key={ind} onPress={() => navigation.navigate(elm.route)} className='flex-row justify-between items-center mb-[12]'>
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
            <TouchableOpacity onPress={() => { setModalVisible(true); setModalValue('Logout')}} className='btn-light-blue rounded-[10] py-[10] flex-1'>
              <Text className='text-[18px] poppins-medium txt-blue text-center'>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteReason} style={{ backgroundColor: '#FFBDBD' }} className='rounded-[10] py-[10] flex-1'>
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
              <View className='items-center justify-center' style={styles.modalContent}>
                <View className='relative items-center justify-center'>
                  <BlueBg />
                  <View className='absolute'>{modalValue == 'Logout' ? <Logout /> : <Delete />}</View>
                </View>
                <Text className='text-[19px] poppins-semibold mt-[10] mb-[6]'>{modalValue} {modalValue == 'Delete' ? 'Account' :''}</Text>
                <Text className='text-[14px] poppins-regular txt-grey-666 text-center'>Are you sure you want to &nbsp;
                  {modalValue.toLowerCase()}?</Text>
                {modalValue == 'Delete' && <TouchableOpacity onPress={() => setDeleteVisible(true)} style={{ borderWidth: 1, borderColor: '#D8D8D8', borderRadius: 5 }} className='flex-row w-full items-center mt-[11] py-[11] px-[16] justify-between mt-[14] mb-[6]'>
                  <Text className={`text-[14px] poppins-medium ${deleteReason ? '' : 'txt-grey'}`}>{deleteReason ? deleteReason.reason : 'Select reason'}</Text>
                  <Dropdown />
                </TouchableOpacity>}
                <View style={{ gap: 22 }} className='flex-row mt-[19]'>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: deleteFlag == 'Cancel' ? '#2650D8' : '#DDD' }} className='text-white rounded-[10] py-[11] items-center flex-1'>
                    <Text style={{ color: deleteFlag == 'Cancel' ? '#FFFFFF' : '#595959' }} className='text-[18px] poppins-medium text-center'>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={modalValue == 'Delete' && !deleteReason.reason} onPress={() => handleDelete(modalValue)} className={`text-white ${modalValue == 'Delete' && !deleteReason.reason ? 'btn-disabled' : 'btn-color'} rounded-[10] py-[11] items-center flex-1`}>
                    <Text style={{ color: deleteFlag == 'Logout' ? '#FFFFFF' : '#595959' }} className='text-[18px] poppins-medium text-center'>{modalValue}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={deleteVisible}
            onRequestClose={() => setDeleteVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setDeleteVisible(false)}>
              <View style={styles.modalBackdrop} />
            </TouchableWithoutFeedback>
            <View className="flex-1 justify-center items-center">
              <View className='items-center justify-center' style={styles.modalContent}>
                {deleteReasons?.data?.data.map((elm, ind) => {
                  return <TouchableOpacity key={ind} onPress={() => { setDeleteReason(elm), setDeleteVisible(false) }}>
                    <Text className='text-[13px] poppins-regular text-center'>{elm.reason}</Text>
                  </TouchableOpacity>
                })}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "90%",
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