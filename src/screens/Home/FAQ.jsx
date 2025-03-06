import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Dropup from '../../assets/faq-dropup'
import Dropdown from '../../assets/faq-dropdown'

const FAQ = () => {

    const [selectedFaq, setSelectedFaq] = useState()

    const faq = [
        {title: 'Many desktop publishing', desc: 'Mauris ut erat ut urna rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis. Vestibulum quis scelerisque leo. '},
        {title: 'Many desktop publishing', desc: 'Mauris ut erat ut urna rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis. Vestibulum quis scelerisque leo. '},
        {title: 'Many desktop publishing', desc: 'Mauris ut erat ut urna rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis. Vestibulum quis scelerisque leo. '},
        {title: 'Many desktop publishing', desc: 'Mauris ut erat ut urna rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis. Vestibulum quis scelerisque leo. '},
    ]

  return (
    <View>
      <Navbar screen={'FAQ'}/>
      <ScrollView className='px-[16]'>
      {faq.map((elm, ind)=>{
        return <TouchableOpacity onPress={()=>selectedFaq != undefined ? setSelectedFaq() : setSelectedFaq(ind)} key={ind} className='rounded-[10] py-[13] px-[15] mt-5' style={{boxShadow:'0px 0px 10px 0px rgba(0, 0, 0, 0.13)'}}>
            <View className='flex-row justify-between items-center'>
                <Text className='text-[16px] poppins-semibold'>{elm.title}</Text>
                {selectedFaq == ind ? <Dropup/> : <Dropdown/>}
            </View>
            {selectedFaq == ind && <Text style={{color:'#666', lineHeight: 26}} className='text-[14px] poppins-regular mt-[7]'>{elm.desc}</Text>}
        </TouchableOpacity>
      })}
    </ScrollView>
    </View>
  )
}

export default FAQ