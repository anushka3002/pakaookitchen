import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Dots from '../../../assets/dots'
import BlueTick from '../../../assets/blue-tick'
import VegActive from '../../../assets/veg-active'
import VegInactive from '../../../assets/veg-inactive'
import NvegActive from '../../../assets/non-veg-active'
import NvegInactive from '../../../assets/non-veg-inactive'
import BothInactive from '../../../assets/both-inactive'
import BothActive from '../../../assets/both-active'
import Cross from '../../../assets/cross'
import Dash from '../../../assets/dash'
import VerticalBar from '../../../assets/vertical-bar'
import Drop from '../../../assets/drop'
import { useDispatch, useSelector } from 'react-redux'
import { addFoodDetails, getMenuDraft, getPlanDetails } from '../../../reducers/planSlice'
import LottieView from "lottie-react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

const PlanStepper = ({ navigation, route }) => {

    const { planId, planData, ind, edit } = route.params
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
    const [dropdown, setDropdown] = useState(-1)
    const [nvegDropdown, setNvegDropdown] = useState(-1)
    const [selectedUnit, setSelectedUnit] = useState('gm')
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

    const updateSelectedUnit = (index, unit, type) => {
        if (type == 'veg') {
            const updatedList = [...vegFoodList];
            updatedList[index].selectedUnit = unit;
            if (unit === "gm") {
                updatedList[index].quantity = "";
            } else {
                updatedList[index].weight = "";
            }

            setVegFoodList(updatedList);
        } else {
            const updatedList = [...nvegFoodList];
            updatedList[index].selectedUnit = unit;
            if (unit === "gm") {
                updatedList[index].quantity = "";
            } else {
                updatedList[index].weight = "";
            }

            setNvegFoodList(updatedList);
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
        setFoodType(planDetails?.data?.data?.meal_type?.veg ? 'Veg' : 'Both')
    }, [])

    useEffect(() => {
        dispatch(getMenuDraft(planId, 0, 0, edit, null, null, null))
    }, [planId, addItemDetails])

    const handlePlanSubmit = () => {
        setLoading(true)
        if (currentIndex <= menuDraft?.data?.data?.menu.length - 1) {
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
        dispatch(addFoodDetails(data)).then(() => {
            setLoading(false); dispatch(getMenuDraft(planId, 0, 0, 1, null, null, null)); setVegFoodItem('');
            setNvegFoodItem('');
            setNvegFoodList([]);
            setVegFoodList([]);
        }).catch(() => setLoading(false))
    }

    const handlePreview = async () => {
        navigation.navigate('PlanDetails', { planData: planData, ind: ind, editMenu: 0 })
    }

    const menuDataVal = menuDraft?.data?.data?.menu;
    const lastIndex = menuDataVal
        ?.map((val, index) => ({ ...val, index }))
        .reverse()
        .find(val => val.veg === 1 || val.nveg === 1)?.index;

    const nextDay =
        lastIndex !== undefined
            ? lastIndex === menuDataVal.length - 1
                ? menuDataVal[lastIndex].day 
                : menuDataVal[lastIndex + 1].day 
            : "No Selection";

    return (
        <SafeAreaView className='bg-white flex-1'>
            <Navbar screen={'Plan'} />
            <ScrollView>
                <View className='mx-4 pb-4'>
                    <View className='flex-row items-center justify-center mt-5'>
                        {menuDraft?.data?.data?.menu.map((e, ind) => {
                            return (
                                <View key={ind}>
                                    <View className='flex-row items-center justify-center'>
                                        <TouchableOpacity>
                                            {(e?.vegItem?.length > 0 || e?.nvegItem?.length > 0) ? <BlueTick /> : <View style={{ width: 33, height: 33 }}
                                                className='border border-[#D6D6D6] items-center justify-center rounded-full'>
                                                <Text className='text-[17px] poppins-medium txt-grey'>{e?.day?.split('')[0].toUpperCase()}</Text></View>}
                                        </TouchableOpacity>
                                        {ind < menuDraft?.data?.data?.menu?.length - 1 && <View style={{ gap: 2 }} className='mx-1 flex-row'>
                                            <Dots />{menuDraft?.data?.data?.menu?.length == 5 && <><Dots /><Dots /></>}
                                        </View>}
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                    <Text className='mt-4 text-[15px] poppins-medium'>{nextDay.split('')[0].toUpperCase() + nextDay.slice(1)}</Text>
                    <View style={{ gap: 10 }} className='flex-row mt-2'>
                        {[planDetails?.data?.data?.meal_type?.veg && 'Veg', planDetails?.data?.data?.meal_type?.nveg && 'Non veg', planDetails?.data?.data?.meal_type?.nveg && 'Both'].map((elm, ind) => {
                            return <TouchableOpacity key={ind} style={{ borderWidth: 1, borderColor: foodType == elm ? 'rgba(38, 80, 216, 0.50)' : '#D6D6D6' }} onPress={() => setFoodType(elm)}
                                className={`${foodType == elm ? 'selectedFoodType' : ''} rounded-[10px] py-[7px] flex-row ${planDetails?.data?.data?.meal_type?.veg && planDetails?.data?.data?.meal_type?.nveg ? 'flex-1' : 'w-[50%'} items-center justify-center`}>
                                {elm === 'Veg' && (foodType == elm ? <VegActive /> : <VegInactive />)}
                                {elm === 'Non veg' && (foodType == elm ? <NvegActive /> : <NvegInactive />)}
                                {elm === 'Both' && planDetails?.data?.data?.meal_type?.nveg && (foodType == elm ? <BothActive /> : <BothInactive />)}
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
                                onChangeText={(e) => setVegFoodItem(e)}
                                onSubmitEditing={() => addFoodItem('veg')}
                            />
                            <TouchableOpacity onPress={() => addFoodItem('veg')} disabled={vegFoodItem.length < 3} className={` ${vegFoodItem.length < 3 ? 'btn-disabled' : 'btn-color'} m-2 px-4 rounded-lg items-center justify-center`}>
                                <Text className='text-white poppins-medium text-[12px]'>Add</Text>
                            </TouchableOpacity>
                        </View>
                        {vegFoodList.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    className="border border-[#D6D6D6] rounded-[10px] flex-row items-center justify-between mb-[10]"
                                >
                                    <View className="flex-row">
                                        <TouchableOpacity
                                            onPress={() => removeFoodItem(index, "veg")}
                                            style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.14)" }}
                                            className="flex-row border border-[#D6D6D6] items-center py-[7px] px-3 m-2 rounded-[10]"
                                        >
                                            <Text className="text-[13px] poppins-medium txt-grey mr-2">
                                                {item.itemName.length > 10 ? item.itemName.slice(0, 6) + "..." : item.itemName}
                                            </Text>
                                            <Cross />
                                        </TouchableOpacity>
                                        <View className="mr-[10] ml-[4] my-auto">
                                            <VerticalBar />
                                        </View>
                                        <TextInput
                                            className="poppins-regular text-[#7B7B7B] text-[14px] mr-[11]"
                                            placeholder="Enter value"
                                            keyboardType="number-pad"
                                            value={item.weight ? item.weight.toString() : item.quantity ? item.quantity.toString() : ""}
                                            onChangeText={(text) => updateFoodItem(index, selectedUnit == "gm" ? "weight" : "quantity", text, "veg")}
                                        />
                                    </View>

                                    <View className="relative m-2">
                                        <TouchableOpacity
                                            style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.14)" }}
                                            className="flex-row border border-[#D6D6D6] items-center py-[7px] px-4 w-[77px] rounded-[10] bg-white"
                                            onPress={() => dropdown == -1 ? setDropdown(index) : setDropdown(-1)}
                                        >
                                            <Text className="text-[14px] poppins-regular text-[#4E4E4E] mr-[6]">
                                                {item.selectedUnit ?? 'gm'}
                                            </Text>
                                            <Drop />
                                        </TouchableOpacity>

                                        {dropdown == index && (
                                            <View className="absolute top-full left-0 mt-1 w-[77px] bg-white border border-[#D6D6D6] rounded-md shadow-md z-10">
                                                {["gm", "qt"].map((unit, unitIndex) => (
                                                    <TouchableOpacity
                                                        key={unitIndex}
                                                        onPress={() => { updateSelectedUnit(index, unit, "veg"); setSelectedUnit(unit); setDropdown(-1); }}
                                                        className="px-4 py-2 border-b last:border-b-0 border-gray-200"
                                                    >
                                                        <Text className="text-[14px] poppins-regular text-[#4E4E4E]">
                                                            {unit}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>}

                    {(foodType == 'Non veg' || foodType == 'Both') && <Text className='poppins-medium mt-5'>Non Veg Items</Text>}
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

                        {/* non veg food list */}
                        {nvegFoodList.map((item, index) => {
                            return <View key={index} className='border border-[#D6D6D6] rounded-[10px] flex-row items-center justify-between mb-[10]'>
                                <View className='flex-row'>
                                    <TouchableOpacity onPress={() => removeFoodItem(index, 'nveg')} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='flex-row border border-[#D6D6D6] items-center py-[7px] px-3 m-2 rounded-[10]'>
                                        <Text className='text-[13px] poppins-medium txt-grey mr-2'>
                                            {item.itemName.length > 10 ? item.itemName.slice(0, 6) + '...' : item.itemName}
                                        </Text>
                                        <Cross />
                                    </TouchableOpacity>
                                    <View className='mr-[10] ml-[4]'><VerticalBar /></View>
                                    <TextInput
                                        className='poppins-regular text-[#7B7B7B] text-[14px] mr-[11]'
                                        placeholder='Enter value'
                                        keyboardType='numeric'
                                        value={item.weight ? item.weight.toString() : ""}
                                        onChangeText={(text) => updateFoodItem(index, "weight", text, 'nveg')}
                                    />
                                </View>
                                <View className="relative m-2">
                                    <TouchableOpacity
                                        style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.14)" }}
                                        className="flex-row border border-[#D6D6D6] items-center py-[7px] px-4 w-[77px] rounded-[10] bg-white"
                                        onPress={() => dropdown == -1 ? setNvegDropdown(index) : setNvegDropdown(-1)}
                                    >
                                        <Text className="text-[14px] poppins-regular text-[#4E4E4E] mr-[6]">
                                            {item.selectedUnit ?? 'gm'}
                                        </Text>
                                        <Drop />
                                    </TouchableOpacity>

                                    {nvegDropdown == index && (
                                        <View className="absolute top-full left-0 mt-1 w-[77px] bg-white border border-[#D6D6D6] rounded-md shadow-md z-10">
                                            {["gm", "qt"].map((unit, unitIndex) => (
                                                <TouchableOpacity
                                                    key={unitIndex}
                                                    onPress={() => { updateSelectedUnit(index, unit, "nveg"); setNvegDropdown(-1); }}
                                                    className="px-4 py-2 border-b last:border-b-0 border-gray-200"
                                                >
                                                    <Text className="text-[14px] poppins-regular text-[#4E4E4E]">
                                                        {unit}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </View>
                        })}
                    </View>}

                    {(menuDataVal[menuDataVal?.length - 1]?.veg > 0 || menuDataVal[menuDataVal?.length - 1]?.nveg > 0) ? <TouchableOpacity
                        onPress={() => handlePreview()}
                        className='btn-color mt-[10] rounded-[10] items-center justify-center py-2'>
                        <Text className='text-[18px] text-center text-white poppins-medium'>Preview</Text>
                    </TouchableOpacity> : <TouchableOpacity
                        onPress={handlePlanSubmit}
                        disabled={
                            vegFoodList.length === 0 && nvegFoodList.length === 0 ||
                            vegFoodList.some(item => item.quantity === "" && item.weight === "") ||
                            nvegFoodList.some(item => item.quantity === "" && item.weight === "")}
                        className={`${vegFoodList.length === 0 && nvegFoodList.length === 0 ||
                            vegFoodList.some(item => item.quantity === "" && item.weight === "") ||
                            nvegFoodList.some(item => item.quantity === "" && item.weight === "")
                            ? 'btn-disabled' : 'btn-color'
                            } mt-[10] rounded-[10] items-center justify-center py-2`}>
                        {loading ? <ActivityIndicator size="large" color="#FFFFFF" /> : <Text className='text-[18px] text-center text-white poppins-medium'>Next</Text>}
                    </TouchableOpacity>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlanStepper