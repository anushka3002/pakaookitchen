import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { handleImageUpload } from '../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { addPlanDetails } from '../../../reducers/planSlice';
import Navbar from '../../Components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../../Loader';

// Images
import Info from '../../../assets/info.svg';
import Upload from '../../../assets/upload.svg';
import PackPreview from '../../../assets/pack-preview.svg'

const AddPlan = ({ navigation }) => {

  const [mealTime, setMealTime] = useState('')
  const { planDetails, loading } = useSelector(state => state.plan)
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch()

  const { data } = planDetails


  const validationSchema = Yup.object().shape({
    planName: Yup.string().required("Plan name is required"),
    packagingPreview: Yup.string().required('Packaging preview is required'),
    trial_price: Yup.number().required('Trial price is required'),
    vegPrice: data.data.meal_type.veg && Yup.number().required('Veg plate price is required'),
    nvegPrice: data.data.meal_type.nveg && Yup.number().required('Non veg plate price is required'),
  });


  useEffect(() => {
    setMealTime(planDetails?.data?.data?.mealNames[0])
  }, [])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      mealTime: data.mealTime || mealTime,
    };
    dispatch(addPlanDetails(updatedData, navigation))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

      <Navbar screen={'Plan'} />
      {loading ? <Loader /> :
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
          style={{ flex: 1, backgroundColor: "#fff" }}>
          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }} style={{ flex: 1 }}>
            <View className='px-4'>
              <TouchableOpacity onPress={() => navigation.navigate('PlanStepper')}><Text className='text-[15px] poppins-medium mb-2 pt-7'>Plan Name <Text className="text-red-500">*</Text></Text></TouchableOpacity>
              <Controller
                control={control}
                name="planName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className='border poppins-regular text-[15px] border-gray-300 rounded-[10px] px-3 py-3'
                    placeholderTextColor="#7B7B7B"
                    placeholder="Enter Plan Name"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.planName && <Text className='text-red-500 poppins-regular text-xs mt-1'>{errors.planName.message}</Text>}
              <View className='d-flex py-3' style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Text className='text-[15px] poppins-medium'>Upload Packaging Preview <Text className="text-red-500">*</Text></Text>
                </View>
                {/* <Info /> */}
              </View>


              <View className='w-full flex-row justify-between border border-gray-300 rounded-[10px] py-[18px] px-[25px] items-center'>
                {imagePreview === null ?
                  <View style={[{ width: 76, height: 72 }, !imagePreview && styles.bgForImage]} className="d-flex justify-center items-center">
                    <PackPreview />
                  </View>
                  :
                  <View style={[{ width: 76, height: 72 }, !imagePreview && styles.dashedBorder]}>
                    <ImageBackground
                      source={{ uri: imagePreview }}
                      style={{ width: '100%', height: 72, borderRadius: 10 }}
                      resizeMode="contain"
                      className='items-center justify-center'
                    />
                  </View>
                }
                <Controller
                  control={control}
                  name="packagingPreview"
                  render={({ field: { onChange } }) => (
                    <TouchableOpacity onPress={() => handleImageUpload('', onChange, setImagePreview)} className='border flex-row rounded-[50px] border-blue-300 py-2 items-center px-[20px]'>
                      <Upload />
                      <Text className='text-[14px] poppins-regular txt-blue ml-2'>Upload Photo</Text>
                    </TouchableOpacity>
                  )} />
              </View>
              {errors.packagingPreview && <Text className='text-red-500 poppins-regular text-xs mt-1'>{errors.packagingPreview.message}</Text>}

              <Text className='text-[15px] poppins-medium mb-2 pt-4'>One Day Trial Price <Text className="text-red-500">*</Text></Text>
              <Controller
                control={control}
                name="trial_price"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className='border poppins-regular text-[15px] border-gray-300 rounded-[10px] px-3 py-3'
                    placeholderTextColor="#7B7B7B"
                    placeholder="Enter Price"
                    keyboardType='numeric'
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.trial_price && <Text className='text-red-500 poppins-regular text-xs mt-1'>{errors.trial_price.message}</Text>}

              {data.data.meal_type.veg &&
                <>
                  <Text className='text-[15px] poppins-medium mb-2 pt-4'>Veg Plate Price <Text className="text-red-500">*</Text></Text>
                  <Controller
                    control={control}
                    name="vegPrice"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className='border poppins-regular text-[15px] border-gray-300 rounded-[10px] px-3 py-3'
                        placeholderTextColor="#7B7B7B"
                        placeholder="Enter Price"
                        keyboardType='numeric'
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />

                  {errors.vegPrice && <Text className='text-red-500 poppins-regular text-xs mt-1'>{errors.vegPrice.message}</Text>}
                </>
              }

              {data.data.meal_type.nveg &&
                <>
                  <Text className='text-[15px] poppins-medium mb-2 pt-4'>Nov veg Plate Price <Text className="text-red-500">*</Text></Text>
                  <Controller
                    control={control}
                    name="nvegPrice"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className='border poppins-regular text-[15px] border-gray-300 rounded-[10px] px-3 py-3'
                        placeholderTextColor="#7B7B7B"
                        placeholder="Enter Price"
                        keyboardType='numeric'
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.nvegPrice && <Text className='text-red-500 poppins-regular text-xs mt-1'>{errors.nvegPrice.message}</Text>}
                </>
              }

              <View style={{ gap: 20 }} className='mt-7 flex-row flex-wrap items-center'>
                {planDetails?.data?.data?.mealNames.map((el, ind) => {
                  return <TouchableOpacity key={ind} onPress={() => { setMealTime(el); setValue('mealTime', el); }}><Text style={[mealTime == el ? styles.blueBtn : styles.whiteBtn, {
                    boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)',
                  }]} className='text-[15px] poppins-medium text-white rounded-xl px-8 py-2'>{el.split('')[0].toUpperCase() + el.slice(1)}</Text></TouchableOpacity>
                })}
              </View>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <View className='btn-color mt-5 mb-3 py-3 items-center rounded-[10px]'><Text className='text-white text-[18px] poppins-medium text-center'>Next</Text></View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      }
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
  },
  dashedBorder: {
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderStyle: "dashed",
    borderRadius: Platform.OS === 'ios' ? 8 : 0,
  },
  bgForImage: {
    backgroundColor: '#7997F9',
    borderRadius: Platform.OS === 'ios' ? 8 : 8,
  }
})

export default AddPlan