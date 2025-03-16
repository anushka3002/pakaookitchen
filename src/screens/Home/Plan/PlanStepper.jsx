import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Dots from '../../../assets/dots'
import BlueTick from '../../../assets/blue-tick'
import VegActive from '../../../assets/veg-active'
import VegInactive from '../../../assets/veg-inactive'
import BothInactive from '../../../assets/both-inactive'
import BothActive from '../../../assets/both-active'
import Cross from '../../../assets/cross'
import Dash from '../../../assets/dash'
import VerticalBar from '../../../assets/vertical-bar'
import { useDispatch, useSelector } from 'react-redux'
import { addFoodDetails, getMenuDraft } from '../../../reducers/planSlice'
import LottieView from "lottie-react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

const PlanStepper = ({ route }) => {

    const { planId } = route.params
    const [stepper, setStepper] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const { menuDraft, planDetails, addItemDetails } = useSelector(state => state.plan)
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [foodType, setFoodType] = useState('')
    const [loading, setLoading] = useState(false)
    const [vegFoodItem, setVegFoodItem] = useState("");
    const [vegFoodList, setVegFoodList] = useState([]);
    const [nvegFoodItem, setNvegFoodItem] = useState("");
    const [nvegFoodList, setNvegFoodList] = useState([]);
    const dispatch = useDispatch()

    const addFoodItem = (type) => {
        if (type == 'veg') {
            if (vegFoodItem.trim() !== "") {
                setVegFoodList([...vegFoodList, { itemName: vegFoodItem, quantity: "", weight: "" }]);
                setVegFoodItem("");
            }
        } else {
            if (nvegFoodItem.trim() !== "") {
                setNvegFoodList([...nvegFoodList, { itemName: nvegFoodItem, quantity: "", weight: "" }]);
                setNvegFoodItem("");
            }
        }
    };

    const updateFoodItem = (index, field, value, type) => {
        if (type == 'veg') {
            const updatedList = [...vegFoodList];
            updatedList[index][field] = value;
            setVegFoodList(updatedList);
        } else {
            const updatedList = [...nvegFoodList];
            updatedList[index][field] = value;
            setNvegFoodList(updatedList);
        }
    };

    const removeFoodItem = (index, type) => {
        if (type == 'veg') {
            setVegFoodList(vegFoodList.filter((_, i) => i !== index));
        } else {
            setNvegFoodList(nvegFoodList.filter((_, i) => i !== index));
        }
    };

    useEffect(() => {
        if (menuDraft?.data?.data?.menu?.length > 0) {
            const menuItems = menuDraft.data.data.menu;
            const emptyIndex = menuItems.findIndex(
                (item) => item?.vegItem?.length === 0 && item?.nvegItem?.length === 0
            );
            if (emptyIndex !== -1) {
                setCurrentIndex(emptyIndex);
            }
        }
    }, [menuDraft]);

    useEffect(() => {
        setFoodType(planDetails?.data?.data?.meal_type.veg ? 'Veg' : 'Both')
    }, [])

    useEffect(() => {
        dispatch(getMenuDraft(planId, 0, 0, 1, null, null, null))
    }, [planId, addItemDetails])

    const handlePlanSubmit = () => {
        setLoading(true)
        if (currentIndex < menuDraft?.data?.data?.menu.length - 1) {
            var currentId = menuDraft?.data?.data?.menu[currentIndex].id;
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
        const data = {
            menuId: currentId,
            veg: vegFoodList.length == 0 ? 0 : 1,
            nveg: nvegFoodList.length == 0 ? 0 : 1,
            vegItems: vegFoodList,
            nvegItems: nvegFoodList
        }
        dispatch(addFoodDetails(data)).then(() => setLoading(false)).catch(() => setLoading(false))
        setLoading(false)
    }

    return (
        <SafeAreaView>
            <ScrollView className='bg-white'>
                <Navbar screen={'Plan'} />
                <View className='mx-4'>
                    <View className='flex-row items-center justify-center mt-5'>
                        {menuDraft?.data?.data?.menu.map((e, ind) => {
                            return (
                                <View key={ind}>
                                    <View className='flex-row items-center justify-center'>
                                        <TouchableOpacity onPress={() => setStepper([...stepper, ind])}>
                                            {(e?.vegItem?.length > 0 || e?.nvegItem?.length) > 0 ? <BlueTick /> : <View style={{ width: 33, height: 33 }}
                                                className='border items-center justify-center rounded-full'>
                                                <Text className='text-[17px] poppins-medium txt-grey'>{e?.day?.split('')[0].toUpperCase()}</Text></View>}
                                        </TouchableOpacity>
                                        {ind < weekdays.length - 1 && <View className='mx-1'><Dots /></View>}
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                    <Text className='mt-4 text-[15px] poppins-medium'>{stepper.length == 0 ? weekdays[0] : weekdays[stepper[stepper.length - 1]]}</Text>
                    <View style={{ gap: 10 }} className='flex-row mt-2'>
                        {[planDetails?.data?.data?.meal_type.veg && 'Veg', planDetails?.data?.data?.meal_type.nveg && 'Both'].map((elm, ind) => {
                            return <TouchableOpacity key={ind} style={{ borderWidth: 1, borderColor: foodType == elm ? 'rgba(38, 80, 216, 0.50)' : '#D6D6D6' }} onPress={() => setFoodType(elm)}
                                className={`${foodType == elm ? 'selectedFoodType' : ''} rounded-[10px] py-[7px] flex-row ${planDetails?.data?.data?.meal_type.veg && planDetails?.data?.data?.meal_type.nveg ? 'flex-1' : 'w-[50%'} items-center justify-center`}>
                                {elm === 'Veg' && (foodType == elm ? <VegActive /> : <VegInactive />)}
                                {elm === 'Both' && planDetails?.data?.data.meal_type.nveg && (foodType == elm ? <BothActive /> : <BothInactive />)}
                                <Text className={`text-[13px] poppins-medium ${elm == foodType ? 'text-black' : 'txt-grey'} ml-2`}>{elm}</Text>
                            </TouchableOpacity>
                        })}
                    </View>

                    {foodType == 'Both' && <Text className='poppins-medium mt-[23]'>Veg Items</Text>}
                    {(foodType == 'Veg' || foodType == 'Both') && <View className="mt-[15]">
                        <View className='border border-gray-300 rounded-[10] flex-row justify-between mb-4'>
                            <TextInput
                                className="txt-grey flex-1 poppins-regular rounded-lg p-3 items-center justify-center"
                                placeholder="Enter Food Item"
                                value={vegFoodItem}
                                onChangeText={setVegFoodItem}
                                onSubmitEditing={() => addFoodItem('veg')}
                            />
                            <TouchableOpacity onPress={() => addFoodItem('veg')} disabled={vegFoodItem.length < 3} className={` ${vegFoodItem.length < 3 ? 'btn-disabled' : 'btn-color'} m-2 px-4 rounded-lg items-center justify-center`}>
                                <Text className='text-white poppins-medium text-[12px]'>Add</Text>
                            </TouchableOpacity>
                        </View>
                        {vegFoodList.map((item, index) => {
                            return <View key={index} className='border border-[#D6D6D6] rounded-[10px] flex-row items-center mb-[10]'>
                                <TouchableOpacity onPress={() => removeFoodItem(index, 'veg')} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='flex-row border border-[#D6D6D6] items-center py-[7px] px-3 m-2 rounded-[10]'>
                                    <Text className='text-[13px] poppins-medium txt-grey mr-2'>
                                        {item.itemName.length > 10 ? item.itemName.slice(0, 6) + '...' : item.itemName}
                                    </Text>
                                    <Cross />
                                </TouchableOpacity>
                                <View className='mr-[10] ml-[4]'><VerticalBar /></View>
                                <TextInput
                                    className='poppins-regular text-[#7B7B7B] text-[14px] mr-[11]'
                                    placeholder='Enter Gram'
                                    keyboardType='numeric'
                                    value={item.weight ? item.weight.toString() : ""}
                                    onChangeText={(text) => updateFoodItem(index, "weight", text, 'veg')}
                                />
                                <Dash />
                                <TextInput
                                    className='poppins-regular text-[#7B7B7B] text-[14px] ml-[11]'
                                    placeholder='Enter Qty'
                                    keyboardType="numeric"
                                    value={item.quantity ? item.quantity.toString() : ""}
                                    onChangeText={(text) => updateFoodItem(index, "quantity", text, 'veg')}
                                />
                            </View>
                        })}
                    </View>}

                    {foodType == 'Both' && <Text className='poppins-medium mt-5'>Non Veg Items</Text>}
                    {(foodType == 'Non veg' || foodType == 'Both') && <View className="mt-[15]">
                        <View className='border border-gray-300 rounded-[10] flex-row justify-between mb-4'>
                            <TextInput
                                className="txt-grey flex-1 poppins-regular rounded-lg p-3 items-center justify-center"
                                placeholder="Enter Food Item"
                                value={nvegFoodItem}
                                onChangeText={setNvegFoodItem}
                                onSubmitEditing={() => addFoodItem('nveg')}
                            />
                            <TouchableOpacity onPress={() => addFoodItem('nveg')} disabled={nvegFoodItem.length < 3} className={` ${nvegFoodItem.length < 3 ? 'btn-disabled' : 'btn-color'} m-2 px-4 rounded-lg items-center justify-center`}>
                                <Text className='text-white poppins-medium text-[12px]'>Add</Text>
                            </TouchableOpacity>
                        </View>
                        {nvegFoodList.map((item, index) => {
                            return <View key={index} className='border border-[#D6D6D6] rounded-[10px] flex-row items-center mb-[10]'>
                                <TouchableOpacity onPress={() => removeFoodItem(index, 'nveg')} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='flex-row border border-[#D6D6D6] items-center py-[7px] px-3 m-2 rounded-[10]'>
                                    <Text className='text-[13px] poppins-medium txt-grey mr-2'>
                                        {item.itemName.length > 10 ? item.itemName.slice(0, 6) + '...' : item.itemName}
                                    </Text>
                                    <Cross />
                                </TouchableOpacity>
                                <View className='mr-[10] ml-[4]'><VerticalBar /></View>
                                <TextInput
                                    className='poppins-regular text-[#7B7B7B] text-[14px] mr-[11]'
                                    placeholder='Enter Gram'
                                    keyboardType='numeric'
                                    value={item.weight ? item.weight.toString() : ""}
                                    onChangeText={(text) => updateFoodItem(index, "weight", text, 'nveg')}
                                />
                                <Dash />
                                <TextInput
                                    className='poppins-regular text-[#7B7B7B] text-[14px] ml-[11]'
                                    placeholder='Enter Qty'
                                    keyboardType="numeric"
                                    value={item.quantity ? item.quantity.toString() : ""}
                                    onChangeText={(text) => updateFoodItem(index, "quantity", text, 'nveg')}
                                />
                            </View>
                        })}
                    </View>}
                    <TouchableOpacity
                        style={{ height: 60 }}
                        onPress={handlePlanSubmit}
                        disabled={
                            vegFoodList.length === 0 && nvegFoodList.length === 0 ||
                            vegFoodList.some(item => item.quantity === "" && item.weight === "") ||
                            nvegFoodList.some(item => item.quantity === "" && item.weight === "")
                        }
                        className={`${vegFoodList.length === 0 && nvegFoodList.length === 0 ||
                            vegFoodList.some(item => item.quantity === "" && item.weight === "") ||
                            nvegFoodList.some(item => item.quantity === "" && item.weight === "")
                            ? 'btn-disabled' : 'btn-color'
                            } mt-[10] rounded-[10] items-center justify-center`}>
                        {loading ? <LottieView
                            source={require("../../../assets/food-loader.json")}
                            autoPlay
                            loop
                            style={styles.animation}
                        /> : <Text className='text-[18px] text-center text-white poppins-medium'>Next</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    animation: {
        width: 45,
        height: 45,
    },
});

export default PlanStepper