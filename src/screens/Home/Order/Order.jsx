import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import GreenDot from '../../../assets/green-dot';
import { useDispatch, useSelector } from "react-redux";
import { getOrderData } from "../../../reducers/orderSlice";
import OrderCard from "../../Components/OrderCard";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Images
import NoOrder from '../../../assets/noOrder.svg'
import Loader from "../../../Loader";

const Order = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("ongoing");
  const dispatch = useDispatch()
  const { orderData, loading } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getOrderData(selectedTab ?? 'ongoing'))
  }, [selectedTab])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4FC' }} edges={["top", "left", "right"]}>
      <Navbar screen={'Order'} noBackArrow={true} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor:"#fff"}}>
        <View className="px-[16] bg-white">
          <View style={{ gap: 20 }} className="flex-row justify-center mb-4 pt-4 rounded-full">
            {['ongoing', 'delivered'].map((elm, ind) => {
              return <TouchableOpacity key={ind}
                style={[selectedTab === elm ? styles.blueBtn : styles.whiteBtn, { boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)' }]}
                className={`px-[14] py-[7] rounded-[30] items-center ${selectedTab === elm ? "btn-color" : ""
                  }`}
                onPress={() => setSelectedTab(elm)}
              >
                <Text
                  className={`text-[15px] poppins-medium ${selectedTab === elm ? "text-white" : "txt-grey"
                    }`}
                >
                  {elm.split('')[0].toUpperCase() + elm.slice(1)}
                  &nbsp;
                  {orderData?.data?.data?.on_going && elm == 'ongoing' ? <GreenDot /> : orderData?.data?.data?.delivered && elm == 'delivered' && <GreenDot />}
                </Text>
              </TouchableOpacity>
            })}
          </View>

          <View style={{ gap: 14 }}>
            {loading ? <View className="items-center justify-center mt-[160]">
              <Loader />
            </View> : orderData?.data?.data?.data?.length > 0 ?
              <>
                <Text className="text-[21px] poppins-semibold mb-[14]">Items List</Text>
                {orderData?.data?.data?.data?.map((order, ind) => (
                  <OrderCard key={ind} navigation={navigation} order={order} arrow={true} status={selectedTab == 'ongoing'} />
                ))} </> :
              <View className="items-center justify-center mt-[160]">
                <NoOrder />
                <Text className="text-[18px] poppins-semibold mt-4">You Have No Ongoing Order</Text>
                <Text className="text-center color-[#A7A9B7] poppins-light mt-1 text-[14px]">When you have order, you will {"\n"}
                  see them here</Text>
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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

export default Order
