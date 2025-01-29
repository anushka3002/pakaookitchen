import { View, ScrollView, Image, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
  return (
      <ScrollView>
        <ImageBackground
          source={require('../../assets/dashboard-bg.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View className='flex-row justify-between items-center mx-4 mt-6'>
            <View>
              <View className='flex-row justify-center items-center'>
                <Image
                  source={require('../../assets/dummy.png')}
                  width={'20px'}
                  height={'20px'}
                />

                <View style={{marginLeft:13}}>
                  <View className='flex-row justify-center items-center'>
                    <Image
                      source={require('../../assets/location.png')}
                    />
                    <Text className='text-white ml-2 text-[13px] font-semibold'>No 4, prema mandir, Kodihalli..</Text>
                  </View>
                  <View className='flex-row items-center'>
                    <Text className='text-white text-[13px] font-semibold'>The Cook's Corner</Text>
                    <Text className='text-white ml-2'>(</Text>
                    <Image
                      source={require('../../assets/rating.png')}
                      width={11}
                      height={11}
                      className='mr-1'
                    />
                    <Text className='text-white'>4.5)</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className='relative'>
              <Image
                source={require('../../assets/notification.png')}
              />
              <Image
              className='absolute left-4'
              style={{left:12}}
              source={require('../../assets/noti.png')}
              />
              <Text className='absolute left-4 font-medium text-white'
              style={{left:16, bottom:8, fontSize:10}}
              >5</Text>
            </View>
          </View>

          <View className='items-center mt-2'>
            <Text className='text-white text-[16px] font-bold'>John K Square</Text>
            <Text style={{fontWeight:800, fontSize:22}} className='text-white mt-1'>Available Balance</Text>
            <Text style={{fontSize:25}} className='font-semibold text-white mt-1'>₹ 15,000</Text>
          </View>

          <View className='flex-row'>
            <Image
            source={require('../../assets/order-blue.png')}
            />
            <View>
              <Text>Orders</Text>
              <Text></Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 280
  },
});

export default Dashboard