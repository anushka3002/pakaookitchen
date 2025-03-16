import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuDraft } from '../../../reducers/planSlice'
import { SafeAreaView } from 'react-native-safe-area-context'

const PlanDetails = ({ route }) => {

    const { planData, ind } = route.params;
    const { menuDraft } = useSelector(state => state.plan)
    const [mealType, setMealType] = useState('Veg')

    return (
        <SafeAreaView>
            <ScrollView>
                <Navbar screen={'Plan Details'} />
                <View className='mx-[15]'>
                    <Image
                        width={'100%'}
                        height={197}
                        borderRadius={10}
                        source={{ uri: planData.packaging_preview }}
                    />
                    <Text className='text-[19px] poppins-semibold mt-[11]'>{planData.name}</Text>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[15px] poppins-medium txt-grey'>Plan {ind + 1}</Text>
                        {planData?.status == 'pending' && <View className='btn-color rounded-[50] px-5 py-2'>
                            <Text className='text-white text-[12px] poppins-medium'>Preview</Text>
                        </View>}
                    </View>

                    <View style={{ gap: 20 }} className='flex-row justify-center my-5'>
                        {['Veg', 'Non veg'].map((el, ind) => {
                            return <TouchableOpacity style={{ borderWidth: 1, borderColor: 'rgba(214, 214, 214, 0.60)' }} onPress={() => setMealType(el)} className={`${mealType == el ? 'btn-color' : ''} 
                        w-[110px] items-center py-[7] rounded-[50]`} key={ind}>
                                <Text className={`${mealType == el ? 'text-white' : 'text-[#7B7B7B]'} text-[15px] poppins-medium`}>{el}</Text>
                            </TouchableOpacity>
                        })}
                    </View>

                    {menuDraft?.data?.data?.menu.length > 0 ? menuDraft?.data?.data?.menu?.map((el, ind) => {
                        if (mealType == 'Veg' && el.vegItem.length > 0) {
                            return <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} key={ind} className='rounded-[10] w-full mb-[15]'>
                                <View className='btn-light-blue rounded-t-[10] py-[9] px-[10]'>
                                    <Text className='text-[15px] poppins-medium txt-blue'>{el.day.split('')[0].toUpperCase() + el.day.slice(1)}</Text>
                                </View>
                                <View className='flex-row flex-wrap py-[9] rounded-b-[10] px-[10]'>
                                    {el.vegItem.map((elm, index) => {
                                        return <Text key={index} className='text-[13px] poppins-regular mr-[14]'>{elm.item_name} - {elm.quantity ? elm.quantity + 'qty' : elm.weight + 'gm'}</Text>
                                    })}
                                </View>
                            </View>
                        } else if (el.nvegItem.length > 0) {
                            return <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} key={ind} className='w-full rounded-[10] mb-[15]'>
                                <View className='btn-light-blue py-[9] px-[10]'>
                                    <Text className='text-[15px] poppins-medium txt-blue'>{el.day.split('')[0].toUpperCase() + el.day.slice(1)}</Text>
                                </View>
                                <View className='flex-row flex-wrap py-[9] px-[10]'>
                                    {el.nvegItem.map((elm, index) => {
                                        return <Text key={index} className='text-[13px] poppins-regular'>{elm.item_name} - {elm.quantity ? elm.quantity + 'qty' : elm.weight + 'gm'}</Text>
                                    })}
                                </View>
                            </View>
                        }
                    }) : <Text className='poppins-medium txt-grey text-[18px] text-center mt-[100]'>No data found</Text>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlanDetails