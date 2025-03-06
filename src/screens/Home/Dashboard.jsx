import { View, ScrollView, Image, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
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
import SwipeButton from "rn-swipe-button";

const Dashboard = ({ navigation }) => {

  const business = [
    { icon: <ViewPlan />, title: 'View Plan', subtitle: 'You can add upto 2 plans only', plan: true },
    { icon: <AddMenu />, title: 'Add Menu', subtitle: 'Various versions have evolved over', plan: false },
    { icon: <WeeklyCombo />, title: 'Add Weekly Combo', subtitle: 'Various versions have evolved over', plan: false },
  ]

  return (
    <ScrollView className='bg-white'>
      <View style={{ backgroundColor: '#274FCF' }}>
        <ImageBackground
          source={require('../../assets/vector.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View className='flex-row justify-between items-center mx-4 mt-6'>
            <View>
              <View className='flex-row justify-center items-center'>
                <Dummy />
                <View style={{ marginLeft: 13 }}>
                  <View className='flex-row justify-center items-center'>
                    <Location />
                    <Text className='text-white ml-2 text-[13px] poppins-semibold'>No 4, prema mandir, Kodih..</Text>
                  </View>
                  <View className='flex-row items-center'>
                    <Text className='text-white text-[13px] poppins-semibold'>The Cook's Corner</Text>
                    <Text className='text-white ml-2'>(</Text>
                    <Rating />
                    <Text className='text-white'>4.5)</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className='relative'>
              <Notification />
              <Image
                className='absolute left-4'
                style={{ left: 12 }}
                source={require('../../assets/noti.png')}
              />
              <Text className='absolute left-4 poppins-medium text-white'
                style={{ left: 15, bottom: 4, fontSize: 10 }}
              >5</Text>
            </View>
          </View>

          <View className='items-center'>
            <Text className='text-white text-[16px] poppins-bold'>John K Square</Text>
            <Text className='poppins-extra-bold text-white text-[22px]'>Available Balance</Text>
            <Text style={{ fontSize: 25 }} className='poppins-semibold text-white'>₹ 15,000</Text>
          </View>

          <View style={styles.whiteBtn} className='flex-row bg-white items-center mx-auto px-9 py-4 rounded-xl mt-5'>
            <OrderBlue />
            <View className='ml-3'>
              <Text className='text-[18px] poppins-semibold'>Orders</Text>
              <Text style={{ color: '#7B7B7B' }} className='text-[16px] poppins-medium'>150 Total Order</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View className='mx-4'>
          <View className="relative w-full mt-32">
            <Text className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-[18px] poppins-medium text-white">
              Withdrawal
            </Text>
            <SwipeButton
              thumbIconComponent={() => <Withdraw />}
              thumbIconBackgroundColor="white"
              thumbIconBorderColor='#2650D8'
              railBackgroundColor="#2650D8"
              railBorderColor="#2650D8"
              railFillBackgroundColor="#2c48a1"
              title=""
              onSwipeSuccess={() => navigation.navigate('Invoice')}
              shouldResetAfterSuccess={true}
            />
          </View>
        <Text className='text-[21px] poppins-bold mt-2'>Order Statistics</Text>
        <View style={{ gap: 20 }} className='flex-row mt-3'>
          {['Success Orders', 'Cancelled'].map((e, ind) => {
            return <View key={ind} className='items-center flex-1 py-4' style={styles.whiteBtn}>
              {e == 'Success Orders' ? <Success /> : <Cancelled />}
              <Text style={{ color: '#000000' }} className='text-[30px] poppins-bold mt-2'>{e == 'Success Orders' ? 110 : '05'}</Text>
              <Text style={{ color: '#7B7B7B' }} className='text-[16px] poppins-medium'>{e == 'Success Orders' ? 'Success Orders' : 'Cancelled'}</Text>
            </View>
          })}
        </View>
        <Text className='text-[21px] poppins-bold mt-3 mb-3'>Grow Your Business</Text>
        {business.map((elm, ind) => {
          return <TouchableOpacity onPress={() => elm.title == 'View Plan' && navigation.navigate('Plan')} key={ind} style={styles.whiteBtn} className='relative flex-row mb-5 px-3 py-3 justify-between items-center'>
            <View className='flex-row items-center'>
              {elm.icon}
              <View className='ml-2 w-[85%]'>
                <Text className='text-[17px] poppins-bold'>{elm.title}</Text>
                <Text numberOfLines={2} style={{ color: '#7B7B7B'}} className='text-[14px] poppins-regular'>{elm.subtitle}</Text>
              </View>
            </View>
            <NextArrow />
            {elm.plan && <View className='absolute' style={{ backgroundColor: '#008000', top: 0, right: 40, borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
              <Text className='text-white text-[12px] poppins-medium px-4 py-2'>2 Plan Active</Text></View>}
          </TouchableOpacity>
        })}
      </View>
    </ScrollView>
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
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
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