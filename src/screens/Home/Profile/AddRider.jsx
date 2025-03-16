import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Flag from '../../../assets/flag'
import Tick from '../../../assets/double-tick'
import Cross from '../../../assets/modal-close'
import { useDispatch, useSelector } from 'react-redux'
import { addRider, setAddRiderData } from '../../../reducers/profileSlice'
import BlueBg from '../../../assets/blue-bg'
import NotFound from '../../../assets/not-found'

const AddRider = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const [mobile, setMobile] = useState('')
    const [count, setCount] = useState('')
    const { addRiderData } = useSelector(state => state.profileData)
    const dispatch = useDispatch()

    const handleRider = () => {
        const data = {
            order_capacity: Number(count),
            phone: Number(mobile)
        }
        dispatch(addRider(data))
    }

    useEffect(() => {
        if (addRiderData?.data?.message == 'Rider not registered' || addRiderData?.data?.data?.message == 'Rider Added :)') {
            setModalVisible(true)
            setMobile('')
            setCount('')
        }
    }, [addRiderData.data])

    return (
        <SafeAreaView>
            <View>
                <Navbar screen={'Add Information'} />
                <View className='pt-[31] px-[15]'>
                    <Text className='text-[15px] poppins-medium'>Phone Number</Text>
                    <View style={{ borderWidth: 1, borderColor: '#D6D6D6' }} className='flex-row items-center mt-[14] rounded-[10] px-[12] py-[12]'>
                        <Flag />
                        <Text className='text-[14px] mt-2 ml-[6] poppins-medium text-[#909090] mr-[11]'>+91</Text>
                        <View style={{ borderLeftWidth: 1, borderLeftColor: '#D6D6D6', height: 23 }}></View>
                        <TextInput onChangeText={(e) => setMobile(e)} value={mobile} keyboardType='number-pad' className='text-[15px] poppins-regular ml-[11] w-[80%] mt-2' placeholder='Enter Phone Number' />
                    </View>
                    <Text className='text-[15px] poppins-medium mt-[24]'>How many orders your rider can do in a
                        single trip?</Text>
                    <TextInput onChangeText={(e) => setCount(e)} value={count} keyboardType='number-pad' placeholder='Example: 15, Type Numbers Count' style={{ borderWidth: 1, borderColor: '#D6D6D6' }}
                        className='flex-row items-center text-[15px] poppins-regular mt-[14] rounded-[10] px-[12] py-[12]' />
                    <TouchableOpacity disabled={mobile?.length > 10 || mobile?.length < 10 || count == 0} onPress={handleRider} className={`${mobile?.length > 10 || mobile?.length < 10 || count < 1 ? 'btn-disabled' : 'btn-color'} rounded-[10] items-center py-[11] mt-[27]`}>
                        <Text className='text-[18px] poppins-medium text-white'>Add</Text>
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
                        <View className='' style={styles.modalContent}>
                            <TouchableOpacity onPress={() => { setModalVisible(false); dispatch(setAddRiderData({ data: null })) }} className='items-end'>
                                <Cross />
                            </TouchableOpacity>
                            <View className='items-center'>{addRiderData?.data?.message == 'Rider not registered' ? <View className='relative items-center justify-center'><BlueBg />
                                <View className='absolute'><NotFound /></View>
                            </View> : <Tick />}</View>
                            <Text className='text-[19px] poppins-semibold mt-[10] text-center'>{addRiderData?.data?.message == 'Rider not registered' ? 'Rider not found' : 'Rider Added Successfully'}</Text>
                            <Text className='text-[14px] poppins-medium text-[#666] text-center mt-[7] mb-3'>{addRiderData?.data?.message == 'Rider not registered' ? 'Please ask the rider to register and complete KYC from Pakaoo rider partner app!!!' :
                                'Ask rider to login with the same number which you have added'}</Text>
                        </View>
                    </View>
                </Modal>
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

export default AddRider