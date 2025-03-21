import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Notification from '../../assets/Bell.svg';
import Location from '../../assets/location.svg';
import ViewPlan from '../../assets/view-plan.svg';
import NextArrow from '../../assets/next-arrow.svg';
import Dummy from '../../assets/dummy.svg';
import Rating from '../../assets/rating';
import LinearGradient from 'react-native-linear-gradient';
import DashboardIcon from '../../assets/dashboard';
import { getNotification, getProfileData } from '../../reducers/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = ({ navigation }) => {

  const dispatch = useDispatch()
  const { profile, notificationData } = useSelector(state => state.profileData)
  const business = [
    { icon: <ViewPlan />, title: 'View Plan', subtitle: 'You can add upto 2 plans only', plan: true },
  ]

  useEffect(() => {
      dispatch(getProfileData())
      dispatch(getNotification())
  }, [dispatch])

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
            <View className={`px-[16] flex-row w-[100%] items-center justify-between ${Platform.OS == 'ios' ? 'mt-20' : 'mt-[31]'} mb-[24]`}>
              <Dummy/>
              <View className='px-1'>
                <View className='flex-row items-center'>
                  <Location />
                  <Text className='text-white ml-2 text-[13px] poppins-semibold'>{profile?.data?.data?.address_line1.length > 30 ? profile?.data?.data?.address_line1.slice(0, 30) + '...' : profile?.data?.data?.address_line1}</Text>
                </View>
                <View className='flex-row'>
                  <Text className='text-white text-[13px] poppins-semibold'>{profile?.data?.data?.kitchen_name}</Text>
                  <Text className='text-[13px] poppins-medium text-white'>(</Text><View className='mt-[3] mr-1'><Rating /></View><Text className='text-[13px] poppins-medium text-white'>{profile?.data?.data?.rating ?? 0})</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('Notification')} className="relative">
                <Notification />
                <View className="absolute w-5 h-5 bg-red-500 rounded-full justify-center items-center"
                  style={{ left: 12, bottom: 8 }}>
                  <Text className="poppins-medium text-white text-[10px]">{notificationData?.data?.data?.length}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        <View className='items-center my-[11]'>
        <DashboardIcon/>
        </View>
        <View className='mx-4'>
          <Text className='text-[21px] poppins-semibold mb-3'>Manage Your Business</Text>
          {business.map((elm, ind) => {
            return <TouchableOpacity onPress={() => elm.title == 'View Plan' && navigation.navigate('Plan')} key={ind} style={[styles.whiteBtn,{boxShadow:'0px 0px 10px 0px rgba(0, 0, 0, 0.14)'}]} 
            className='relative flex-row mb-5 pl-[16] pr-[18] py-3 justify-between items-center'>
              <View className='flex-row items-center'>
                {elm.icon}
                <View className='ml-2 w-[85%]'>
                  <Text className='text-[17px] poppins-semibold'>{elm.title}</Text>
                  <Text numberOfLines={2} style={{ color: '#7B7B7B' }} className='text-[14px] poppins-regular'>{elm.subtitle}</Text>
                </View>
              </View>
              <NextArrow />
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