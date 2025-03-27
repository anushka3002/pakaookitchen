import { View, Text, ScrollView, TouchableOpacity, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import Arrow from '../../assets/payout-blue-arrow';
import Dropdown from '../../assets/payout-dropdown';
import CalendarImage from '../../assets/black-calender';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCycle, getTransactions } from '../../reducers/profileSlice';
import { formatPayoutDate } from '../../constant';
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from "moment";
import Loader from '../../Loader';
import { useFocusEffect } from '@react-navigation/native';
const Payouts = ({ navigation }) => {

  const { currentCycleData, transactionsData, loading } = useSelector(state => state.profileData)
  const dispatch = useDispatch()

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1)

  const [range, setRange] = useState({ start: moment().startOf("month").format("YYYY-MM-DD"), end: moment().endOf("month").format("YYYY-MM-DD") });

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  };

  const onDayPress = (day) => {
    if (!range.start || (range.start && range.end)) {
      // Set start date and reset end date
      setRange({ start: day.dateString, end: null });
      setSelectedDates({
        [day.dateString]: { selected: true, startingDay: true, color: "#2650D8" },
      });
    } else {
      // Set end date
      const newRange = { ...range, end: day.dateString };
      setRange(newRange);

      // Generate range selection
      const newMarkedDates = {};
      let currentDate = new Date(newRange.start);
      let endDate = new Date(newRange.end);

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        newMarkedDates[dateString] = { selected: true, color: "rgba(38, 80, 216, 0.49)" };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      newMarkedDates[newRange.start] = { selected: true, startingDay: true, color: "rgba(38, 80, 216, 0.49)" };
      newMarkedDates[newRange.end] = { selected: true, endingDay: true, color: "#2650D8" };

      setSelectedDates(newMarkedDates);
    }
  };
console.log(currentCycleData)

useFocusEffect(
  useCallback(() => {
    dispatch(getCurrentCycle());
  }, [])
);

useFocusEffect(
  useCallback(() => {
    setPage(1); // Reset page on date range change
    dispatch(getTransactions(1, range.start, range.end));
  }, [range])
);

  // Load more transactions when reaching bottom
  const loadMoreTransactions = () => {
    if (!loadingMore && data?.payouts?.length > 0) {
      setLoadingMore(true);
      const nextPage = page + 1;
      dispatch(getTransactions(nextPage, range.start, range.end));
      setPage(nextPage);
      setLoadingMore(false);
    }
  };

  const handleTransaction = (id) => {
    navigation.navigate('CurrentCycle', { id: id })
  }

  const formatDateRange = (start, end) => {
    const startDate = moment(start).format("DD MMM");
    const endDate = moment(end).format("DD MMM, YY");
    return `${startDate} - ${endDate}`;
  };

  // Render transaction item
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleTransaction(item.payout_id)}
      key={index}
      style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.14)" }}
      className="relative rounded-[10] py-[9] pl-[15] mb-[15]"
    >
      <Text className="text-[17px] poppins-bold">₹ {item?.total_amount}</Text>
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <CalendarImage />
          <Text className="text-[14px] poppins-medium text-[#575757] mt-1 ml-2">
            {formatPayoutDate(item.pay_date)}
          </Text>
        </View>
        <View className="flex-row items-center mr-[23]">
          <Text className="text-[12px] poppins-medium txt-dark-blue mr-[5]">
            Show breakup
          </Text>
          <Arrow />
        </View>
      </View>
      <View
        className={`absolute top-0 rounded-b-[25] w-[120] ${index == 1 ? "bg-[#F0B801]" : "bg-[#008000]"} py-1 right-[23]`}
      >
        <Text className="text-[12px] poppins-medium text-white text-center">
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-[#2650D8] flex-1" edges={["top", "left", "right"]}>
      <View style={{ flex: 1, backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#2650D8', '#2D479D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full"
        >
          <View className='px-[15] pb-[44]'>
            <Text className='text-[21px] poppins-bold text-white mt-[13]'>Payouts</Text>
            <Text className='text-[15px] poppins-semibold text-white mt-[14]'>Current cycle</Text>
            <Text className='text-[14px] poppins-medium text-[#FCFCFC] pr-[6]'>Payouts are credited to your account every Monday by 9 PM for all transaction from the previous Monday-Sunday</Text>

            <View style={{ borderWidth: 1, borderColor: '#555' }} className='payout-card px-[13] pb-[19] mt-5'>
              <View className='flex-row justify-between items-center'>
                <View>
                  <Text className='text-[12px] poppins-medium text-[#737373]'>Net payout</Text>
                  <Text className='text-[17px] poppins-semibold text-[#26B746]'>₹ {currentCycleData?.data?.final_immediatePayout ?? 0}</Text>
                </View>
                <Text className='text-[12px] poppins-medium text-[#737373]'>{currentCycleData?.data?.orders_count ?? 0} Subcription</Text>
              </View>
              <View style={{ borderTopWidth: 1, borderColor: '#A4A4A4' }} className='mt-[7]'></View>
              <View className='flex-row justify-between mt-[10]'>
                <Text className='text-[12px] poppins-medium text-[#737373]'>Payout cycle</Text>
                <Text className='text-[12px] poppins-medium text-[#737373]'>Est. Payout date</Text>
              </View>
              <View className='flex-row justify-between mt-[5]'>
                <Text className='text-[13px] poppins-medium'>{formatPayoutDate(currentCycleData?.data?.start_date, 'start')} - {formatPayoutDate(currentCycleData?.data?.end_date, 'end')}</Text>
                <Text className='text-[13px] poppins-medium'>{formatPayoutDate(currentCycleData?.data?.est_payout_date, 'est')}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('CurrentCycle', { id: -1 })} className='flex-row items-center mt-[10]'>
                <Text className='text-[12px] poppins-medium txt-dark-blue mr-[5]'>Show breakup</Text>
                <Arrow />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View className='px-[15] mt-[27] mb-10'>
          <View className='flex-row justify-between items-center mb-5'>
            <Text className='text-[20px] poppins-semibold'>Transactions</Text>
            <TouchableOpacity onPress={toggleModal} className='flex-row justify-between'>
              <View style={{ borderWidth: 1, borderColor: '#2650D8', gap: 7 }} className='rounded-[4] py-[3] px-[15] flex-row items-center'>
                <Text className='text-[12px] poppins-medium txt-blue'>{formatDateRange(range.start, range.end)}</Text>
                <Dropdown />
              </View>
            </TouchableOpacity>
          </View>


          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.heading}>Select Date Range</Text>
              <Calendar
                markingType={"period"}
                markedDates={selectedDates}
                onDayPress={onDayPress}
              />
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>

    <View>
      {loading ? (
        <View className="items-center justify-center mt-[60]">
          <Loader />
        </View>
      ) : transactionsData?.data?.payouts?.length === 0 ? (
        <Text className="text-[16px] text-center poppins-medium text-[#737373] mt-[60]">
          No data found
        </Text>
      ) : (
        <FlatList
          data={transactionsData?.data?.payouts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMoreTransactions}
          onEndReachedThreshold={0.5} // Load more when 50% from bottom
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null
          }
        />
      )}
    </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  openButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5 },
  closeButton: { backgroundColor: "#2650D8", padding: 7, borderRadius: 50, marginTop: 10, paddingHorizontal: 30 },
  buttonText: { color: "#fff", fontSize: 16 },
  modal: { justifyContent: "center", alignItems: "center" },
  modalContent: { width: "95%", backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default Payouts