import { View, ScrollView, Image, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Notification from '../../assets/Bell.svg';
import Location from '../../assets/location.svg';
import OrderBlue from '../../assets/order-blue.svg';
import Withdraw from '../../assets/withdraw.svg';
import Success from '../../assets/success.svg';
import Cancelled from '../../assets/cancelled.svg';
import ViewPlan from '../../assets/view-plan.svg';
import AddMenu from '../../assets/add-menu.svg';
import WeeklyCombo from '../../assets/weekly-combo.svg';
import NextArrow from '../../assets/next-arrow.svg';
import Dummy from '../../assets/dummy.svg';
import Rating from '../../assets/yellow_star_full';
import LinearGradient from 'react-native-linear-gradient';
import DashboardVector from '../../assets/payout-vector';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = ({ navigation }) => {

  const business = [
    { icon: <ViewPlan />, title: 'View Plan', subtitle: 'You can add upto 2 plans only', plan: true },
    { icon: <AddMenu />, title: 'Add Menu', subtitle: 'Various versions have evolved over', plan: false },
  ]

  return (
    <View className='h-screen'>
      <ScrollView className='bg-white'>
        <View style={{ backgroundColor: '#274FCF', overflow: 'visible' }}>
          <LinearGradient
            colors={['#2650D8', '#2D479D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full"
          >
            <View className='px-[16] flex-row w-[100%] items-center justify-between mt-20 mb-[24]'>
              <Dummy />
              <View>
                <View className='flex-row items-center'>
                  <Location />
                  <Text className='text-white ml-2 text-[13px] poppins-semibold'>No 4, prema mandir, Kodihalli..</Text>
                </View>
                <View className='flex-row'>
                  <Text className='text-white text-[13px] poppins-semibold'>The Cook's Corner</Text>
                  <Text className='text-[13px] poppins-medium text-white'>(</Text><Rating /> <Text className='text-[13px] poppins-medium text-white'>4.5)</Text>
                </View>
              </View>
              <View className="relative">
                <Notification />
                <View className="absolute w-5 h-5 bg-red-500 rounded-full justify-center items-center"
                  style={{ left: 12, bottom: 8 }}>
                  <Text className="poppins-medium text-white text-[10px]">5</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View className='mx-4 mt-5'>
          <Text className='text-[21px] poppins-bold mt-3 mb-3'>Grow Your Business</Text>
          {business.map((elm, ind) => {
            return <TouchableOpacity onPress={() => elm.title == 'View Plan' && navigation.navigate('Plan')} key={ind} style={styles.whiteBtn} className='relative flex-row mb-5 px-3 py-3 justify-between items-center'>
              <View className='flex-row items-center'>
                {elm.icon}
                <View className='ml-2 w-[85%]'>
                  <Text className='text-[17px] poppins-bold'>{elm.title}</Text>
                  <Text numberOfLines={2} style={{ color: '#7B7B7B' }} className='text-[14px] poppins-regular'>{elm.subtitle}</Text>
                </View>
              </View>
              <NextArrow />
              {elm.plan && <View className='absolute' style={{ backgroundColor: '#008000', top: 0, right: 40, borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Text className='text-white text-[12px] poppins-medium px-4 py-2'>2 Plan Active</Text></View>}
            </TouchableOpacity>
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: 230
  },
  whiteBtn: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(214, 214, 214, 0.60)',
    backgroundColor: '#FFF',
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#1E50E6",
  },
  text: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Dashboard