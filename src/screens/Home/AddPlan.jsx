import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { Controller, useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from "react-native-image-picker";

const AddPlan = ({ navigation }) => {

  const [lunch, setLunch] = useState(true)
  const [imagePreview, setImagePreview] = useState(null);

  const validationSchema = Yup.object().shape({
    planName: Yup.string().required("Plan Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    packaging: Yup.string().required("Kitchen Name is required"),
    aadharNumber: Yup.string().required("Aadhar Number is required"),
    panNumber: Yup.string().required("PAN Number is required"),
    gstNumber: Yup.string().required("GST Number is required"),
    fssaiNumber: Yup.string().required("FSSAI Number is required"),
    fssaiExpiryDate: Yup.string().required("FSSAI Expiry Date is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleImageUpload = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "photo", includeBase64: false },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          if (response.assets && response.assets.length > 0) {
            const source = { uri: response.assets[0].uri };
            setImagePreview(source);
          }
        }
      }
    );
  }

  return (
    <View className='bg-white h-full justify-between'>
      <View>
        <Navbar screen={'Plan'} />
        <View className='px-4'>
          <Text className='text-[15px] font-medium mb-2 pt-7'>Plan Name <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="planName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Plan Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.planName && <Text className='text-red-500 text-sm'>{errors.planName.message}</Text>}

          <Text className='text-[15px] font-medium mb-2 pt-7'>Packaging Preview <Image
            source={require('../../assets/info.png')}
            style={{ width: 13, height: 13 }}
          /></Text>
          <Controller
            control={control}
            name="packaging"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => {
                  handleImageUpload();
                  onChange(imagePreview);
                }}
                className=""
              >
                {imagePreview ? (
                  <Image
                    source={{ uri: imagePreview.uri }}
                  />
                ) : (
                  <View style={{
                    borderWidth: 1,
                    borderColor: '#D6D6D6',
                  }} className='flex-row w-[100%] rounded-lg px-3 py-3 justify-between'>
                    <Text className="text-gray-500 w-[90%] mt-1">Upload Packaging Preview</Text>
                    <Image
                      source={require('../../assets/upload.png')}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
          {errors.planName && <Text className='text-red-500 text-sm'>{errors.planName.message}</Text>}

          <Text className='text-[15px] font-medium mb-2 pt-7'>One Day Trial Price <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="trial"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Price"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.planName && <Text className='text-red-500 text-sm'>{errors.planName.message}</Text>}

          <Text className='text-[15px] font-medium mb-2 pt-7'>Per Plate Price <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="planName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Price"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.planName && <Text className='text-red-500 text-sm'>{errors.planName.message}</Text>}
          <View style={{ gap: 20 }} className='mt-7 flex-row items-center'>
            <TouchableOpacity onPress={() => setLunch(true)}><Text style={[lunch ? styles.blueBtn : styles.whiteBtn, {
              boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)',
            }]} className='text-[15px] font-medium text-white rounded-xl px-10 py-3'>Lunch</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setLunch(false)}><Text style={[lunch ? styles.whiteBtn : styles.blueBtn, {
              boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)',
            }]} className='text-[15px] font-medium text-white rounded-xl px-10 py-3'>Dinner</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('PlanStepper')}><View className='btn-color bottom-[32] py-3 items-center rounded-lg mx-4'><Text className='text-white text-[18px] font-medium text-center'>Next</Text></View></TouchableOpacity>
    </View>
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

export default AddPlan