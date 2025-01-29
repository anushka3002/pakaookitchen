import React, { useState } from "react";
import { View, Text, TextInput, Platform, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "react-native-image-picker";

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Owner Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  kitchenName: Yup.string().required("Kitchen Name is required"),
  aadharNumber: Yup.string().required("Aadhar Number is required"),
  panNumber: Yup.string().required("PAN Number is required"),
  gstNumber: Yup.string().required("GST Number is required"),
  fssaiNumber: Yup.string().required("FSSAI Number is required"),
  fssaiExpiryDate: Yup.string().required("FSSAI Expiry Date is required"),
});

const CreateAccount = ({navigation}) => {
  const [aadharImage, setAadharImage] = useState(null);
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
            setAadharImage(source);
          }
        }
      }
    );
  }

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <ScrollView className='flex-1 bg-white px-5 py-6'>
      <Text className='text-[30px] font-bold text-center mb-1'>Create New Account</Text>
      <Text style={{color:'#7B7B7B'}} className='text-[14px] font-medium text-center mb-6'>
        Enter your information below and get started.
      </Text>

      <View className='space-y-4'>
        <View className='mb-3'>
          <Text className='text-[15px] font-medium mb-2'>Owner Name <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="ownerName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Owner Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.ownerName && <Text className='text-red-500 text-sm'>{errors.ownerName.message}</Text>}
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
            name="kitchenName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='border border-gray-300 rounded-lg px-3 py-3'
                placeholder="Enter Kitchen Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.kitchenName && <Text className='text-red-500 text-sm'>{errors.kitchenName.message}</Text>}
        </View>

        <View className='mb-3'>
          <Text className='text-[15px] font-medium mb-2'>Aadhar Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="aadharNumber"
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
          {errors.aadharNumber && <Text className='text-red-500 text-sm'>{errors.aadharNumber.message}</Text>}
        </View>

        <View className='mb-3'>
      <Text className='text-[15px] font-medium mb-3'>
        Aadhar Image <Text className='text-red-500'>*</Text>
      </Text>
      <View className='flex flex-row justify-between'>
      <Controller
        control={control}
        name="aadharImage"
        render={({ field: { onChange } }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload();
                onChange(aadharImage); 
              }}
              style={[styles.dashedBorder, { width: '47%', height:'121px' }]} className='px-3 py-6 justify-center items-center'
            >
              {aadharImage ? (
                <Image
                  source={{ uri: aadharImage.uri }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              ) : (
                <View>
                  <Image 
                  source={require('../../assets/camera.png')}/>
                  <Text className='text-gray-500 mt-1'>Front</Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      />
      <Controller
        control={control}
        name="aadharImage"
        render={({ field: { onChange } }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload();
                onChange(aadharImage); 
              }}
              style={[styles.dashedBorder, { width: '47%', height:'121px' }]}               
              className="border border-gray-300 rounded-lg px-3 py-6 justify-center items-center"
              >
                {aadharImage ? (
                  <Image
                    source={{ uri: aadharImage.uri }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                ) : (
                  <View>
                    <Image 
                    source={require('../../assets/camera.png')}/>
                    <Text className="text-gray-500 mt-1">Back</Text>
                  </View>
                )}
            </TouchableOpacity>
          </>
        )}
      />
      </View>
      {errors.aadharImage && (
        <Text className="text-red-500 text-sm">{errors.aadharImage.message}</Text>
      )}
    </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">PAN Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="panNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter PAN Number"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.panNumber && <Text className="text-red-500 text-sm">{errors.panNumber.message}</Text>}
        </View>

        <View className="mb-3">
      <Text className="text-[15px] font-medium mb-3">
        PAN Image <Text className="text-red-500">*</Text>
      </Text>
      <View className="flex flex-row justify-between">
      <Controller
        control={control}
        name="aadharImage"
        render={({ field: { onChange } }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload();
                onChange(aadharImage); 
              }}
              style={[styles.dashedBorder, { width: '47%' }]}                   
              className="border border-gray-300 rounded-lg px-3 py-6 justify-center items-center"
            >
              {aadharImage ? (
                <Image
                  source={{ uri: aadharImage.uri }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              ) : (
                <View>
                  <Image 
                  source={require('../../assets/camera.png')}/>
                  <Text className="text-gray-500 mt-1">Front</Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      />
      <Controller
        control={control}
        name="aadharImage"
        render={({ field: { onChange } }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload();
                onChange(aadharImage); 
              }}
              style={[styles.dashedBorder, { width: '47%' }]}     
              className="border border-gray-300 rounded-lg px-3 py-6 justify-center items-center"
              >
                {aadharImage ? (
                  <Image
                    source={{ uri: aadharImage.uri }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                ) : (
                  <View>
                    <Image 
                    source={require('../../assets/camera.png')}/>
                    <Text className="text-gray-500 mt-1">Back</Text>
                  </View>
                )}
            </TouchableOpacity>
          </>
        )}
      />
      </View>
      {errors.aadharImage && (
        <Text className="text-red-500 text-sm">{errors.aadharImage.message}</Text>
      )}
    </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">GST Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="gstNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter GST Number"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.gstNumber && <Text className="text-red-500 text-sm">{errors.gstNumber.message}</Text>}
        </View>

        <View className="mb-3">
      <Text className="text-[15px] font-medium mb-3">
        GST Image <Text className="text-red-500">*</Text>
      </Text>
      <View className="flex flex-row justify-between">
      <Controller
        control={control}
        name="aadharImage"
        render={({ field: { onChange } }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload();
                onChange(aadharImage); 
              }}
              style={[styles.dashedBorder, { width: '100%' }]}     
              className="border border-dashed border-gray-300 rounded-lg px-3 py-6 justify-center items-center"
            >
              {aadharImage ? (
                <Image
                  source={{ uri: aadharImage.uri }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              ) : (
                <View>
                  <Image 
                  source={require('../../assets/camera.png')}/>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      />
      </View>
      {errors.aadharImage && (
        <Text className="text-red-500 text-sm">{errors.aadharImage.message}</Text>
      )}
    </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">FSSAI Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="fssaiNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter FSSAI Number"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssaiNumber && <Text className="text-red-500 text-sm">{errors.fssaiNumber.message}</Text>}
        </View>

        <View className="mb-3">
      <Text className="text-[15px] font-medium mb-3">
        FSSAI Image <Text className="text-red-500">*</Text>
      </Text>
      <View className="flex flex-row justify-between">
      <Controller
        control={control}
        name="aadharImage"
        render={({ field: { onChange } }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload();
                onChange(aadharImage); 
              }}
              style={[styles.dashedBorder, { width: '100%' }]}     
              className="border border-dashed border-gray-300 rounded-lg px-3 py-6 justify-center items-center"
            >
              {aadharImage ? (
                <Image
                  source={{ uri: aadharImage.uri }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              ) : (
                <View>
                  <Image 
                  source={require('../../assets/camera.png')}/>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      />
      </View>
      {errors.aadharImage && (
        <Text className="text-red-500 text-sm">{errors.aadharImage.message}</Text>
      )}
    </View>

    <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">FSSAI Expiry Date <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="fssaiExpiryDate"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter FSSAI Expiry Date"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssaiExpiryDate && <Text className="text-red-500 text-sm">{errors.fssaiExpiryDate.message}</Text>}
        </View>

    <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Kitchen Address <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="fssaiNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 mb-3 rounded-lg px-3 py-3"
                placeholder="Enter Address Line 1"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssaiNumber && <Text className="text-red-500 text-sm">{errors.fssaiNumber.message}</Text>}
          <Controller
            control={control}
            name="fssaiNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 mb-3 rounded-lg px-3 py-3"
                placeholder="Enter Address Line 2"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssaiNumber && <Text className="text-red-500 text-sm">{errors.fssaiNumber.message}</Text>}
          <Controller
            control={control}
            name="fssaiNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Search Address"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fssaiNumber && <Text className="text-red-500 text-sm">{errors.fssaiNumber.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Kitchen Pincode <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="ownerName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Owner Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.ownerName && <Text className="text-red-500 text-sm">{errors.ownerName.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Bank Account Holder Name <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Email"
                keyboardType="email-address"
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
            name="kitchenName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder="Enter Kitchen Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.kitchenName && <Text className="text-red-500 text-sm">{errors.kitchenName.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">IFSC Code <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="aadharNumber"
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
          {errors.aadharNumber && <Text className="text-red-500 text-sm">{errors.aadharNumber.message}</Text>}
        </View>

        <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">Account Number <Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name="aadharNumber"
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
          {errors.aadharNumber && <Text className="text-red-500 text-sm">{errors.aadharNumber.message}</Text>}
        </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="btn-color py-3 rounded-lg mt-4"
        >
          <Text className="text-center text-[18px] text-white font-medium">Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigation.navigate('AddKitchen')}
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
    borderRadius: Platform.OS === 'ios' ? 8 : 0, // Fix for Android
  }
})

export default CreateAccount;
