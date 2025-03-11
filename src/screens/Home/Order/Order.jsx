import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import GreenDot from '../../../assets/green-dot';
import { useDispatch, useSelector } from "react-redux";
import { getOrderData } from "../../../reducers/orderSlice";
import OrderCard from "../../Components/OrderCard";

const Order = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("ongoing");
  const dispatch = useDispatch()
  const { orderData } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getOrderData(selectedTab ?? 'ongoing'))
  }, [selectedTab])

  return (
    <ScrollView className="bg-white">
      <Navbar screen={'Order'} noBackArrow={true} />
      <View className="px-[16] bg-white mb-10">
        <View style={{ gap: 20 }} className="flex-row justify-center mb-4 pt-4 rounded-full">
          {['ongoing', 'delivered'].map((elm, ind) => {
            return <TouchableOpacity key={ind}
              style={{ borderWidth: 2, borderColor: 'rgba(214, 214, 214, 0.60)' }}
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

        <Text className="text-[21px] poppins-semibold mb-[5]">Items List</Text>
        <View style={{ gap: 14 }}>
          {orderData?.data?.data?.data?.length > 0 ? orderData?.data?.data?.data?.map((order, ind) => (
            <OrderCard key={ind} navigation={navigation} order={order} arrow={true} status={true} />
          )) : <Text className="poppins-medium text-[16px] text-[#737373] text-center mt-[137]">No data found</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

export default Order
