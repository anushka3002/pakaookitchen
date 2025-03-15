import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import PayoutVector from '../../assets/payout-vector';
import Arrow from '../../assets/payout-blue-arrow';
import Dropdown from '../../assets/payout-dropdown';
import Calendar from '../../assets/black-calender';
import Download from '../../assets/download';

const Payouts = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
        colors={['#2650D8', '#2D479D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full h-[470px]"
      >
        <View className='w-full relative'>
        <PayoutVector/>
        </View>
        <View className='px-[15] absolute'>
        <Text className='text-[21px] poppins-bold text-white mt-[13]'>Payouts</Text>
        <Text className='text-[15px] poppins-semibold text-white mt-[14]'>Current cycle</Text>
        <Text className='text-[14px] poppins-medium text-[#FCFCFC] pr-[6]'>Payouts are credited to your account every Monday by 9 PM for all transaction from the previous Monday-Sunday</Text>

        <View style={{borderWidth:1, borderColor:'#555'}} className='payout-card px-[13] pb-[21] mt-5'>
            <View className='flex-row justify-between items-center'>
                <View>
                    <Text className='text-[12px] poppins-medium text-[#737373]'>Net payout</Text>
                    <Text className='text-[17px] poppins-semibold text-[#26B746]'>₹ 15.00</Text>
                </View>
                <Text className='text-[12px] poppins-medium text-[#737373]'>23 Subcription</Text>
            </View>
            <View style={{borderTopWidth:1, borderColor:'#A4A4A4'}}></View>
            <View className='flex-row justify-between mt-[10]'>
                <Text className='text-[12px] poppins-medium text-[#737373]'>Payout cycle</Text>
                <Text className='text-[12px] poppins-medium text-[#737373]'>Est. Payout date</Text>
            </View>
            <View className='flex-row justify-between mt-[5]'>
                <Text className='text-[13px] poppins-medium'>03 Mar - 09 Mar, 25</Text>
                <Text className='text-[13px] poppins-medium'>12, Mar, 25</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('CurrentCycle')} className='flex-row items-center mt-[10]'>
                <Text className='text-[12px] poppins-medium txt-dark-blue mr-[5]'>Show breakup</Text>
                <Arrow/>
            </TouchableOpacity>
        </View>
        </View>
      </LinearGradient>

      <View className='px-[15] mt-[27] mb-10'>
      <Text className='text-[20px] poppins-semibold'>Transactions</Text>
      <View className='flex-row justify-between mt-[11] mb-5'>
        <View style={{borderWidth:1, borderColor:'#2650D8'}} className='rounded-[4] py-[3] px-[15]'>
            <Text className='text-[12px] poppins-medium txt-blue'>Send to email</Text>
        </View>
        <View style={{borderWidth:1, borderColor:'#2650D8', gap:7 }} className='rounded-[4] py-[3] px-[15] flex-row items-center'>
            <Text className='text-[12px] poppins-medium txt-blue'>31 Jan -02 Mar, 25</Text>
            <Dropdown/>
        </View>
      </View>

      {false ? <Text className='text-[16px] text-center poppins-medium text-[#737373] mt-[60]'>No data found</Text> : [1,2].map((elm, ind)=>{
        return <View key={ind} style={{boxShadow:'0px 0px 10px 0px rgba(0, 0, 0, 0.14)'}} 
        className='relative rounded-[10] py-[9] px-[15] mb-[15]'>
            <Text className='text-[17px] poppins-bold'>₹ 8,000</Text>
            <View className='flex-row justify-between'>
                <View className='flex-row items-center'>
                <Calendar/>
                <Text className='text-[14px] poppins-medium text-[#575757] mt-1 ml-2'>28, Nov, 25</Text>
                </View>

                <View className='flex-row items-center'>
                <Download/>
                <Text className='text-[14px] poppins-medium txt-blue mt-1 ml-1'>Download</Text>
                </View>
            </View>
            <View className={`absolute top-0 rounded-b-[25] w-[120] ${ind == 1 ? 'bg-[#F0B801]' : 'bg-[#008000]'} py-1 right-[23]`}>
              <Text className='text-[12px] poppins-medium text-white text-center'>{ind == 1 ? 'In progress' : 'Settled'}</Text>
            </View>
        </View>
      })}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Payouts