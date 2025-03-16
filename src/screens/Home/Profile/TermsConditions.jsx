import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'

const TermsConditions = () => {
  return (
    <SafeAreaView>
      <View>
        <Navbar screen={'Terms & Conditions'} />
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }} className='px-[16]'>
          <Text className='text-[18px] poppins-bold mt-[19]'>Term of Use</Text>
          <Text style={{ lineHeight: 26 }} className='text-[14px] poppins-regular txt-grey'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum sapien sodales mi sagittis hendrerit. Curabitur ut lectus nec orci cursus rhoncus. Donec a ultrices risus. Mauris ut erat ut urna rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis. Vestibulum quis scelerisque leo. Vestibulum quis porttitor tellus, non finibus nibh. Quisque ut tempor nulla, sed consectetur tortor. Mauris volutpat viverra arcu non laoreet. Duis eu arcu nunc. Pellentesque ultricies facilisis faucibus. Duis magna sem, ultricies sed scelerisque efficitur, hendrerit at arcu.
          </Text>
          <Text className='text-[18px] poppins-bold mt-[9]'>Vestibulum quis porttitor tellus</Text>
          <Text style={{ lineHeight: 26 }} className='text-[14px] poppins-regular txt-grey'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum sapien sodales mi sagittis hendrerit. Curabitur ut lectus nec orci cursus rhoncus. Donec a ultrices risus. Mauris ut erat ut urna rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis. Vestibulum quis scelerisque leo. Vestibulum quis porttitor tellus, non finibus nibh. Quisque ut tempor nulla, sed consectetur tortor. Mauris volutpat viverra arcu non laoreet. Duis eu arcu nunc. Pellentesque ultricies facilisis faucibus. Duis magna sem, ultricies sed scelerisque efficitur, hendrerit at arcu.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default TermsConditions