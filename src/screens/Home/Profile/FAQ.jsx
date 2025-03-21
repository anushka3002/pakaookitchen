import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Dropup from '../../../assets/faq-dropup'
import Dropdown from '../../../assets/faq-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { getFAQ } from '../../../reducers/profileSlice'
import LottieView from 'lottie-react-native'

const FAQ = () => {

  const dispatch = useDispatch()
  const [selectedFaq, setSelectedFaq] = useState()
  const { faqData, loading } = useSelector(state => state.profileData)

  useEffect(() => {
    dispatch(getFAQ())
  }, [])

  return (
    <SafeAreaView className='bg-white flex-1'>
      <Navbar screen={'FAQ'} />
      <ScrollView className='px-[16]'>
        <View className='pb-10'>
          {loading ? <View className="items-center justify-center mt-[237]">
            <LottieView
              source={require("../../../assets/pan-loader")}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
          </View> : faqData?.data?.length == 0 ?
            <Text className='poppins-medium txt-grey text-[18px] text-center mt-[237]'>No data found</Text> :
            faqData?.data?.data?.map((elm, ind) => {
              return <TouchableOpacity onPress={() => setSelectedFaq(selectedFaq === ind ? undefined : ind)} key={ind} className='rounded-[10] py-[13] px-[15] mt-5'
                style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }}>
                <View className='flex-row justify-between items-center'>
                  <Text className='text-[16px] flex-1 poppins-semibold'>{elm.question}</Text>
                  {selectedFaq == ind ? <Dropup /> : <Dropdown />}
                </View>
                {selectedFaq == ind && <Text style={{ color: '#666', lineHeight: 26 }} className='text-[14px] poppins-regular mt-[7]'>{elm.answer}</Text>}
              </TouchableOpacity>
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FAQ