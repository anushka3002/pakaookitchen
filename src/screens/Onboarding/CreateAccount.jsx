import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, Platform, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, ScrollView,
  TouchableWithoutFeedback, PermissionsAndroid, BackHandler, Alert,
  SafeAreaView
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateImg from '../../assets/date.svg'
import Search from '../../assets/search.svg'
import Info from '../../assets/info.svg'
import { useDispatch, useSelector } from "react-redux";
import { createUserData } from "../../reducers/kitchenSlice";
import { validationSchema, validBanks } from "../../constant";
import { getAddressFromCoordinates, getGeoLocation, searchMapData } from "../../reducers/mapSlice";
import Map from "../Components/Map";
import CustomTextInput from "../Components/CustomTextInput";
import CustomImageController from "../Components/CustomImageController";
import Geolocation from '@react-native-community/geolocation';
import { getAllInfo } from "../../reducers/profileSlice";

const CreateAccount = ({ navigation }) => {
  const [images, setImages] = useState({
    aadharFront: null,
    aadharBack: null, panFront: null, panBack: null, gstImage: null, fssaiImage: null
  })
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [convertedExpiryDate, setConvertedExpiryDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false);
  const [showList, setShowList] = useState(false)
  const { searchlocation, geolocation, locationCord, loading } = useSelector(state => state.map)
  const { allInfoData } = useSelector(state => state.profileData)
  const { createProfile } = useSelector(state => state.kitchenData)
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState('')
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSelectBank = (bank) => {
    setValue('bank_name', bank.value);
    setModalVisible(false);
  };

  const handleExpiryDate = (event, selectedDate) => {
    const date = new Date(event.nativeEvent.timestamp);
    setExpiryDate(selectedDate)
    const formattedDate = date.toLocaleDateString('en-GB');
    setConvertedExpiryDate(formattedDate)
    setValue('fssai_expiry_date', formattedDate)
    setShow(false)
  };

  const handleSearchLocation = (text) => {
    if (text.length > 2) {
      if (searchlocation?.data?.predictions?.length > 0) {
        setShowList(true)
      }
    }
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission denied");
        return;
      }
    }
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    requestLocationPermission()
    dispatch(getAllInfo())
  }, []);

  useEffect(() => {
    dispatch(getAddressFromCoordinates(location?.latitude, location?.longitude));
  }, [location])

  useEffect(() => {
    if (locationCord?.data) {
      handleLocation(locationCord?.data, 'auto')
    }
  }, [locationCord?.data])

  const handleLocation = (value, type) => {
    if (type == 'manual') {
      setQuery(value);
    }
    setShowList(false);
    dispatch(getGeoLocation(value));
    setSelectedLocation(value);

    const words = value.split(' ');
    let addressLineOne = words.slice(0, 10).join(' ');
    if (addressLineOne.endsWith(',')) {
      addressLineOne = addressLineOne.slice(0, -1);
    }
    const addressLineTwo = words.slice(10).join(' ');
    setValue('address_line_one', addressLineOne);
    setValue('address_line_two', addressLineTwo);
    setValue('lat', location?.latitude)
    setValue('long', location?.longitude)
  };

  // useEffect(() => {
  //   if (page == 'edit') {
  //     if (allInfoData?.data?.data) {
  //       const formData = allInfoData.data.data;
  //       Object.entries(formData).forEach(([key, value]) => {
  //         if (typeof value != "object") {
  //           setValue(key, value);
  //         } else if (typeof value === "object" && value !== null) {
  //           Object.entries(value).forEach(([nestedKey, nestedValue]) => {
  //             setValue(nestedKey, nestedValue);
  //             if (key == 'signedUrls') {
  //               setImages(prevImages => ({
  //                 ...prevImages,
  //                 ...Object.fromEntries(
  //                   Object.entries(value).map(([nestedKey, nestedValue]) => [
  //                     nestedKey.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()), // Convert snake_case to camelCase
  //                     nestedValue
  //                   ])
  //                 )
  //               }));
  //             }
  //           });
  //         }
  //       });
  //     }
  //   }
  // }, [page]); //mvp 2

  const onSubmit = async (data) => {
    dispatch(createUserData(data))
  };

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

  useEffect(() => {
    if (createProfile?.data?.data?.user_data?.status === 'pending') {
      navigation.navigate('Pending');
    } else if (createProfile?.data?.data?.user_data?.status === 'rejected') {
      navigation.navigate('Rejected');
    } else if (createProfile?.data?.data?.user_data?.status === 'approved') {
      navigation.navigate('Approved');
    }
  }, [createProfile])

  return (
    <SafeAreaView>
      <View className="h-screen">
        <ScrollView className='flex-1 bg-white px-5 py-6'>
          <Text className='text-[29px] poppins-bold text-center mb-1'>Create New Account</Text>
          <Text style={{ color: '#7B7B7B' }} className='text-[14px] poppins-medium text-center mb-6'>
            Enter your information below and get started.
          </Text>

          <View className='space-y-4'>
            <CustomTextInput control={control} label={'Owner Name '} name={'owner_name'} placeholder={'Enter Owner Name'} errors={errors} capitalize={false} />
            <CustomTextInput control={control} label={'Email '} name={'email'} placeholder={'Enter Email'} errors={errors} capitalize={false} />
            <CustomTextInput control={control} label={'Kitchen Name '} name={'kitchen_name'} placeholder={'Enter Kitchen Name'} errors={errors} capitalize={false} />
            <CustomTextInput control={control} label={'Aadhar Number '} name={'aadhar_number'} placeholder={'Enter Aadhar Number'} errors={errors} capitalize={false} keyboard={'number-pad'} />

            <View className='mb-[20]'>
              <Text className='text-[15px] poppins-medium mb-[14]'>
                Aadhar Image <Text className='text-red-500'>*</Text>
              </Text>
              <View className='flex flex-row justify-between'>
                <CustomImageController control={control} controllerName={'aadhar_front'} imageValue={'aadharFront'} setImages={setImages} images={images} imageName={'Front'} />
                <CustomImageController control={control} controllerName={'aadhar_back'} imageValue={'aadharBack'} setImages={setImages} images={images} imageName={'Back'} />
              </View>
              {errors.aadhar_front && (
                <Text className="text-red-500 text-sm">{errors.aadhar_front.message}</Text>
              )}
              {errors.aadhar_back && (
                <Text className="text-red-500 mt-1 text-sm">{errors.aadhar_back.message}</Text>
              )}
            </View>

            <CustomTextInput control={control} label={'PAN Number '} name={'pan_number'} placeholder={'Enter PAN Number'} errors={errors} capitalize={true} />

            <View className="mb-[20]">
              <Text className="text-[15px] poppins-medium mb-[14]">
                PAN Image <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex flex-row justify-between">
                <CustomImageController control={control} controllerName={'pan_front'} imageValue={'panFront'} setImages={setImages} images={images} imageName={'Front'} />
                <CustomImageController control={control} controllerName={'pan_back'} imageValue={'panBack'} setImages={setImages} images={images} imageName={'Back'} />
              </View>
              {errors.pan_front && (
                <Text className="text-red-500 text-sm">{errors.pan_front.message}</Text>
              )}
              {errors.pan_back && (
                <Text className="text-red-500 text-sm mt-1">{errors.pan_back.message}</Text>
              )}
            </View>

            <CustomTextInput control={control} label={'GST Number '} name={'gst_number'} placeholder={'Enter GST Number'} errors={errors} capitalize={true} />

            <View className="mb-[20]">
              <Text className="text-[15px] poppins-medium mb-[14]">
                GST Image <Text className="text-red-500">*</Text>
              </Text>

              <CustomImageController control={control} controllerName={'gst_image'} imageValue={'gstImage'} setImages={setImages} images={images} imageName={'Back'} />

              {errors.gst_image && (
                <Text className="text-red-500 text-sm">{errors.gst_image.message}</Text>
              )}
            </View>

            <CustomTextInput control={control} label={'FSSAI Number '} name={'fssia_number'} placeholder={'Enter FSSAI Number'} errors={errors} capitalize={true} />
            <View className="mb-[20]">
              <Text className="text-[15px] poppins-medium mb-[14]">
                FSSAI Image <Text className="text-red-500">*</Text>
              </Text>
              <CustomImageController control={control} controllerName={'fssai_image'} imageValue={'fssaiImage'} setImages={setImages} images={images} imageName={'Back'} />
              {errors.fssai_image && (
                <Text className="text-red-500 text-sm">{errors.fssai_image.message}</Text>
              )}
            </View>

            <View className="mb-[20]">
              <Text className="text-[15px] poppins-medium mb-[14]">FSSAI Expiry Date <Text className="text-red-500">*</Text></Text>
              <View className="border border-gray-300 px-3 rounded-[10px] items-center flex-row justify-between">
                <TextInput
                  placeholder="Enter FSSAI Expiry Date"
                  className="poppins-regular py-3"
                  onChangeText={(e) => {
                    setConvertedExpiryDate(e);
                    setValue('fssai_expiry_date', e)
                  }}
                  value={convertedExpiryDate}
                />
                <TouchableOpacity onPress={() => setShow(true)}><DateImg /></TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  value={expiryDate}
                  mode="date"
                  display="default"
                  onChange={handleExpiryDate}
                />
              )}
              {errors.fssai_expiry_date && <Text className="text-red-500 text-sm">{errors.fssai_expiry_date.message}</Text>}
            </View>

            <View className="mb-[20]">
              <View className="flex-row items-center"><Text className="text-[15px] poppins-medium mb-[14] mr-1">Kitchen Address <Text className="text-red-500">*</Text></Text><Info /></View>
              <Controller
                control={control}
                name="address_line_one"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border poppins-regular border-gray-300 mb-[20] rounded-[10px] px-3 py-3"
                    placeholder="Enter Address Line 1"
                    onChangeText={onChange}
                    value={value}
                    textAlign="left"
                    multiline={true}
                    scrollEnabled={false}
                  />
                )}
              />
              <Controller
                control={control}
                name="address_line_two"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border poppins-regular border-gray-300 rounded-[10px] px-3 py-3"
                    placeholder="Enter Address Line 2"
                    onChangeText={onChange}
                    value={value}
                    textAlign="left"
                    multiline={true}
                    scrollEnabled={false}
                  />
                )}
              />
              {errors.address_line_one && <Text className="text-red-500 poppins-regular text-sm">{errors.address_line_one.message}</Text>}
            </View>
            <View className="border mb-[14] border-gray-300 rounded-[10px] px-3 flex-row justify-between items-center">
              <TextInput
                className="w-[90%] poppins-regular py-3"
                placeholder="Search Address"
                value={query}
                onChangeText={(text) => {
                  setQuery(text);
                  handleSearchLocation(text)
                  dispatch(searchMapData(text))
                }}
                numberOfLines={1}
              />
              <Search />
            </View>

            {showList && <View>
              {searchlocation?.data?.predictions.map((item, ind) => (
                <TouchableOpacity key={ind}
                  style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
                  onPress={() => {
                    handleLocation(item.description, 'manual')
                  }}
                >
                  <Text className="poppins-regular">{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>}

            {/* map component */}
            <Map geolocation={geolocation} getCurrentLocation={getCurrentLocation} selectedLocation={selectedLocation} />

            <CustomTextInput control={control} label={'Kitchen Pincode '} name={'pincode'} placeholder={'Enter Kitchen Pincode'} errors={errors} keyboard={'number-pad'} />
            <CustomTextInput control={control} label={'Bank Account Holder Name '} name={'bank_holder_name'} placeholder={'Enter Bank Account Holder Name'} errors={errors} />

            <View className="mb-[20]">
              <Text className="text-[15px] poppins-medium mb-[14] leading-none">
                Bank Name <Text className="text-red-500 poppins-regular">*</Text>
              </Text>
              <Controller
                control={control}
                name="bank_name"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <TextInput
                      className="border poppins-regular border-gray-300 rounded-[10px] px-3 py-3"
                      placeholder="Select Bank"
                      onChangeText={onChange}
                      value={value}
                      readOnly={true}
                      textAlign="left"
                      multiline={true}
                      scrollEnabled={false}
                    />
                  </TouchableOpacity>
                )}
              />
              {errors.bank_name && (
                <Text className="text-red-500 text-sm">{errors.bank_name.message}</Text>
              )}
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalBackdrop} />
              </TouchableWithoutFeedback>
              <View className="flex-1 justify-center items-center">
                <View style={styles.modalContent}>
                  <Text className="text-[18px] poppins-bold mb-5 text-center">Select Bank</Text>
                  {validBanks.map((bank, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectBank(bank)}
                      className="py-3 px-4"
                    >
                      <Text className="text-[15px] poppins-regular">{bank.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
            <CustomTextInput control={control} label={'IFSC Code '} name={'ifsc_code'} placeholder={'Enter IFSC Code'} errors={errors} capitalize={true} />
            <CustomTextInput control={control} label={'Account Number '} name={'account_number'} placeholder={'Enter Account Number'} errors={errors} keyboard={'number-pad'} />
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`btn-color py-3 rounded-[10px] mt-4 ${Platform.OS == 'ios' ? 'mb-28' : 'mb-10'}`}
          >
            <Text className="text-center text-[18px] text-white poppins-medium">Create Account</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashedBorder: {
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderStyle: "dashed",
    borderRadius: Platform.OS === 'ios' ? 8 : 0,
  },
  dropdownTouchable: {
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 214,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  poppinsBlack: {
    fontFamily: 'Poppins-Black'
  }
});

export default CreateAccount;
