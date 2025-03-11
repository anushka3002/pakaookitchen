import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Dropup from '../../../assets/faq-dropup'
import Dropdown from '../../../assets/faq-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { getFAQ } from '../../../reducers/profileSlice'

const FAQ = () => {

    const dispatch = useDispatch()
    const [selectedFaq, setSelectedFaq] = useState()
    const { faqData } = useSelector(state=>state.profileData)

    useEffect(()=>{
      dispatch(getFAQ())
    },[])

  return (
    <View className='h-screen bg-white'>
      <Navbar screen={'FAQ'}/>
      <ScrollView className='px-[16]'>
      {faqData?.data?.length == 0 ? 
      <Text className='poppins-medium txt-grey text-[18px] text-center mt-[237]'>No data found</Text> :
      faqData?.data?.data?.map((elm, ind)=>{
        return <TouchableOpacity onPress={()=>selectedFaq != undefined ? setSelectedFaq() : setSelectedFaq(ind)} key={ind} className='rounded-[10] py-[13] px-[15] mt-5' style={{boxShadow:'0px 0px 10px 0px rgba(0, 0, 0, 0.13)'}}>
            <View className='flex-row justify-between items-center'>
                <Text className='text-[16px] poppins-semibold'>{elm.question}</Text>
                {selectedFaq == ind ? <Dropup/> : <Dropdown/>}
            </View>
            {selectedFaq == ind && <Text style={{color:'#666', lineHeight: 26}} className='text-[14px] poppins-regular mt-[7]'>{elm.answer}</Text>}
        </TouchableOpacity>
      })}
    </ScrollView>
    </View>
  )
}

export default FAQ