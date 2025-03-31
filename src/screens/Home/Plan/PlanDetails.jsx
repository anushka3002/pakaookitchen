import { View, Text, ScrollView, TouchableOpacity, Image, Platform, BackHandler, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuDraft, submitMenu } from '../../../reducers/planSlice'
import EditIcon from '../../../assets/edit'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../../Loader'
import Back from '../../../assets/back.svg';
import { getSelectedDay, storeMenuData, updateSelectedDay } from '../../../constant'
import { useFocusEffect } from '@react-navigation/native'


const PlanDetails = ({ navigation, route }) => {

    let { planData, ind, editMenu } = route.params;
    const { menuDraft, loading, planDetails } = useSelector(state => state.plan)

    const [mealType, setMealType] = useState('Veg')
    const dispatch = useDispatch()

    const handleSubmit = () => {
        const data = {
            planId: Number(menuDraft.data.data.planId),
            status: 'submitted'
        }
        dispatch(submitMenu(data, navigation))
    }
    const { stepper, status } = planData

    const editHandler = async () => {
        if (status == 'approved') {
            await storeMenuData(menuDraft.data.data.menuRequestData, null)
            navigation.navigate('PlanStepper', { planId: menuDraft.data.data.planId, planData: planData, ind: ind, edit: 0 })
        } else {
            const selectedData = await getSelectedDay() || {};
            const currentPage = selectedData.selectedPage || null;
            if (currentPage) {
                await updateSelectedDay(currentPage, null)
            } else {
                await updateSelectedDay(menuDraft.data.data.menu[0], null)
            }
            navigation.navigate('PlanStepper', { planId: menuDraft.data.data.planId, planData: planData, ind: ind, edit: 1 })
        }
    }
    console.log(editMenu)
    // useFocusEffect(
    //     useCallback(() => {
    //         const elm = {
    //             status: status
    //         };
    //         let edit = status == 'approved' ? 0 : 1;

    //         dispatch(getMenuDraft(planData.id, 0, 0, edit, null, elm, null));
    //     }, [planData, status, dispatch])
    // );

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Exit App", "Are you sure you want to exit?", [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => {
            backHandler.remove();
        };
    }, []);


    const mealArray = [];
    if (planDetails.data.data.meal_type.veg) mealArray.push("Veg");
    if (planDetails.data.data.meal_type.nveg) mealArray.push("Non veg");

    return (
        <SafeAreaView className='flex-1'>
            <View className={`nav-bg flex-row items-center px-4 `} style={{ paddingVertical: 19 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Plan')}>
                    <Back />
                </TouchableOpacity>
                <Text className={`flex-1 text-center right-4 text-[21px] poppins-bold text-black`}>
                    Plan Details
                </Text>
            </View>
            {loading ? <Loader /> : <>
                <ScrollView className='bg-white' showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                    <View className={`px-[15] ${Platform.OS == 'ios' ? 'pb-14' : 'pb-24'} `}>
                        <Image
                            style={{
                                width: '100%',
                                height: 197,
                                borderRadius: 10,
                                marginTop: 19,
                                resizeMode: 'contain', // or 'cover'
                            }}
                            source={{ uri: planData.packaging_preview }}
                        />
                        <Text className='text-[19px] poppins-semibold mt-[11]'>{planData.name}</Text>


                        <View className='flex-row justify-between items-center'>
                            <Text className='text-[15px] poppins-medium txt-grey'>Plan {ind + 1}</Text>
                            {editMenu == 0 && <View className={`${planData.status == 'pending' ? 'bg-[#FBAE1E]' : 'bg-[#008000]'} bg-opacity-100 rounded-[50] px-[19] py-1 z-10`}>
                                <Text className='poppins-medium text-[11px] text-center text-white'>{planData.status.split('')[0].toUpperCase() + planData.status.slice(1)}</Text></View>
                            }

                            {editMenu == 1 &&
                                <View className={`${planData.status == 'pending' ? 'bg-[#FBAE1E]' : 'bg-[#FBAE1E]'} bg-opacity-100 rounded-[50] px-[19] py-1 z-10`}>
                                    <Text className='poppins-medium text-[11px] text-center text-white'>New menu</Text></View>
                            }
                        </View>

                        <View style={{ gap: 20 }} className='flex-row justify-center my-5'>
                            {mealArray.map((el, ind) => {
                                return <TouchableOpacity style={{ borderWidth: 1, borderColor: 'rgba(214, 214, 214, 0.60)' }} onPress={() => setMealType(el)} className={`${mealType == el ? 'btn-color' : ''} 
                        w-[120px] items-center py-[7] rounded-[50]`} key={ind}>
                                    <Text className={`${mealType == el ? 'text-white' : 'text-[#7B7B7B]'} text-[15px] poppins-medium`}>{el}</Text>
                                </TouchableOpacity>
                            })}
                        </View>

                        {menuDraft?.data?.data?.menu?.length > 0 ? (() => {
                            const filteredMenu = menuDraft.data.data.menu.filter(el => mealType === 'Veg' ? el.vegItem?.length > 0 : el.nvegItem?.length > 0);

                            if (filteredMenu.length === 0) {
                                return <Text className='poppins-medium txt-grey text-[18px] text-center mt-[100]'>No data found</Text>
                            }

                            return filteredMenu.map((el, ind) => (
                                <View style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)' }} key={ind} className='rounded-[10] w-full mb-[15]'>
                                    <View className='btn-light-blue rounded-t-[10] py-[9] px-[10]'>
                                        <Text className='text-[15px] poppins-medium txt-blue'>
                                            {el.day.charAt(0).toUpperCase() + el.day.slice(1)}
                                        </Text>
                                    </View>
                                    <View className='flex-row flex-wrap py-[9] rounded-b-[10] px-[10]'>
                                        {(mealType === 'Veg' ? el.vegItem : el.nvegItem).map((elm, index) => (
                                            <Text key={index} className='text-[13px] poppins-regular mr-[14]'>
                                                {elm.item_name} - {elm.quantity ? `${elm.quantity} qty` : `${elm.weight} gm`}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            ));
                        })() : <Text className='poppins-medium txt-grey text-[18px] text-center mt-[100]'>No data found</Text>}
                    </View>
                </ScrollView>

                {stepper === true && status == 'pending' || editMenu == 1 ?
                    <View className={`absolute bottom-0 left-0 w-full bg-white pt-[13] ${Platform.OS == 'ios' ? 'pb-[228]' : 'pb-[12]'} items-center px-5 shadow-lg border-t border-gray-200 d-flex`}
                        style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)', gap: 10, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={handleSubmit} style={{ gap: 8 }} className='w-[125px] border border-[#2650D8] rounded-[10] py-2 flex-row items-center justify-center'>
                            <Text className="txt-blue text-center text-[17px] poppins-semibold">Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={editHandler} style={{ gap: 8 }} className='w-[125px] border border-[#2650D8] rounded-[10] py-2 flex-row items-center justify-center'>
                            <EditIcon />
                            <Text className="txt-blue text-center text-[17px] poppins-semibold">Edit</Text>
                        </TouchableOpacity>
                    </View> : <></>
                }

                {status == 'approved' && editMenu === 0 &&
                    <View className={`absolute bottom-0 left-0 w-full bg-white pt-[13] ${Platform.OS == 'ios' ? 'pb-[228]' : 'pb-[12]'} items-center px-5 shadow-lg border-t border-gray-200 d-flex`}
                        style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)', gap: 10, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={editHandler} style={{ gap: 8 }} className='w-[125px] border border-[#2650D8] rounded-[10] py-2 flex-row items-center justify-center'>
                            <EditIcon />
                            <Text className="txt-blue text-center text-[17px] poppins-semibold">Edit</Text>
                        </TouchableOpacity>
                    </View>
                }


                {stepper === false && status == 'pending' &&
                    <View className={`absolute bottom-0 left-0 w-full bg-white pt-[13] ${Platform.OS == 'ios' ? 'pb-[228]' : 'pb-[12]'} items-center px-5 shadow-lg d-flex`}
                        style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)', gap: 10, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <View style={{ gap: 8 }} className='px-3 py-2 flex-row items-center justify-center'>

                            <Text className="txt-blue text-center text-[17px] poppins-semibold">Approval Pending</Text>
                        </View>
                    </View>
                }

                {editMenu === 1 &&
                    <View className={`absolute bottom-0 left-0 w-full bg-white pt-[13] ${Platform.OS == 'ios' ? 'pb-[228]' : 'pb-[12]'} items-center px-5 shadow-lg border-t border-gray-200 d-flex`}
                        style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)', gap: 10, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={handleSubmit} style={{ gap: 8 }} className='w-[125px] border border-[#2650D8] rounded-[10] py-2 flex-row items-center justify-center'>
                            <Text className="txt-blue text-center text-[17px] poppins-semibold">Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={editHandler} style={{ gap: 8 }} className='w-[125px] border border-[#2650D8] rounded-[10] py-2 flex-row items-center justify-center'>
                            <EditIcon />
                            <Text className="txt-blue text-center text-[17px] poppins-semibold">Edit</Text>
                        </TouchableOpacity>
                    </View>
                }

            </>
            }
        </SafeAreaView>
    )
}

export default PlanDetails