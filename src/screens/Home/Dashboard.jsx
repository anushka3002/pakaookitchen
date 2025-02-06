import { View, ScrollView, Dimensions, Animated, PanResponder, Image, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useRef } from 'react'
import ViewPlanIcon from '../../assets/view-plan.png';
import AddMenuIcon from '../../assets/add-menu.png';
import AddWeeklyComboIcon from '../../assets/weekly-combo.png';
import messaging from '@react-native-firebase/messaging';


const { width } = Dimensions.get("window"); 
const SLIDER_WIDTH = width * 0.9;
const CIRCLE_SIZE = 50;
const maxTranslateX = SLIDER_WIDTH - CIRCLE_SIZE - 10;
const Dashboard = () => {

  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dx >= 0 && gesture.dx <= maxTranslateX) {
          translateX.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > maxTranslateX * 0.7) {
          Animated.timing(translateX, {
            toValue: maxTranslateX,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const business = [
    { icon: ViewPlanIcon, title: 'View Plan', subtitle: 'You can add upto 2 plans only', plan: true },
    { icon: AddMenuIcon, title: 'Add Menu', subtitle: 'Various versions have evolved over', plan: false },
    { icon: AddWeeklyComboIcon, title: 'Add Weekly Combo', subtitle: 'Various versions have evolved over', plan: false },
  ]


  async function getFCMToken() {
    try {
        const token = await messaging().getToken();
        console.log(token)
    } catch (error) {
        console.error('Error getting FCM token:', error);
    }
}

useEffect(() => {
  getFCMToken()
}, [])

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
                <Image
                  source={require('../../assets/dummy.png')}
                  width={'20px'}
                  height={'20px'}
                />

                <View style={{ marginLeft: 13 }}>
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
                style={{ left: 12 }}
                source={require('../../assets/noti.png')}
              />
              <Text className='absolute left-4 font-medium text-white'
                style={{ left: 16, bottom: 8, fontSize: 10 }}
              >5</Text>
            </View>
          </View>

          <View className='items-center mt-2'>
            <Text className='text-white text-[16px] font-bold'>John K Square</Text>
            <Text style={{ fontWeight: 800, fontSize: 22 }} className='text-white mt-1'>Available Balance</Text>
            <Text style={{ fontSize: 25 }} className='font-semibold text-white mt-1'>₹ 15,000</Text>
          </View>

          <View style={styles.whiteBtn} className='flex-row bg-white items-center mx-auto px-9 py-4 rounded-xl mt-5'>
            <Image
              source={require('../../assets/order-blue.png')}
              style={{ width: 42, height: 42 }}
            />
            <View className='ml-3'>
              <Text className='text-[18px] font-semibold'>Orders</Text>
              <Text style={{ color: '#7B7B7B' }} className='text-[16px] font-medium'>150 Total Order</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View className='mx-4'>
        <View className='mt-10'>
          <View style={styles.container}>
            <View style={styles.slider}>
              <Animated.View
                {...panResponder.panHandlers}
                style={[styles.circle, { transform: [{ translateX }] }]}
              >
                <Image source={require("../../assets/withdraw.png")} style={styles.icon} />
              </Animated.View>
              <Text style={styles.text}>Withdrawal</Text>
            </View>
          </View>
        </View>
        <Text className='text-[21px] font-bold mt-2'>Order Statistics</Text>
        <View style={{ gap: 20 }} className='flex-row mt-3'>
          {['Success Orders', 'Cancelled'].map((e) => {
            return <View className='items-center flex-1 py-4' style={styles.whiteBtn}>
              {e == 'Success Orders' ? <Image
                source={require('../../assets/success.png')}
                style={{ width: 41, height: 41 }}
              /> : <Image
                source={require('../../assets/cancelled.png')}
                style={{ width: 41, height: 40 }}
              />}
              <Text style={{ color: '#000000' }} className='text-[30px] font-bold mt-2'>{e == 'Success Orders' ? 110 : '05'}</Text>
              <Text style={{ color: '#7B7B7B' }} className='text-[16px] font-medium'>{e == 'Success Orders' ? 'Success Orders' : 'Cancelled'}</Text>
            </View>
          })}
        </View>
        <Text className='text-[21px] font-bold mt-3 mb-3'>Grow Your Business</Text>
        {business.map((elm) => {
          return <View key={elm} style={styles.whiteBtn} className='relative flex-row mb-5 px-3 py-3 justify-between items-center'>
            <View className='flex-row items-center'>
              <Image
                source={elm.icon}
                style={{ width: 30, height: 30 }}
              />
              <View className='ml-2'>
                <Text className='text-[17px] font-bold'>{elm.title}</Text>
                <Text style={{ color: '#7B7B7B' }} className='text-[14px]'>{elm.subtitle}</Text>
              </View>
            </View>
            <Image
              source={require('../../assets/next-arrow.png')}
              style={{ width: 24, height: 24 }}
            />
            {elm.plan && <View className='absolute' style={{ backgroundColor: '#008000', top:0, right: 40, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
              <Text className='text-white text-[12px] font-medium px-3 py-2'>2 Plan Active</Text></View>}
          </View>
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
  slider: {
    width: SLIDER_WIDTH,
    height: CIRCLE_SIZE,
    backgroundColor: "#1E50E6",
    borderRadius: CIRCLE_SIZE / 2,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingLeft: 10,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: "white",
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    elevation: 5,
    zIndex: 10
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