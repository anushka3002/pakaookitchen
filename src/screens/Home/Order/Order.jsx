import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import GreenDot from '../../../assets/green-dot';
import { useDispatch, useSelector } from "react-redux";
import { getOrderData } from "../../../reducers/orderSlice";
import OrderCard from "../../Components/OrderCard";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Order = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("ongoing");
  const dispatch = useDispatch()
  const { orderData, loading } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getOrderData(selectedTab ?? 'ongoing'))
  }, [selectedTab])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Navbar screen={'Order'} noBackArrow={true} />
        <View className="px-[16] bg-white mb-10">
          <View style={{ gap: 20 }} className="flex-row justify-center mb-4 pt-4 rounded-full">
            {['ongoing', 'delivered'].map((elm, ind) => {
              return <TouchableOpacity key={ind}
                style={[selectedTab === elm ? styles.blueBtn : styles.whiteBtn,{boxShadow: '0 -1px 14px rgba(0, 0, 0, 0.13)'}]}
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

          <Text className="text-[21px] poppins-semibold mb-[14]">Items List</Text>
          <View style={{ gap: 14 }}>
            {loading ? <View className="items-center justify-center mt-[160]">
              <LottieView
                source={require("../../../assets/pan-loader")}
                autoPlay
                loop
                style={{ width: 150, height: 150 }}
              />
            </View> : orderData?.data?.data?.data?.length > 0 ? orderData?.data?.data?.data?.map((order, ind) => (
              <OrderCard key={ind} navigation={navigation} order={order} arrow={true} status={selectedTab == 'ongoing'} />
            )) : <Text className="poppins-medium text-[16px] text-[#737373] text-center mt-[200]">No data found</Text>}
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
