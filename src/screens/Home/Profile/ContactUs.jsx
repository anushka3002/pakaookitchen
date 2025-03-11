import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setSupportData, support } from '../../../reducers/profileSlice'

const ContactUs = ({ navigation }) => {

  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const { supportData } = useSelector(state => state.profileData)
  const [modalVisible, setModalVisible] = useState(false)

  const handleSupport = () => {
    const data = {
      message: message,
      contact_number: Number(phone)
    }
    dispatch(support(data))
  }

  const handleSupportClose = () => {
    setModalVisible(false);
    navigation.goBack();
    dispatch(setSupportData({ data: null }))
  }

  useEffect(() => {
    if (supportData?.data?.success) {
      setModalVisible(true)
    }
  }, [supportData?.data?.success])

  return (
    <View>
      <Navbar screen={'Contact Us'} />
      <View className='px-[15px]'>
        <Text className='text-[15px] poppins-medium mt-5'>Message</Text>
        <TextInput onChangeText={(e) => setMessage(e)} value={message}
          multiline={true} numberOfLines={4}
          textAlignVertical="top"
          placeholder='Enter Message' style={{ borderWidth: 1, borderColor: '#D6D6D6' }}
          className='rounded-[10] h-[111px] text-[15px] poppins-regular py-[17] px-5 mt-[10]' />

        <Text className='text-[15px] poppins-medium mt-5'>Contact number</Text>
        <TextInput keyboardType='number-pad' onChangeText={(e) => setPhone(e)} value={phone}
          placeholder='Number to reach out you' style={{ borderWidth: 1, borderColor: '#D6D6D6' }}
          className='rounded-[10] text-[15px] poppins-regular py-[17] px-5 mt-[10]' />

        <TouchableOpacity disabled={phone.length < 10 || phone.length > 10 || message.length == 0} onPress={handleSupport} className={`${message.length == 0 || phone.length < 10 || phone.length > 10 ? 'btn-disabled' : 'btn-color'} py-[11] rounded-[10] mt-[26]`}>
          <Text className='text-[18px] poppins-medium text-white text-center'>Submit</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View style={styles.modalContent} className="bg-white p-5 rounded-lg">
            <Text className="text-center text-[#666] text-[15px] poppins-regular mt-2">
              {supportData?.data?.data}.</Text>
            <Text className="text-center text=[#666] text-[15px] poppins-regular mt-2">We will reach out to you soon.</Text>
            <TouchableOpacity
              onPress={handleSupportClose}
              className="btn-color rounded-[10] items-center py-[11] mt-[27] mb-5"
            >
              <Text className="text-[18px] poppins-medium text-white">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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

export default ContactUs