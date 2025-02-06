import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'

const Plan = ({navigation}) => {

  const [lunch, setLunch] = useState(true)

  const food = [
    {name:'Mann ka khana (Premiu..', image:'', time:'10:54 AM',cost:'₹163'},
    {name:'Mann ka khana (Premiu..', image:'', time:'10:54 AM',cost:'₹163'},
  ]

  return (
    <View className='bg-white h-screen'>
    <Navbar screen={'Plan'}/>
    <View style={{gap:20}} className='mt-6 flex-row items-center justify-center'>
        <TouchableOpacity onPress={()=>setLunch(true)}><Text style={[lunch ? styles.blueBtn : styles.whiteBtn, {boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)'}]} className='text-[15px] font-medium text-white rounded-3xl px-10 py-3'>Lunch</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setLunch(false)}><Text style={[lunch ? styles.whiteBtn : styles.blueBtn,{boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)'}]} className='text-[15px] font-medium text-white rounded-3xl px-10 py-3'>Dinner</Text></TouchableOpacity>
    </View>
    <View className='mx-4 mt-7'>
    {food.map((elm, index)=>{
      return <View key={index} style={{
        boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)',
      }} className='flex-row mb-6 rounded-xl'>
        <Image
        source={require('../../assets/dummymeal.png')}
        style={{width:109, height:112}}
        />
        <View className='flex-1 px-4 py-2'>
          <Text className='text-[17px] font-bold'>Mann ka khana (Premiu..)</Text>
          <Text className='text-[15px] font-medium txt-grey mt-1'>Plan - {index+1}</Text>
          <View className='flex-row items-center mt-1'>
            <Image
            source={require('../../assets/clock.png')}
            style={{width:12,height:12}}
            />
            <Text className='text-[13px] txt-grey ml-1'>10:54 AM</Text>
          </View>
          <View className='flex-row justify-between items-center mt-1'>
            <Text className='text-[19px] font-bold'>₹163</Text>
            <View className='flex-row'>
              <Text className='text-[15px] font-medium txt-blue mr-2'>View Details</Text>
              <Image
              source={require('../../assets/blue-arrow.png')}
              style={{width:19, height:21}}
              />
            </View>
          </View>
        </View>
      </View>
    })}
    </View>
    <TouchableOpacity style={{borderTopLeftRadius:50, borderBottomLeftRadius:50, bottom:100, boxShadow: ' 0px 0px 10px 0px rgba(47, 95, 248, 0.40)'}}
     className='absolute right-0 btn-color px-6 py-2' onPress={()=>navigation.navigate('AddPlan')}><View>
      <Text className='text-white text-[14px] font-medium'>Add Plan</Text>
    </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    whiteBtn: {
        borderWidth: 1,
        borderColor: 'rgba(214, 214, 214, 0.60)',
        color: '#7B7B7B',
    },
    blueBtn: {
      backgroundColor: '#2650D8',
    }
})

export default Plan