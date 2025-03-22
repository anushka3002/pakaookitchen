import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import Arrow from '../../assets/payout-blue-arrow';
import Dropdown from '../../assets/payout-dropdown';
import Calendar from '../../assets/black-calender';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCycle, getTransactions } from '../../reducers/profileSlice';
import { formatPayoutDate } from '../../constant';
import DateTimePicker from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Payouts = ({ navigation }) => {

  const { currentCycleData, transactionsData, loading } = useSelector(state => state.profileData)
  const dispatch = useDispatch()
  const [show, setShow] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    dispatch(getCurrentCycle())
    dispatch(getTransactions())
  }, [])

  const handleTransaction = (id) => {
    navigation.navigate('CurrentCycle', { id: id })
  }

  const onChange = (event, selectedTime) => {
    setShow(Platform.OS === "ios");
    if (event.nativeEvent.timestamp) {
      setTime(selectedTime)
      formatTimestampToTime(event.nativeEvent.timestamp, meal)
    }
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleStartChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };
  
  return (
    <SafeAreaView className="bg-[#2650D8]">
      <View className='h-screen bg-white'>
        <ScrollView>
          <LinearGradient
            colors={['#2650D8', '#2D479D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full h-[570px]"
          >
            <View className='px-[15] pb-[44]'>
              <Text className='text-[21px] poppins-bold text-white mt-[13]'>Payouts</Text>
              <Text className='text-[15px] poppins-semibold text-white mt-[14]'>Current cycle</Text>
              <Text className='text-[14px] poppins-medium text-[#FCFCFC] pr-[6]'>Payouts are credited to your account every Monday by 9 PM for all transaction from the previous Monday-Sunday</Text>

              <View style={{ borderWidth: 1, borderColor: '#555' }} className='payout-card px-[13] pb-[21] mt-5'>
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
              <TouchableOpacity onPress={() => setShow(true)} className='flex-row justify-between'>
                <View style={{ borderWidth: 1, borderColor: '#2650D8', gap: 7 }} className='rounded-[4] py-[3] px-[15] flex-row items-center'>
                  <Text className='text-[12px] poppins-medium txt-blue'>31 Jan -02 Mar, 25</Text>
                  <Dropdown />
                </View>
              </TouchableOpacity>
            </View>

            {/* <View>
              <Button title="Select Start Date" onPress={() => setShowStartPicker(true)} />
              {showStartPicker && (
                <DateTimePicker value={startDate} mode="date" display="default" onChange={handleStartChange} />
              )}

              <Button title="Select End Date" onPress={() => setShowEndPicker(true)} />
              {showEndPicker && (
                <DateTimePicker value={endDate} mode="date" display="default" onChange={handleEndChange} />
              )}

              <Text style={{ marginTop: 20, fontSize: 18 }}>
                {`${formatDate(startDate)} - ${formatDate(endDate)}, ${startDate.getFullYear().toString().slice(-2)}`}
              </Text>
            </View> */}

            {loading ? <View className="items-center justify-center mt-[60]">
                    <LottieView
                      source={require("../../assets/pan-loader.json")}
                      autoPlay
                      loop
                      style={{ width: 150, height: 150 }}
                    />
                  </View> : transactionsData?.data?.payouts?.length == 0 ? <Text className='text-[16px] text-center poppins-medium text-[#737373] mt-[60]'>No data found</Text> :
              transactionsData?.data?.payouts?.map((elm, ind) => {
                return <TouchableOpacity onPress={() => handleTransaction(elm.payout_id)} key={ind} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.14)' }}
                  className='relative rounded-[10] py-[9] pl-[15] mb-[15]'>
                  <Text className='text-[17px] poppins-bold'>₹ {elm?.total_amount}</Text>
                  <View className='flex-row justify-between'>
                    <View className='flex-row items-center'>
                      <Calendar />
                      <Text className='text-[14px] poppins-medium text-[#575757] mt-1 ml-2'>{formatPayoutDate(elm.pay_date)}</Text>
                    </View>

                    <View className='flex-row items-center mr-[23]'>
                      <Text className='text-[12px] poppins-medium txt-dark-blue mr-[5]'>Show breakup</Text>
                      <Arrow />
                    </View>
                  </View>
                  <View className={`absolute top-0 rounded-b-[25] w-[120] ${ind == 1 ? 'bg-[#F0B801]' : 'bg-[#008000]'} py-1 right-[23]`}>
                    <Text className='text-[12px] poppins-medium text-white text-center'>{elm.status}</Text>
                  </View>
                </TouchableOpacity>
              })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Payouts