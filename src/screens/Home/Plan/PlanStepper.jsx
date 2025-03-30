import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
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
import VerticalBar from '../../../assets/vertical-bar'
import Drop from '../../../assets/drop'
import { useDispatch, useSelector } from 'react-redux'
import { addFoodDetails, getMenuDraft, getPlanDetails } from '../../../reducers/planSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSelectedDay, storeMenuData, updateSelectedDay } from '../../../constant'
import Loader from '../../../Loader'
import Back from '../../../assets/back.svg';
import { useFocusEffect } from '@react-navigation/native'

const PlanStepper = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { planId, planData, ind, edit } = route.params
  // Api responses
  const { menuDraft, planDetails, addItemDetails, loading } = useSelector(state => state.plan)
  const [selectedDay, setSelectedDay] = useState(menuDraft?.data?.data?.menu[0].id);
  const [selectedMenu, setSelectedMenu] = useState()
  const [foodType, setFoodType] = useState('')
  const [stepperLoader, setStepperLoader] = useState(false)
  const [vegFoodItem, setVegFoodItem] = useState("");
  const [vegFoodList, setVegFoodList] = useState([]);
  const [nvegFoodItem, setNvegFoodItem] = useState("");
  const [nvegFoodList, setNvegFoodList] = useState([]);
  const [dropdown, setDropdown] = useState(-1)
  const [nvegDropdown, setNvegDropdown] = useState(-1)
  const [selectedUnit, setSelectedUnit] = useState('gm')
  const [loader, setLoader] = useState(true)
  const [menuIds, setMenuIds] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (menuDraft?.data?.data?.menu) {
        setMenuIds(menuDraft.data.data.menu.map(item => item.id));
        caller(); // Ensure caller runs only when data is ready
      }
    }, [menuDraft])
  );
  

  const addFoodItem = (type) => {
    if (type == 'veg') {
      if (vegFoodItem.trim() !== "") {
        setVegFoodList([...vegFoodList, { item_name: vegFoodItem, quantity: "", weight: "" }]);
        setVegFoodItem("");
      }
    } else {
      if (nvegFoodItem.trim() !== "") {
        setNvegFoodList([...nvegFoodList, { item_name: nvegFoodItem, quantity: "", weight: "" }]);
        setNvegFoodItem("");
      }
    }
  };

  const updateFoodItem = (index, field, value, type) => {
    if (type === "veg") {
      setVegFoodList((prevList) =>
        prevList.map((item, i) =>
          i === index
            ? { ...item, [field]: value } // Create a new object with updated field
            : item
        )
      );
    } else {
      setNvegFoodList((prevList) =>
        prevList.map((item, i) =>
          i === index
            ? { ...item, [field]: value } // Create a new object with updated field
            : item
        )
      );
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
    if (type === "veg") {
      setVegFoodList((prevList) =>
        prevList.map((item, i) =>
          i === index
            ? {
              ...item, // Copy all existing properties
              selectedUnit: unit, // Add or update `selectedUnit`
              quantity: unit === "gm" ? "" : item.quantity,
              weight: unit === "gm" ? item.weight : "",
            }
            : item
        )
      );
    } else {
      setNvegFoodList((prevList) =>
        prevList.map((item, i) =>
          i === index
            ? {
              ...item,
              selectedUnit: unit,
              quantity: unit === "gm" ? "" : item.quantity,
              weight: unit === "gm" ? item.weight : "",
            }
            : item
        )
      );
    }
  };
  const elm = {
    status: 'pending'
  }


  useFocusEffect(
    useCallback(() => {
      if (nextButtonText !== 'preview') {
        dispatch(getMenuDraft(planId, 0, 0, 1, null, elm, null)).then(() => {
          setLoader(true)
        });
      }
    }, [planId, addItemDetails])
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     caller();
  //   }, [menuDraft])
  // );

  const menuData = menuDraft?.data?.data?.menu

  console.log("MenuData from api", menuData)

  const caller = async () => {
    if (!menuData || menuData.length === 0) {
      console.log("caller() - Skipped because menuData is not available yet");
      return;
    }

    // console.log("Caller:: Called()")
    const currentSelectedCheck = await getSelectedDay() || {}
    // console.log("cross 1", currentSelectedCheck)
    let storeData;
    // console.log(Object.keys(currentSelectedCheck).length === 0)
    // console.log("Debugging", menuData?.filter(item => item.id === currentSelectedCheck.selectedDay))
    if (Object.keys(currentSelectedCheck).length === 0 || menuData?.filter(item => item.id === currentSelectedCheck.selectedDay).length === 0) {
      console.log("I am here", menuData)
      storeData = false
      await storeMenuData(menuData)
    }
    console.log(storeData)

    let selectedMenu

    if (storeData === false) {
      setSelectedDay(menuData[0].id)
      selectedMenu = menuData?.filter(item => item.id === menuData[0].id);
    } else {
      const currentSelected = await getSelectedDay()
      console.log("CUrrent new selected date", currentSelected)
      setSelectedDay(currentSelected.selectedDay)
      selectedMenu = menuData?.filter(item => item.id === currentSelected.selectedDay);
    }


    setLoader(false)
    setSelectedMenu(selectedMenu[0])
    setVegFoodList(selectedMenu[0]?.vegItem)
    setNvegFoodList(selectedMenu[0]?.nvegItem)
    if (selectedMenu[0].veg !== null && selectedMenu[0].nveg !== null) {
      setFoodType(selectedMenu[0]?.veg === 1 && selectedMenu[0]?.nveg === 1 ? 'both' : selectedMenu[0].nveg === 1 ? 'nveg' : 'veg')
    }
  }
  // useEffect(() => {
  //   setLoader(false)
  // }, [selectedMenu])
  // handle Next and Previous Value

  // Button Text Logic

  const nextButtonText = selectedDay === menuIds[menuIds?.length - 1] ? "Preview" : "Next";
  const isPrevDisabled = selectedDay === menuIds[0];

  const handleNext = async () => {
    if (nextButtonText === 'Preview') {
      await updateSelectedDay(menuDraft?.data?.data?.menu[0].id, 'preview')
      setStepperLoader(true)
      const currentIndex = menuIds.indexOf(selectedDay);
      if (currentIndex < menuIds.length - 1) {
        setSelectedDay(menuIds[currentIndex + 1]); // Move to next ID
        updateSelectedDay(menuIds[currentIndex + 1])
      }
      const data = {
        menuId: selectedDay,
        veg: vegFoodList.length == 0 ? 0 : 1,
        nveg: nvegFoodList.length == 0 ? 0 : 1,
        vegItems: vegFoodList,
        nvegItems: nvegFoodList
      }
      dispatch(addFoodDetails(data)).then(async () => {
        setStepperLoader(false);
        dispatch(getMenuDraft(planId, 0, 0, 1, null, elm, null));
        navigation.navigate('PlanDetails', { planData: planData, ind: ind, editMenu: 0 })
        const currentSelected = await getSelectedDay()
        const selectedMenu = menuData.filter(item => item.id === currentSelected.selectedDay);
        console.log(selectedMenu[0])
        setSelectedMenu(selectedMenu[0])
        setVegFoodItem('');
        if (selectedMenu.veg !== null && selectedMenu.nveg !== null) {
          setFoodType(selectedMenu.veg === 1 && selectedMenu.nveg === 1 ? 'both' : selectedMenu.nveg === 1 ? 'nveg' : 'veg')
        }
        setNvegFoodItem('');
        setNvegFoodList(selectedMenu[0]?.nvegItem);
        setVegFoodList(selectedMenu[0]?.vegItem);
        const { status } = planData
        if (status == 'approved') {
          navigation.navigate('PlanDetails', { planData: planData, ind: ind, editMenu: 1 })
        } else {
          navigation.navigate('PlanDetails', { planData: planData, ind: ind, editMenu: 0 })
        }
      })
    } else {
      setStepperLoader(true)
      const currentIndex = menuIds.indexOf(selectedDay);
      if (currentIndex < menuIds.length - 1) {
        setSelectedDay(menuIds[currentIndex + 1]); // Move to next ID
        updateSelectedDay(menuIds[currentIndex + 1])
      }
      const data = {
        menuId: selectedDay,
        veg: vegFoodList.length == 0 ? 0 : 1,
        nveg: nvegFoodList.length == 0 ? 0 : 1,
        vegItems: vegFoodList,
        nvegItems: nvegFoodList
      }
      dispatch(addFoodDetails(data)).then(async () => {
        setStepperLoader(false);
        dispatch(getMenuDraft(planId, 0, 0, 1, null, elm, null));
        const currentSelected = await getSelectedDay()
        const selectedMenu = menuData.filter(item => item.id === currentSelected.selectedDay);
        console.log(selectedMenu[0])
        setSelectedMenu(selectedMenu[0])
        setVegFoodItem('');
        if (selectedMenu.veg !== null && selectedMenu.nveg !== null) {
          setFoodType(selectedMenu.veg === 1 && selectedMenu.nveg === 1 ? 'both' : selectedMenu.nveg === 1 ? 'nveg' : 'veg')
        }
        setNvegFoodItem('');
        setNvegFoodList(selectedMenu[0]?.nvegItem);
        setVegFoodList(selectedMenu[0]?.vegItem);
      })
    }
  };

  const handlePrev = async () => {
    const currentIndex = menuIds.indexOf(selectedDay);

    if (currentIndex > 0) {
      const valueIndex = menuIds[currentIndex - 1]
      const selectedMenu = menuData.filter(item => item.id === valueIndex);
      await updateSelectedDay(valueIndex)
      console.log(selectedMenu[0])
      dispatch(getMenuDraft(planId, 0, 0, 1, null, elm, null));
      setSelectedMenu(selectedMenu[0])
      setVegFoodList(selectedMenu[0]?.vegItem)
      setNvegFoodList(selectedMenu[0]?.nvegItem)
      if (selectedMenu.veg !== null && selectedMenu.nveg !== null) {
        setFoodType(selectedMenu.veg === 1 && selectedMenu.nveg === 1 ? 'both' : selectedMenu.nveg === 1 ? 'nveg' : 'veg')
      }
      setSelectedDay(menuIds[currentIndex - 1]); // Move to previous ID
    }
  };

  console.log("Menu selected", selectedMenu)
  console.log("Veg Items", vegFoodList)
  return (
    <SafeAreaView className='bg-white' style={{ flex: 1 }}>
      <View className={`nav-bg flex-row items-center px-4 `} style={{ paddingVertical: 19 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Plan')}>
          <Back />
        </TouchableOpacity>
        <Text className={`flex-1 text-center right-4 text-[21px] poppins-bold text-black`}>
          Plan
        </Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
        style={{ flex: 1, backgroundColor: "#fff" }}>
        {loader ? <Loader /> :
          <ScrollView style={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View className='mx-4 pb-4'>
              <View className='flex-row items-center justify-center mt-5'>

                {menuData?.map((val, ind) => {
                  return (
                    <View className='flex-row items-center justify-center' key={ind}>
                      {val?.vegItem?.length > 0 || val?.nvegItem?.length > 0 ?
                        <BlueTick />
                        :
                        <View style={{ width: 33, height: 33 }}
                          className='border border-[#D6D6D6] items-center justify-center rounded-full'>
                          <Text className='text-[17px] poppins-medium txt-grey'>{val?.day?.split('')[0].toUpperCase()}</Text>
                        </View>
                      }

                      {ind < menuData?.length - 1 &&
                        <View style={{ gap: 2 }} className='mx-1 flex-row'>
                          <Dots />{menuData?.length == 5 && <><Dots /><Dots /></>}
                        </View>}
                    </View>
                  )
                })}
              </View>


              {/* Day like monay */}
              <Text className='mt-4 text-[15px] poppins-medium'>
                {selectedMenu?.day?.split('')[0].toUpperCase() + selectedMenu?.day?.slice(1)}
              </Text>

              <View style={{ gap: 10 }} className='flex-row mt-2'>
                {planDetails?.data?.data?.meal_type?.veg &&
                  <TouchableOpacity style={[foodType == 'veg' && styles.active, styles.buttonFixture]} onPress={() => setFoodType('veg')}>
                    {(foodType == 'veg' ? <VegActive /> : <VegInactive />)}
                    <Text className={`text-[13px] poppins-medium ${foodType == 'veg' ? 'text-black' : 'txt-grey'} ml-2`}>Veg</Text>
                  </TouchableOpacity>
                }

                {planDetails?.data?.data?.meal_type?.nveg &&
                  <TouchableOpacity style={[foodType == 'nveg' && styles.active, styles.buttonFixture]} onPress={() => setFoodType('nveg')}>
                    {(foodType == 'nveg' ? <NvegActive /> : <NvegInactive />)}
                    <Text className={`text-[13px] poppins-medium ${foodType == 'nveg' ? 'text-black' : 'txt-grey'} ml-2`}>Non Veg</Text>
                  </TouchableOpacity>
                }

                {planDetails?.data?.data?.meal_type?.nveg && planDetails?.data?.data?.meal_type?.veg &&
                  <TouchableOpacity style={[foodType == 'both' && styles.active, styles.buttonFixture]} onPress={() => setFoodType('both')}>
                    {(foodType == 'both' ? <BothActive /> : <BothInactive />)}
                    <Text className={`text-[13px] poppins-medium ${foodType == 'both' ? 'text-black' : 'txt-grey'} ml-2`}>Both</Text>
                  </TouchableOpacity>
                }

              </View>


              {foodType === 'veg' || foodType === 'both' ?
                <>
                  <Text className='poppins-medium' style={{ marginTop: 14 }}>Veg Items</Text>
                  <View className="mt-[15]">
                    <View className='border border-gray-300 rounded-[10] flex-row justify-between'>
                      <TextInput
                        className="txt-grey flex-1 poppins-regular rounded-lg p-3 items-center justify-center"
                        placeholderTextColor="#7B7B7B"
                        placeholder="Enter Food Item"
                        value={vegFoodItem}
                        onChangeText={(e) => setVegFoodItem(e)}
                        onSubmitEditing={() => addFoodItem('veg')}
                      />
                      <TouchableOpacity onPress={() => addFoodItem('veg')} disabled={vegFoodItem?.length < 3} className={` ${vegFoodItem.length < 3 ? 'btn-disabled' : 'btn-color'} m-2 px-4 rounded-lg items-center justify-center`}>
                        <Text className='text-white poppins-medium text-[12px]'>Add</Text>
                      </TouchableOpacity>
                    </View>

                    {vegFoodList?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          className="border border-[#D6D6D6] rounded-[10px] flex-row items-center justify-between mt-4"
                        >
                          <View className="flex-row">
                            <TouchableOpacity
                              onPress={() => removeFoodItem(index, "veg")}
                              style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.14)" }}
                              className="flex-row border border-[#D6D6D6] items-center py-[7px] px-3 m-2 rounded-[10]"
                            >
                              <Text className="text-[13px] poppins-medium txt-grey mr-2">
                                {item?.item_name?.length > 10 ? item?.item_name.slice(0, 6) + "..." : item?.item_name}
                              </Text>
                              <Cross />
                            </TouchableOpacity>
                            <View className="mr-[10] ml-[4] my-auto">
                              <VerticalBar />
                            </View>
                            <TextInput
                              className="poppins-regular text-[#7B7B7B] text-[14px] mr-[11]"
                              placeholderTextColor="#7B7B7B"
                              placeholder="Enter value"
                              keyboardType="number-pad"
                              value={item?.weight ? item?.weight?.toString() : item?.quantity ? item?.quantity.toString() : ""}
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
                                {/* {vegFoodList.length > 0 && item.quantity == 0 ? 'gm' : 'gty'} */}
                                {item.selectedUnit ? item.selectedUnit : item.quantity == 0 ? 'gm' : 'qty'}
                              </Text>
                              <Drop />
                            </TouchableOpacity>

                            {dropdown == index && (
                              <View className="absolute top-full left-0 mt-1 w-[77px] bg-white border border-[#D6D6D6] rounded-md shadow-md z-10">
                                {["gm", "qty"].map((unit, unitIndex) => (
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

                  </View>
                </>
                : <Text></Text>}

              {(foodType == 'nveg' || foodType == 'both') ?
                <>
                  <Text className='poppins-medium mt-3'>Non Veg Items</Text>
                  <View style={{ marginTop: 14 }}>
                    <View className='border border-gray-300 rounded-[10] flex-row justify-between mb-4'>
                      <TextInput
                        className="txt-grey flex-1 poppins-regular rounded-lg p-3 items-center justify-center"
                        placeholderTextColor="#7B7B7B"
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
                    {nvegFoodList?.map((item, index) => {
                      return <View key={index} className='border border-[#D6D6D6] rounded-[10px] flex-row items-center justify-between mb-[10]'>
                        <View className='flex-row'>
                          <TouchableOpacity onPress={() => removeFoodItem(index, 'nveg')} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }} className='flex-row border border-[#D6D6D6] items-center py-[7px] px-3 m-2 rounded-[10]'>
                            <Text className='text-[13px] poppins-medium txt-grey mr-2'>
                              {item?.item_name?.length > 10 ? item?.item_name.slice(0, 6) + '...' : item?.item_name}
                            </Text>
                            <Cross />
                          </TouchableOpacity>
                          <View className='mr-[10] ml-[4]'><VerticalBar /></View>
                          <TextInput
                            className='poppins-regular text-[#7B7B7B] text-[14px] mr-[11]'
                            placeholderTextColor="#7B7B7B"
                            placeholder='Enter value'
                            keyboardType='numeric'
                            value={item?.weight ? item?.weight.toString() : ""}
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
                              {item.selectedUnit ? item.selectedUnit : item.quantity == 0 ? 'gm' : 'qty'}
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
                  </View>
                </>
                : <Text></Text>}

              <View className='flex-row justify-between'>
                {/* Previous Button */}
                <TouchableOpacity
                  onPress={handlePrev}
                  disabled={isPrevDisabled}
                  className={`${isPrevDisabled ? 'btn-disabled' : 'btn-color'} flex-1 mr-2 rounded-[10] items-center justify-center py-2`}
                >
                  <Text className='text-[18px] text-center text-white poppins-medium'>Previous</Text>
                </TouchableOpacity>

                {/* Next Button */}
                <TouchableOpacity
                  onPress={handleNext}
                  disabled={
                    vegFoodList?.length === 0 && nvegFoodList?.length === 0 ||
                    vegFoodList?.some(item => item?.quantity === "" && item?.weight === "") ||
                    nvegFoodList?.some(item => item?.quantity === "" && item?.weight === "")
                  }
                  className={`${vegFoodList?.length === 0 && nvegFoodList?.length === 0 ||
                    vegFoodList?.some(item => item?.quantity === "" && item?.weight === "") ||
                    nvegFoodList?.some(item => item?.quantity === "" && item?.weight === "")
                    ? 'btn-disabled' : 'btn-color'} flex-1 ml-2 rounded-[10] items-center justify-center py-2`}
                >
                  {stepperLoader ? <ActivityIndicator size="large" color="#FFFFFF" /> :
                    <Text className='text-[18px] text-center text-white poppins-medium'>{nextButtonText}</Text>}
                </TouchableOpacity>
              </View>
            </View >
          </ScrollView>
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default PlanStepper

const styles = StyleSheet.create({
  active: {
    backgroundColor: 'rgba(38, 80, 216, 0.30)'
  },
  buttonFixture: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    padding: 4,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    flexDirection: 'row'
  },
})