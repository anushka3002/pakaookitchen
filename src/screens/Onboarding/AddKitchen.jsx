import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, StyleSheet,
} from 'react-native';
import Navbar from '../Components/Navbar';
import Veg from '../../assets/veg.svg';
import NonVeg from '../../assets/non-veg.svg';
import Both from '../../assets/both.svg';
import Search from '../../assets/search.svg';
import Clock from '../../assets/clock.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addKitchenData, getCategory, getFoodStyle } from '../../reducers/kitchenSlice';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddKitchen = ({ navigation }) => {

    const [selectedMealCategory, setSelectedMealCategory] = useState(1);
    const [selectedCuisine, setSelectedCuisine] = useState('veg');
    const [selectedMealTimes, setSelectedMealTimes] = useState(['breakfast']);
    const [foodStyleText, setFoodStyleText] = useState('')
    const { categoryData, foodStyle, addKitchen } = useSelector((state) => state?.kitchenData)
    const [foodFlag, setFoodFlag] = useState(false)
    const [foodId, setFoodId] = useState('')
    const [foodError, setFoodError] = useState(false)
    const [day, setDay] = useState(0)
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState('');
    const [showDropdown, setShowDropdown] = useState(false)
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

    const serving = [
        { name: 'Mon To Sun', id: 0 },
        { name: 'Mon To Fri', id: 1 }
    ]

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
        setShowDropdown(true)
        setFoodFlag(false)
        setFoodStyleText(text)
        if (text.length > 2) {
            dispatch(getFoodStyle(text))
        }
    }

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const handleFoodStyleSelect = (e) => {
        setFoodStyleText(e.cuisine_name);
        setFoodId(e.cuisine_id)
        setShowDropdown(false);
        setFoodFlag(true);
        setFoodError(false)
    }

    const formatTime = (value) => {
        if (value.split(':')[0].length == 1) {
            value = `0${value}`
        }
        return value;
    }

    const handleSubmit = () => {
        const data = {
            "categoryId": selectedMealCategory,
            "cuisineCategory": selectedCuisine,
            "foodStyle": foodId,
            "servingDays": day,
            "mealTime": selectedMealTimes,
            "breakfastDeliveryTime": formatTime(breakfastDeliveryTime),
            "lunchDeliveryTime": formatTime(lunchDeliveryTime),
            "dinnerDeliveryTime": formatTime(dinnerDeliveryTime),
        }
        if (foodFlag) {
            dispatch(addKitchenData(data, navigation))
        } else {
            setFoodError(true)
        }
    }

    return (
        <>
            <Navbar screen={'Add Kitchen'} />
            <ScrollView className="p-4 bg-white flex-1">
                {/* Meal Category */}
                <Text className="text-[18px] poppins-semibold mb-2">Meal Category <Text className='text-red-500'>*</Text></Text>
                <View style={{ gap: 19 }} className="flex-row justify-between mb-4">
                    {categoryData?.data?.data?.map((e, ind) => {
                        return (
                            <TouchableOpacity key={ind} onPress={() => setSelectedMealCategory(e.id)}
                                style={{ boxShadow: selectedMealCategory == e.id ? '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }}
                                className={`py-3 flex-1 w-[50%] text-[16px] poppins-medium rounded-xl ${selectedMealCategory === e.id ? 'btn-color' : ''
                                    }`}
                            >
                                <Text
                                    className={`text-center poppins-medium ${selectedMealCategory === e.id ? 'text-white' : 'text-black'
                                        }`}
                                >
                                    {e.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* Cuisine Category */}
                <Text className="text-[18px] poppins-semibold mb-2">Cuisine Category <Text className='text-red-500'>*</Text></Text>
                <View className="flex-row space-x-4 mb-4">
                    {['veg', 'nveg', 'both'].map((item, index) => (
                        <View key={index} className="flex-1 items-center">
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={[selectedCuisine == item ? styles.blueBorder : "", {
                                        boxShadow: selectedCuisine === item ? '0px 0px 10px 0px rgba(5, 194, 104, 0.20)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.14)',
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

                            <Text style={{ color: '#7B7B7B', fontSize: 12, marginTop: 5 }} className="text-[16px] poppins-medium text-center">
                                {item === 'veg' ? 'Veg' : item === 'nveg' ? 'Non Veg' : 'Both'}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Food Style */}
                <Text className="text-[18px] poppins-semibold mb-2">Food Style <Text className='text-red-500'>*</Text></Text>
                <View className="relative">
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#D6D6D6',
                        borderRadius: 8,
                        gap: 6
                    }} className="flex-row items-center rounded-xl px-4 py-2 bg-white">
                        <TextInput
                            onChangeText={handleFoodStyle}
                            placeholder="Punjabi"
                            className="flex-1 txt-grey poppins-regular"
                            value={foodStyleText}
                        />
                        <Search />
                    </View>
                    {foodError && <Text className='poppins-regular text-[12px] text-red-500 mt-1'>Select food style from the list.</Text>}

                    {foodStyleText?.length > 1 && showDropdown && <View
                        className="absolute left-0 right-0 mt-2 w-full border bg-white rounded-[10px] shadow-lg"
                        style={{
                            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.13)',
                            top: '100%', backgroundColor: 'white', zIndex: 10, borderWidth: 1,
                            borderColor: '#D6D6D6',
                        }}
                    >
                        {foodStyle?.data?.data?.map((e, ind) => (
                            <TouchableOpacity key={ind} style={{
                                // borderBottomWidth: ind!= foodStyle?.data?.data?.length-1 && 1,
                                // borderBottomColor: ind!= foodStyle?.data?.data?.length-1 && '#D6D6D6',
                            }} onPress={() => handleFoodStyleSelect(e)}>
                                <Text className="px-4 py-3 txt-grey poppins-regular">{e.cuisine_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>}
                </View>

                {/* Serving Days */}
                <Text className="text-[18px] mt-3 poppins-semibold mb-2">Serving Days <Text className='text-red-500'>*</Text></Text>
                <View style={{ gap: 19 }} className="flex-row space-x-4 mb-4 justify-between">
                    {serving.map((el, ind) => {
                        return <View key={ind} className='flex-1'>
                            <Text className='text-[16px] poppins-medium mb-2'>{el.name == 'Mon To Sun' ? 'All Day' : 'Weekday'}</Text>
                            <TouchableOpacity
                                style={{ boxShadow: day == el.id ? '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }}
                                className={`py-3 text-[16px] poppins-medium rounded-xl ${day == el.id ? 'btn-color' : ''
                                    }`}
                                onPress={() => setDay(el.id)}
                            >
                                <Text
                                    className={`text-center text-[16px] poppins-medium ${day == el.id ? 'text-white' : 'text-black'
                                        }`}
                                >
                                    {el.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    })}
                </View>

                {/* Meal Times */}
                <Text className="text-[18px] poppins-semibold mb-2">Meal Times <Text className='text-red-500'>*</Text></Text>
                <View style={{ gap: 17 }} className="flex-row mb-4">
                    {['breakfast', 'lunch', 'dinner'].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{ boxShadow: selectedMealTimes.includes(item) ? '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' : '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }}
                            className={`p-3 flex-1 rounded-xl ${selectedMealTimes.includes(item) ? 'btn-color' : ''
                                }`}
                            onPress={() => toggleMealTime(item)}
                        >
                            <Text
                                className={`text-center text-[16px] poppins-medium ${selectedMealTimes.includes(item) ? 'text-white' : 'text-black'
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
                        <Text className="text-[18px] poppins-semibold mb-2">{meal == 'breakfast' ? 'Breakfast' : meal == 'lunch' ? 'Lunch' : 'Dinner'} Time</Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D6D6D6',
                                borderRadius: 8,
                            }}
                            className="flex-row rounded-xl items-center pl-3 py-2 w-full border justify-between">
                            <TextInput
                                value={meal === 'breakfast' ? breakfastDeliveryTime : meal === 'lunch' ? lunchDeliveryTime : dinnerDeliveryTime}
                                placeholder="Enter Delivery Time"
                                className="rounded-[10px] text-[15px] bg-white poppins-regular"
                            />
                            <TouchableOpacity className='px-3 py-3' onPress={() => setShow(meal)}><Clock width={25} height={18} /></TouchableOpacity>
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
                <TouchableOpacity onPress={handleSubmit} className="btn-color p-4 rounded-xl mt-2 mb-10">
                    <Text className="text-center text-[18px] poppins-medium text-white">Submit</Text>
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
        borderRadius: 10,  // Rounded corners
        backgroundColor: '#FFF', // White background
        elevation: 10, // Required for Android shadows
        shadowColor: '#000',
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
