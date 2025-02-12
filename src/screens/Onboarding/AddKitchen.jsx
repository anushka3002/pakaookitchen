import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, Image, StyleSheet
} from 'react-native';
import Navbar from '../Components/Navbar';
import Veg from '../../assets/veg.svg';
import NonVeg from '../../assets/non-veg.svg';
import Both from '../../assets/both.svg';
import Search from '../../assets/search.svg';
import Cross from '../../assets/cross.svg';
import Clock from '../../assets/clock.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addKitchenData, getCategory, getFoodStyle } from '../../reducers/kitchenSlice';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddKitchen = ({ navigation }) => {

    const [selectedMealCategory, setSelectedMealCategory] = useState(1);
    const [selectedCuisine, setSelectedCuisine] = useState('veg');
    const [selectedMealTimes, setSelectedMealTimes] = useState(['breakfast']);
    const [foodStyleText, setFoodStyleText] = useState('')
    const { categoryData, foodStyle } = useSelector((state) => state?.kitchenData)
    const [foodSet, setFoodSet] = useState([])
    const [day, setDay] = useState(0)
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState('');
    const [breakfastDeliveryTime, setBreakfastDeliveryTime] = useState('')
    const [lunchDeliveryTime, setLunchDeliveryTime] = useState('')
    const [dinnerDeliveryTime, setDinnerDeliveryTime] = useState('')
    const dispatch = useDispatch();

    const toggleMealTime = (mealTime) => {
        setSelectedMealTimes((prev) =>
            prev.includes(mealTime)
                ? prev.filter((time) => time !== mealTime)
                : [...prev, mealTime]
        );
    };

    function formatTimestampToTime(timestamp, meal) {
        const date = new Date(timestamp);
        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })
        if (meal == 'breakfast') {
            setBreakfastDeliveryTime(formattedTime)
        } else if (meal == 'lunch') {
            setLunchDeliveryTime(formattedTime)
        } else {
            setDinnerDeliveryTime(formattedTime)
        }
    }

    const onChange = (event, selectedTime, meal) => {
        setShow(Platform.OS === "ios");
        if (event.nativeEvent.timestamp) {
            setTime(selectedTime)
            formatTimestampToTime(event.nativeEvent.timestamp, meal)
        }
    };

    const handleFoodStyle = (text) => {
        setFoodStyleText(text)
        if (text.length > 2) {
            dispatch(getFoodStyle(text))
        }
    }

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const handleSubmit = () => {
        const data = {
            "categoryId": selectedMealCategory,
            "cuisineCategory": selectedCuisine,
            "foodStyle": 1,
            "servingDays": day,
            "mealTime": selectedMealTimes,
            "breakfastDeliveryTime": breakfastDeliveryTime,
            "lunchDeliveryTime": lunchDeliveryTime,
            "dinnerDeliveryTime": dinnerDeliveryTime
        }
        dispatch(addKitchenData(data))
    }

    return (
        <>
            <Navbar screen={'Add Kitchen'} />
            <ScrollView className="p-4 bg-white flex-1">
                {/* Meal Category */}
                <Text className="text-[18px] font-semibold mb-2">Meal Category <Text className='text-red-500'>*</Text></Text>
                <View className="flex-row justify-between mb-4 w-full">
                    {categoryData?.data?.data?.map((e, ind) => {
                        return (
                            <TouchableOpacity key={ind} onPress={()=>setSelectedMealCategory(e.id)}
                                style={[selectedMealCategory == e.id ? '' : styles.whiteBtn, { width: '47%' }]}
                                className={`mr-2 py-3 text-[16px] font-medium rounded-xl ${selectedMealCategory === e.id ? 'btn-color' : 'white-btn'
                                    }`}
                            >
                                <Text
                                    className={`text-center font-medium ${selectedMealCategory === e.id ? 'text-white' : 'text-black'
                                        }`}
                                >
                                    {e.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* Cuisine Category */}
                <Text className="text-[18px] font-semibold mb-2">Cuisine Category <Text className='text-red-500'>*</Text></Text>
                <View className="flex-row space-x-4 mb-4">
                    {['veg', 'nveg', 'both'].map((item, index) => (
                        <View key={index} className="flex-1 items-center">
                            <View style={{ height: 84, width: 89, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={[selectedCuisine === item ? styles.blueBorder : styles.whiteBtn, {
                                        height: 84, width: 100, justifyContent: 'center',
                                        alignItems: 'center',
                                    }]}
                                    className={`items-center rounded-xl ${selectedCuisine === item ? 'bg-white' : ''}`}
                                    onPress={() => setSelectedCuisine(item)}
                                >
                                    {item === 'veg' && <Veg />}
                                    {item === 'nveg' && <NonVeg />}
                                    {item === 'both' && <Both />}
                                </TouchableOpacity>
                            </View>

                            <Text style={{ color: '#7B7B7B', fontSize: 12, marginTop: 5 }} className="text-[16px] font-medium text-center">
                                {item === 'veg' ? 'Veg' : item === 'nveg' ? 'Non Veg' : 'Both'}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Food Style */}
                <TouchableOpacity onPress={()=>navigation.navigate('AddKitchen2')}><Text className="text-[18px] font-semibold mb-2">Food Style <Text className='text-red-500'>*</Text></Text></TouchableOpacity>
                <View className="relative">
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#D6D6D6',
                        borderRadius: 8,
                        gap: 6
                    }} className="flex-row items-center rounded-xl px-4 py-2 bg-white">
                        {foodSet?.length > 0 && foodSet?.map((item, ind) => (
                            <TouchableOpacity key={ind} onPress={() => setFoodSet(foodSet.filter((el) => el != item))}>
                                <View style={[styles.whiteBtn]} className='flex-row bg-white px-4 py-3 rounded-xl'>
                                    <Text>{item}</Text>
                                    <Cross style={{ marginLeft: 8, marginTop: 6 }} />
                                </View>
                            </TouchableOpacity>
                        ))}
                        <TextInput
                            onChangeText={handleFoodStyle}
                            placeholder="Punjabi"
                            className="flex-1 text-black"
                            value={foodStyleText}
                        />
                        <Search />
                    </View>

                    {foodStyleText?.length > 1 && <View
                        className="absolute left-0 right-0 mt-2 w-full border bg-white rounded-lg shadow-lg"
                        style={{
                            top: '100%', backgroundColor: 'white', zIndex: 10, borderWidth: 1,
                            borderColor: '#D6D6D6',
                        }}
                    >
                        {foodStyle?.data?.data?.map((e, ind) => (
                            <TouchableOpacity key={ind} style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#D6D6D6',
                            }} onPress={() => !foodSet.includes(e) && setFoodSet([...foodSet, e.cuisine_name])}>
                                <Text className="px-4 py-3 text-black">{e.cuisine_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>}
                </View>

                {/* Serving Days */}
                <Text className="text-[18px] mt-3 font-semibold mb-2">Serving Days <Text className='text-red-500'>*</Text></Text>
                <View className="flex-row space-x-4 mb-4 justify-between">
                    <View style={{ width: '47%' }}>
                        <Text className='text-[16px] font-medium mb-2'>All Day</Text>
                        <TouchableOpacity
                            style={[day == 1 ? styles.whiteBtn : '']}
                            className={`mr-2 py-3 text-[16px] font-medium rounded-xl ${day == 0 ? 'btn-color' : 'white-btn'
                                }`}
                            onPress={() => setDay(0)}
                        >
                            <Text
                                className={`text-center text-[16px] font-medium ${day == 0 ? 'text-white' : 'text-black'
                                    }`}
                            >
                                Mon To Sun
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '47%' }}>
                        <Text className='text-[16px] font-medium mb-2'>Weekend Day</Text>
                        <TouchableOpacity
                            style={[day == 1 ? '' : styles.whiteBtn]}
                            className={` ml-2 text-[16px] font-medium py-3 rounded-lg ${day == 1 ? 'btn-color' : ''
                                }`}
                            onPress={() => setDay(1)}
                        >
                            <Text
                                className={`text-center text-[16px] font-medium ${day == 1 ? 'text-white' : 'text-black'
                                    }`}
                            >
                                Mon To Fri
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Meal Times */}
                <Text className="text-[18px] font-semibold mb-2">Meal Times <Text className='text-red-500'>*</Text></Text>
                <View style={{ gap: 20 }} className="flex-row mb-4">
                    {['breakfast', 'lunch', 'dinner'].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[selectedMealTimes.includes(item) ? '' : styles.whiteBtn]}
                            className={`p-3 flex-1 ml-2 rounded-xl ${selectedMealTimes.includes(item) ? 'btn-color' : ''
                                }`}
                            onPress={() => toggleMealTime(item)}
                        >
                            <Text
                                className={`text-center text-[16px] font-medium ${selectedMealTimes.includes(item) ? 'text-white' : 'text-black'
                                    }`}
                            >
                                {item == 'breakfast' ? 'Breakfast' : item == 'dinner' ? 'Dinner' : 'Lunch'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Time Inputs */}
                {selectedMealTimes.map((meal, index) => (
                    <View key={index} className="mb-4">
                        <Text className="text-[18px] font-semibold mb-2">{meal == 'breakfast' ? 'Breakfast' : meal == 'lunch' ? 'Lunch' : 'Dinner'} Time</Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D6D6D6',
                                borderRadius: 8,
                            }}
                            className="flex-row rounded-xl items-center px-3 py-2 w-full border justify-between">
                            <TextInput
                                value={meal === 'breakfast' ? breakfastDeliveryTime : meal === 'lunch' ? lunchDeliveryTime : dinnerDeliveryTime}
                                placeholder="Enter Delivery Time"
                                className="rounded-lg text-[15px] bg-white"
                            />
                            <TouchableOpacity onPress={() => setShow(meal)}><Clock /></TouchableOpacity>
                        </View>
                        {show === meal && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="default"
                                onChange={(event, selectedTime) => onChange(event, selectedTime, meal)}
                            />
                        )}
                    </View>
                ))}

                {/* Submit Button */}
                <TouchableOpacity onPress={handleSubmit} className="btn-color p-4 rounded-lg mt-2 mb-10">
                    <Text className="text-center text-[18px] font-medium text-white">Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    btn: {
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    whiteBtn: {
        borderWidth: 1,
        borderColor: 'rgba(214, 214, 214, 0.60)',
        color: '#7B7B7B',
    },
    blueBorder: {
        borderWidth: 1,
        borderColor: '#2650D8',
        shadowColor: 'rgba(5, 194, 104, 0.20)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 4,
    },
    button: {
        flex: 1,
        height: 50,
        aspectRatio: 1,
        backgroundColor: '#2650D8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default AddKitchen;
