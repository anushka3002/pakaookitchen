import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, 
ScrollView, Image, StyleSheet } from 'react-native';
import Navbar from '../Components/Navbar';

const AddKitchen = ({ navigation }) => {
    const [selectedMealCategory, setSelectedMealCategory] = useState('South Indian');
    const [selectedCuisine, setSelectedCuisine] = useState('Veg');
    const [selectedMealTimes, setSelectedMealTimes] = useState(['Breakfast']);
    const [foodStyle, setFoodStyle] = useState('')
    const [foodSet, setFoodSet] = useState([])
    const [day, setDay] = useState(0)

    const food = ['Punjabi', 'Pulao']

    const toggleMealTime = (mealTime) => {
        setSelectedMealTimes((prev) =>
            prev.includes(mealTime)
                ? prev.filter((time) => time !== mealTime)
                : [...prev, mealTime]
        );
    };

    return (
        <>
            <Navbar screen={'Add Kitchen'} />
            <ScrollView className="p-4 bg-white flex-1">
                {/* Meal Category */}
                <Text className="text-[18px] font-semibold mb-2">Meal Category <Text className='text-red-500'>*</Text></Text>
                <View className="flex-row justify-between mb-4 w-full">
                    <TouchableOpacity
                        style={[selectedMealCategory == 'North Indian' ? styles.whiteBtn : '', { width: '47%' }]}
                        className={`mr-2 py-3 text-[16px] font-medium rounded-xl ${selectedMealCategory === 'South Indian' ? 'btn-color' : 'white-btn'
                            }`}
                        onPress={() => setSelectedMealCategory('South Indian')}
                    >
                        <Text
                            className={`text-center font-medium ${selectedMealCategory === 'South Indian' ? 'text-white' : 'text-black'
                                }`}
                        >
                            South Indian
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[selectedMealCategory == 'North Indian' ? '' : styles.whiteBtn, { width: '47%' }]}
                        className={` ml-2 text-[16px] font-medium py-3 rounded-lg ${selectedMealCategory === 'North Indian' ? 'btn-color' : ''
                            }`}
                        onPress={() => setSelectedMealCategory('North Indian')}
                    >
                        <Text
                            className={`text-center font-medium ${selectedMealCategory === 'North Indian' ? 'text-white' : 'text-black'
                                }`}
                        >
                            North Indian
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Cuisine Category */}
                <Text className="text-[18px] font-semibold mb-2">Cuisine Category <Text className='text-red-500'>*</Text></Text>                <View className="flex-row space-x-4 mb-4">
                    {['Veg', 'Non Veg', 'Both'].map((item, index) => (
                        <View key={index} className="flex-1 items-center">
                            <View style={{ height: 84, width: 89, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={[selectedCuisine === item ? styles.blueBorder : styles.whiteBtn, { height: 84, width: 100, justifyContent: 'center', alignItems: 'center' }]}
                                    className={`items-center rounded-xl ${selectedCuisine === item ? 'bg-white' : ''}`}
                                    onPress={() => setSelectedCuisine(item)}
                                >
                                    {item === 'Veg' && <Image source={require('../../assets/veg.png')} style={{ width: 50, height: 50 }} />}
                                    {item === 'Non Veg' && <Image source={require('../../assets/non-veg.png')} style={{ width: 50, height: 50 }} />}
                                    {item === 'Both' && <Image source={require('../../assets/both.png')} style={{ width: 80, height: 50 }} />}
                                </TouchableOpacity>
                            </View>

                            <Text style={{ color: '#7B7B7B', fontSize: 12, marginTop: 5 }} className="text-[16px] font-medium text-center">
                                {item}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Food Style */}
                <Text className="text-[18px] font-semibold mb-2">Food Style <Text className='text-red-500'>*</Text></Text>
                <View className="relative">
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#D6D6D6',
                        borderRadius: 8,
                        gap: 6
                    }} className="flex-row items-center rounded-xl px-4 py-3 bg-white">
                        {foodSet?.length > 0 && foodSet?.map((item) => (
                            <TouchableOpacity onPress={() => setFoodSet(foodSet.filter((el) => el != item))}>
                                <View style={[styles.whiteBtn]} className='flex-row bg-white px-4 py-3 rounded-xl'>
                                    <Text>{item}</Text>
                                    <Image
                                        style={{ marginLeft: 8, marginTop: 6 }}
                                        source={require('../../assets/cross.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                        <TextInput
                            onChangeText={(text) => setFoodStyle(text)}
                            placeholder="Punjabi"
                            className="flex-1 text-black"
                            value={foodStyle}
                        />
                        <Image
                            source={require('../../assets/search.png')}
                            className="w-5 h-5"
                        />
                    </View>

                    {foodStyle?.length > 1 && <View
                        className="absolute left-0 right-0 mt-2 w-full border bg-white rounded-lg shadow-lg"
                        style={{
                            top: '0%', backgroundColor: 'white', zIndex: 10, borderWidth: 1,
                            borderColor: '#D6D6D6',
                        }}
                    >
                        {food?.map((e) => (
                            <TouchableOpacity style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#D6D6D6',
                            }} onPress={() => !foodSet.includes(e) && setFoodSet([...foodSet, e])}>
                                <Text className="px-4 py-3 text-black">{e}</Text>
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
                    {['Breakfast', 'Dinner', 'Lunch'].map((item, index) => (
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
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Time Inputs */}
                {['Breakfast', 'Dinner', 'Lunch'].map((meal, index) => (
                    <View key={index} className="mb-4">
                        <Text className="text-[18px] font-semibold mb-2">{meal} Time</Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D6D6D6',
                                borderRadius: 8,
                            }}
                            className="flex-row rounded-xl items-center px-3 py-2 w-full border justify-between">
                            <TextInput
                                placeholder="Enter Delivery Time"
                                className="rounded-lg text-[15px] bg-white"
                            />
                            <Image
                                source={require('../../assets/clock.png')}
                            />
                        </View>
                    </View>
                ))}

                {/* Submit Button */}
                <TouchableOpacity className="btn-color p-4 rounded-lg mt-2">
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
        shadowColor: 'rgba(0, 0, 0, 0.14)', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5,
        elevation: 4,
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
