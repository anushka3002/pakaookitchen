import React, { useState } from "react";
import { View, Text, TextInput, Platform, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, TouchableHighlight } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "react-native-image-picker";
import Camera from '../../assets/camera.svg';
import EncryptedStorage from "react-native-encrypted-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import Date from '../../assets/date.svg'
import Search from '../../assets/search.svg'
import Info from '../../assets/info.svg'
import { useDispatch, useSelector } from "react-redux";
import { createUserData } from "../../reducers/kitchenSlice";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionStatus, request, RESULTS, PERMISSIONS } from 'react-native-permissions';

const validationSchema = Yup.object().shape({
  owner_name: Yup.string().required("Owner Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  kitchen_name: Yup.string().required("Kitchen Name is required"),
  aadhar_number: Yup.string().required("Aadhar Number is required"),
  pan_number: Yup.string().required("PAN Number is required"),
  gst_number: Yup.string().required("GST Number is required"),
  fssia_number: Yup.string().required("FSSAI Number is required"),
  fssai_expiry_date: Yup.string().required("FSSAI Expiry Date is required"),
});

const auth_token = EncryptedStorage.getItem('auth_token')

const CreateAccount = ({ navigation }) => {
  const [images, setImages] = useState({ aadharFront: null, aadharBack: null, panFront: null, panBack: null, gstImage: null, fssaiImage: null })
  const [expiryDate, setExpiryDate] = useState(new Date());
  const { otp } = useSelector(state => state.user.otp)
  const [coordinates, setCoordinates] = useState(null);
  const [show, setShow] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleImageUpload = async (imageType, onChange) => {
    try {
      let cameraPermission, galleryPermission;

      if (Platform.OS === 'ios') {
        cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
        galleryPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      } else if (Platform.OS === 'android') {
        cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
        galleryPermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }

      if (!cameraPermission || !galleryPermission) {
        console.error("Permission request returned null or undefined.");
        return;
      }

      if (cameraPermission !== RESULTS.GRANTED || galleryPermission !== RESULTS.GRANTED) {
        console.log("Camera or gallery permission not granted");
        return;
      }

      // Prompt user to choose Camera or Gallery
      Alert.alert(
        "Select Image",
        "Choose an option",
        [
          {
            text: "Camera",
            onPress: async () => {
              const response = await launchCamera({
                mediaType: 'photo',
                includeBase64: true,
                saveToPhotos: true,
              });

              handleImageResponse(response, imageType, onChange);
            },
          },
          {
            text: "Gallery",
            onPress: async () => {
              const response = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: true,
              });

              handleImageResponse(response, imageType, onChange);
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  };

  const handleImageResponse = (response, imageType, onChange) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error:', response.errorMessage);
    } else {
      if (response.assets && response.assets.length > 0) {
        const base64String = `data:image/jpeg;base64,${response.assets[0].base64}`;
        setImages((prevImages) => ({
          ...prevImages,
          [imageType]: base64String,
        }));
        onChange(base64String);
      }
    }
  };

  const handleExpiryDate = (event, selectedDate) => {
    if (Platform.OS === 'android') setShow(false);
    if (selectedDate) setExpiryDate(selectedDate);
  };
  console.log(EncryptedStorage.getItem('auth_token'), 'afsddd')

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(createUserData(data))
  };

  return (
    <ScrollView className='flex-1 bg-white px-5 py-6'>
      <Text className='text-[30px] font-bold text-center mb-1'>Create New Account</Text>
      <Text style={{ color: '#7B7B7B' }} className='text-[14px] font-medium text-center mb-6'>
        Enter your information below and get started.
      </Text>

      <View className='space-y-4'>
        <View className='mb-3'>
          <Text className='text-[15px] font-medium mb-2'>Owner Name <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="owner_name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Owner Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.owner_name && <Text className='text-red-500 text-sm'>{errors.owner_name.message}</Text>}
        </View>

        <View className='mb-3'>
          <Text className='text-[15px] font-medium mb-2'>Email <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Email"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && <Text className='text-red-500 text-sm'>{errors.email.message}</Text>}
        </View>

        <View className='mb-3'>
          <Text className='text-[15px] font-medium mb-2'>Kitchen Name <Text className='text-red-500'>*</Text></Text>
          <Controller
            control={control}
            name="kitchen_name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Kitchen Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.kitchen_name && <Text className='text-red-500 text-sm'>{errors.kitchen_name.message}</Text>}
        </View>

        <View className='mb-3'>
          <Text className='text-[15px] font-medium mb-2'>Aadhar Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="aadhar_number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Aadhar Number"
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.aadhar_number && <Text className='text-red-500 text-sm'>{errors.aadhar_number.message}</Text>}
        </View>

        <View className='mb-3'>
          <Text className='text-[15px] font-medium mb-3'>
            Aadhar Image <Text className='text-red-500'>*</Text>
          </Text>
          <View className='flex flex-row justify-between'>
            <Controller
              control={control}
              name="aadhar_front"
              render={({ field: { onChange } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload('aadharFront', onChange);
                    }}
                    style={[!images.aadharFront && styles.dashedBorder, { width: '47%', height: '121px' }]} className={`${!images.aadharFront && 'py-5 px-3'} justify-center items-center`}
                  >
                    {images.aadharFront ? (
                      <Image
                        source={{ uri: images.aadharFront }}
                        style={{ width: '100%', height: 100, borderRadius: 10 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View>
                        <Camera />
                        <Text className='text-gray-500 mt-1'>Front</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
            <Controller
              control={control}
              name="aadhar_back"
              render={({ field: { onChange } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload('aadharBack', onChange);
                    }}
                    style={[!images.aadharBack && styles.dashedBorder, { width: '47%', height: '121px' }]}
                    className={`${!images.aadharBack && 'py-5 px-3'} justify-center items-center`}
                  >
                    {images.aadharBack ? (
                      <Image
                        source={{ uri: images.aadharBack }}
                        style={{ width: '100%', height: 100, borderRadius: 10 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View>
                        <Camera />
                        <Text className="text-gray-500 mt-1">Back</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          {errors.aadharFront && (
            <Text className="text-red-500 text-sm">{errors.aadharFront.message}</Text>
          )}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">PAN Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="pan_number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter PAN Number"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.pan_number && <Text className="text-red-500 text-sm">{errors.pan_number.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-3">
            PAN Image <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex flex-row justify-between">
            <Controller
              control={control}
              name="pan_front"
              render={({ field: { onChange } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload('panFront', onChange);
                    }}
                    style={[!images.panFront && styles.dashedBorder, { width: '47%', height: '121px' }]}
                    className={`${!images.panFront && 'py-5 px-3'} justify-center items-center`}
                  >
                    {images.panFront ? (
                      <Image
                        source={{ uri: images.panFront }}
                        style={{ width: '100%', height: 100, borderRadius: 10 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View>
                        <Camera />
                        <Text className="text-gray-500 mt-1">Front</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
            <Controller
              control={control}
              name="pan_back"
              render={({ field: { onChange } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload('panBack', onChange);
                    }}
                    style={[!images.panBack && styles.dashedBorder, { width: '47%', height: '121px' }]}
                    className={`${!images.panBack && 'py-5 px-3'} justify-center items-center`}
                  >
                    {images.panBack ? (
                      <Image
                        source={{ uri: images.panBack }}
                        style={{ width: '100%', height: 100, borderRadius: 10 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View>
                        <Camera />
                        <Text className="text-gray-500 mt-1">Back</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          {errors.panFront && (
            <Text className="text-red-500 text-sm">{errors.panFront.message}</Text>
          )}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">GST Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="gst_number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter GST Number"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.gst_number && <Text className="text-red-500 text-sm">{errors.gst_number.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-3">
            GST Image <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex flex-row justify-between">
            <Controller
              control={control}
              name="gst_image"
              render={({ field: { onChange } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload('gstImage', onChange);
                    }}
                    style={[!images.gstImage && styles.dashedBorder, { width: '100%' }]}
                    className={`border-gray-300 rounded-lg ${!images.gstImage && 'px-3 py-14'} justify-center items-center`}
                  >
                    {images.gstImage ? (
                      <Image
                        source={{ uri: images.gstImage }}
                        style={{ width: '100%', height: 230, borderRadius: 10 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View>
                        <Camera />
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          {errors.gstImage && (
            <Text className="text-red-500 text-sm">{errors.gstImage.message}</Text>
          )}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">FSSAI Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="fssia_number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter FSSAI Number"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssia_number && <Text className="text-red-500 text-sm">{errors.fssia_number.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-3">
            FSSAI Image <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex flex-row justify-between">
            <Controller
              control={control}
              name="fssai_image"
              render={({ field: { onChange } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload('fssaiImage', onChange);
                    }}
                    style={[!images.fssaiImage && styles.dashedBorder, { width: '100%' }]}
                    className={`${!images.fssaiImage && 'px-3 py-14'} justify-center items-center`}
                  >
                    {images.fssaiImage ? (
                      <Image
                        source={{ uri: images.fssaiImage }}
                        style={{ width: '100%', height: 230, borderRadius: 10 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View>
                        <Camera />
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          {errors.fssaiImage && (
            <Text className="text-red-500 text-sm">{errors.fssaiImage.message}</Text>
          )}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">FSSAI Expiry Date <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="fssai_expiry_date"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter FSSAI Expiry Date"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {/* <View className="border border-gray-300 px-3 py-3 rounded-lg items-center flex-row justify-between">
          <Text className=" text-gray-400 text-md">Enter FSSAI Expiry Date</Text>
          <TouchableOpacity onPress={()=>setShow(true)}><Date/></TouchableOpacity>
          </View> */}
          {/* {show && (
            <DateTimePicker
              value={expiryDate}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={handleExpiryDate}
            />
          )} */}
          {errors.fssai_expiry_date && <Text className="text-red-500 text-sm">{errors.fssai_expiry_date.message}</Text>}
        </View>

        <View className="mb-3">
          <View className="flex-row items-center"><Text className="text-[15px] font-medium mb-2 mr-1">Kitchen Address <Text className="text-red-500">*</Text></Text><Info /></View>
          <Controller
            control={control}
            name="address_line_one"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 mb-3 rounded-lg px-3 py-3"
                placeholder="Enter Address Line 1"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssia_number && <Text className="text-red-500 text-sm">{errors.fssia_number.message}</Text>}
          <Controller
            control={control}
            name="address_line_two"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 mb-3 rounded-lg px-3 py-3"
                placeholder="Enter Address Line 2"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssia_number && <Text className="text-red-500 text-sm">{errors.fssia_number.message}</Text>}
          <Controller
            control={control}
            name="lat"
            render={({ field: { onChange, value } }) => (
              <View className="border border-gray-300 rounded-lg px-3 flex-row justify-between items-center">
                <TextInput
                  className=""
                  placeholder="Search Address"
                  onChangeText={onChange}
                  value={value}
                />
                <Search />
              </View>
            )}
          />
          {errors.fssia_number && <Text className="text-red-500 text-sm">{errors.fssia_number.message}</Text>}
        </View>
     
        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Kitchen Pincode <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="pincode"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Owner Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.owner_name && <Text className="text-red-500 text-sm">{errors.owner_name.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Bank Account Holder Name <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="bank_holder_name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Bank Account Holder Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && <Text className="text-red-500 text-sm">{errors.email.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Bank Name <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="bank_name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Kitchen Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.kitchen_name && <Text className="text-red-500 text-sm">{errors.kitchen_name.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">IFSC Code <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="ifsc_code"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Aadhar Number"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.aadhar_number && <Text className="text-red-500 text-sm">{errors.aadhar_number.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Account Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="account_number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Aadhar Number"
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.aadhar_number && <Text className="text-red-500 text-sm">{errors.aadhar_number.message}</Text>}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="btn-color py-3 rounded-lg mt-4"
      >
        <Text className="text-center text-[18px] text-white font-medium">Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddKitchen')}
        className="btn-color py-3 mb-5 rounded-xl mt-4"
      >
        <Text className="text-center text-white font-bold">Create Account</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dashedBorder: {
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderStyle: "dashed",
    borderRadius: Platform.OS === 'ios' ? 8 : 0, 
  },
})

export default CreateAccount;
