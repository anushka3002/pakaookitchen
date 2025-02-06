import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'

const PlanStepper = () => {

    const [stepper, setStepper] = useState([])
    const weekdays = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    console.log(weekdays[stepper[stepper.length-1]])

  return (
    <View>
      <Navbar screen={'Plan'}/>
      <View className='mx-4'>
        <View className='flex-row items-center justify-center mt-5'>
            {weekdays.map((e, ind)=>{
                return(
                    <View key={ind}>
                    <View className='flex-row items-center justify-center'>
                    <TouchableOpacity onPress={()=>setStepper([...stepper,ind])}><ImageBackground className='ml-1 mr-1 items-center justify-center'
                    source={stepper.includes(ind) ? require('../../assets/blue-tick.png') : require('../../assets/circle.png')}
                    style={{width:33, height:33}}
                    >
                        {!stepper.includes(ind) && <Text className='text-center txt-grey text-[17px] font-medium' style={{width:12}}>{e.split('')[0]}</Text>}
                    </ImageBackground>
                    </TouchableOpacity>
                    {ind < weekdays.length-1 && <Image
                        source={require('../../assets/dots.png')}
                        style={{width:17,height:6}}
                        />}
                    </View>
                    </View>
                )
            })}
        </View>
        <Text className='mt-4 text-[15px] font-medium'>{stepper.length == 0 ? weekdays[0] : weekdays[stepper[stepper.length-1]]}</Text>
        <View className='flex-row'>
            {['Veg','Non veg','Both'].map((elm)=>{
                return <View className='rounded-lg flex-row border flex-1 items-center justify-center'>
                    {elm === 'Veg' && <Image source={require('../../assets/veg-inactive.png')} style={{ width: 26, height: 26 }} />}
                    {elm === 'Non veg' && <Image source={require('../../assets/non-veg-inactive.png')} style={{ width: 27, height: 20 }} />}
                    {elm === 'Both' && <Image source={require('../../assets/veg-inactive.png')} style={{ width: 26, height: 26 }} />}
                    <Text className='text-[13px] font-medium txt-grey-200 ml-3'>{elm}</Text>
                </View>
            })}
            </View>
        </View>
    </View>
  )
}

export default PlanStepper