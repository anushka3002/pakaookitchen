import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Trial from '../../../assets/trial'
import RightArrow from '../../../assets/right-arrow-blue'
import VegSymbol from '../../../assets/veg-symbol'
import NvegSymbol from '../../../assets/nveg-symbol'
import NoPlanAdded from '../../../assets/no-plan-added'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuDraft, getPlanDetails } from '../../../reducers/planSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../../Loader'
import { useFocusEffect } from '@react-navigation/native'
import { getSelectedDay, storeMenuData } from '../../../constant'
import Back from '../../../assets/back.svg';

const Plan = ({ navigation }) => {
  const { planDetails, loading } = useSelector(state => state.plan)
  const [meal, setMeal] = useState(planDetails?.data?.data?.selectedMeal);
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      dispatch(getPlanDetails(null));
    }, [])
  );

  const handlePlanDetail = async (elm, ind) => {

    const pageInfo = await getSelectedDay() || {}; // Ensure it's an object
    const currentPage = pageInfo.selectedPage || null;
    
    if (currentPage == 'preview') {
      navigation.navigate('PlanDetails', { planData: elm, ind: ind, editMenu: 0 })
    } else {
      console.log(currentPage)
    dispatch(getMenuDraft(elm.id, 0, 0, elm.status == 'approved' ? 0 : 1, navigation, elm, ind))
    }

  }

  return (
    <SafeAreaView>
      <View className='bg-white h-screen'>
        <View className={`nav-bg flex-row items-center px-4 `} style={{ paddingVertical: 19 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Back />
          </TouchableOpacity>
          <Text className={`flex-1 text-center right-4 text-[21px] poppins-bold text-black`}>
            Plans
          </Text>
        </View>
        {loading ? <Loader /> : <>
          <View style={{ gap: 20 }} className='pt-6 pb-2 flex-row flex-wrap items-center justify-center'>
            {planDetails?.data?.data?.mealNames.map((el, ind) => {
              return <TouchableOpacity key={ind} onPress={() => { setMeal(el); dispatch(getPlanDetails(el)) }}><Text style={[el == planDetails?.data?.data?.selectedMeal ?
                styles.blueBtn : styles.whiteBtn, { boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)' }]}
                className='text-[13px] poppins-medium text-white rounded-[30px] px-5 py-2'>{el.split('')[0].toUpperCase() + el.slice(1)}</Text></TouchableOpacity>
            })}
          </View>
          <View style={{ flex: 0.75 }}>
            {planDetails?.data?.data?.message == 'No plan exits' ? <View className='flex-1 items-center justify-center'><NoPlanAdded />
              <Text className='text-[23px] poppins-semibold mt-[20]'>No Plan Added</Text>
              <Text className='text-[15px] poppins-medium txt-grey'>Please add plan to start!!</Text>
            </View> : <>
              <View className='mx-4 pt-4 flex-1'>
                {planDetails?.data?.data?.plan_info?.map((elm, index) => {
                  return <TouchableOpacity onPress={() => handlePlanDetail(elm, index)} key={index} style={{
                    boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)',
                  }} className='flex-row mb-6 rounded-[20] mt-2'>
                    <Image
                      width={109}
                      height={'100%'}
                      borderBottomLeftRadius={20}
                      borderTopLeftRadius={20}
                      source={{ uri: elm.packaging_preview }}
                    />
                    <View className='flex-1 px-4 py-2 realtive'>
                      <View style={{ top: -14, width: 100 }} className={`absolute right-[20] ${elm.status == 'pending' ? 'bg-[#FBAE1E]' : 'bg-[#008000]'} bg-opacity-100 rounded-2xl py-1 z-10`}>
                        <Text className='poppins-medium text-[11px] text-center text-white'>{elm.status.split('')[0].toUpperCase() + elm.status.slice(1)}</Text></View>
                      <Text className='text-[17px] poppins-semibold'>{elm.name.length > 19 ? elm.name.slice(0, 19) + '...' : elm.name}</Text>
                      <Text className='text-[15px] poppins-medium txt-grey'>Plan - {index + 1}</Text>
                      <View className='flex-row items-center'>
                        <Trial />
                        <Text className='text-[15px] mt-1 poppins-semibold items-center ml-[6] '>₹{elm.trial_price}</Text>
                      </View>
                      <View className='flex-row items-center justify-between'>
                        <View className='flex-row items-center'>
                          {planDetails?.data?.data.meal_type.veg == true &&
                            <>
                              <VegSymbol />
                              <Text className='text-[15px] mt-1 poppins-semibold items-center ml-[6] mr-[17] '>₹{elm.veg_price.split('.')[0]}</Text>
                            </>
                          }
                          {planDetails?.data?.data.meal_type.nveg == true &&
                            <>
                              <NvegSymbol />
                              <Text className='text-[15px] mt-1 poppins-semibold items-center ml-[6] '>₹{elm.nveg_price.split('.')[0]}</Text>
                            </>
                          }
                        </View>
                        <RightArrow />
                      </View>
                    </View>
                  </TouchableOpacity>
                })}
              </View>
            </>}
          </View>
        </>}
        <TouchableOpacity style={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, bottom: 120, boxShadow: ' 0px 0px 10px 0px rgba(47, 95, 248, 0.40)' }}
          className='absolute right-0 btn-color px-6 py-2' onPress={() => navigation.navigate('AddPlan')}><View>
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