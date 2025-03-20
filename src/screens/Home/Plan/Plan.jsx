import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import Trial from '../../../assets/trial'
import RightArrow from '../../../assets/right-arrow-blue'
import VegSymbol from '../../../assets/veg-symbol'
import NvegSymbol from '../../../assets/nveg-symbol'
import NoPlanAdded from '../../../assets/no-plan-added'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuDraft, getPlanDetails } from '../../../reducers/planSlice'
import LottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Plan = ({navigation}) => {

  const dispatch = useDispatch()
  const { planDetails, loading } = useSelector(state => state.plan)

  useEffect(()=>{
    dispatch(getPlanDetails(null))
  },[])

  const handlePlanDetail = (elm, ind) =>{
    dispatch(getMenuDraft(elm.id, 1,0, elm.status == 'approved' ? 0 : 1, navigation, elm, ind))
  }

  return (
    <SafeAreaView>
    <View className='bg-white h-screen'>
    <Navbar screen={'Plan'}/>
    <View style={{gap:20}} className='pt-6 pb-2 flex-row items-center justify-center'>
      {planDetails?.data?.data?.mealNames.map((el, ind)=>{
        return <TouchableOpacity key={ind} onPress={()=>dispatch(getPlanDetails(el))}><Text style={[el == planDetails?.data?.data?.selectedMeal ? styles.blueBtn : styles.whiteBtn, {boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)'}]} 
        className='text-[15px] poppins-medium text-white rounded-[30px] px-10 py-2'>{el.split('')[0].toUpperCase()+el.slice(1)}</Text></TouchableOpacity>
      })}
    </View>
    <ScrollView>
    {planDetails?.data?.data?.message == 'No plan exits' ? <View className='flex-1 items-center justify-center mt-[136]'><NoPlanAdded/>
    <Text className='text-[23px] poppins-semibold mt-[20]'>No Plan Added</Text>
    <Text className='text-[15px] poppins-medium txt-grey'>Please add plan to start!!</Text>
    </View> : <>
    <View className='mx-4 pt-4'>
    {loading ? <View className="items-center justify-center mt-[160]">
        <LottieView
          source={require("../../../assets/pan-loader")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View> : planDetails?.data?.data?.plan_info?.map((elm, index)=>{
      return <TouchableOpacity onPress={()=>handlePlanDetail(elm, index)} key={index} style={{
        boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)',
      }} className='flex-row mb-6 rounded-[20]'>
        <Image
        width={109}
        height={'100%'}
        borderBottomLeftRadius={20}
        borderTopLeftRadius={20}
        source={{uri: elm.packaging_preview}}
        />
        <View className='flex-1 px-4 py-2 realtive'>
          <View style={{top:-12, width:100}} className={`absolute right-0 ${elm.status == 'pending' ? 'bg-[#FBAE1E]' : 'bg-[#008000]'} bg-opacity-100 rounded-2xl py-1 z-10`}>
            <Text className='poppins-medium text-[11px] text-center text-white'>{elm.status.split('')[0].toUpperCase()+elm.status.slice(1)}</Text></View>
          <Text className='text-[17px] poppins-semibold'>{elm.name.length > 19 ? elm.name.slice(0, 19) + '...' : elm.name}</Text>
          <Text className='text-[15px] poppins-medium txt-grey'>Plan - {index+1}</Text>
          <View className='flex-row items-center'>
            <Trial/>
            <Text className='text-[15px] mt-1 poppins-semibold items-center ml-[6] '>₹{elm.trial_price}</Text>
          </View>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
            <VegSymbol/>
            <Text className='text-[15px] mt-1 poppins-semibold items-center ml-[6] mr-[17] '>₹{elm.veg_price.split('.')[0]}</Text>
            <NvegSymbol/>
            <Text className='text-[15px] mt-1 poppins-semibold items-center ml-[6] '>₹{elm.nveg_price.split('.')[0]}</Text>
            </View>
            <RightArrow/>
          </View>
        </View>
      </TouchableOpacity>
    })}
    </View>
    </>}
    </ScrollView>
    <TouchableOpacity style={{borderTopLeftRadius:50, borderBottomLeftRadius:50, bottom:120, boxShadow: ' 0px 0px 10px 0px rgba(47, 95, 248, 0.40)'}}
     className='absolute right-0 btn-color px-6 py-2' onPress={()=>navigation.navigate('AddPlan')}><View>
      <Text className='text-white text-[14px] poppins-medium'>Add Plan</Text>
    </View>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
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