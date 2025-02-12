import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'

const CustomTextInput = ({control, label, name, placeholder, errors, capitalize, keyboard}) => {
  return (
    <View className="mb-3">
          <Text className="text-[15px] font-medium mb-2">{label}<Text className="text-red-500">*</Text></Text>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3"
                placeholder={placeholder}
                onChangeText={onChange}
                keyboardType={keyboard ?? 'default'}
                autoCapitalize={capitalize ? 'characters'  : 'none'}
                value={value}
              />
            )}
          />
          {errors[name] && <Text className="text-red-500 text-sm">{errors[name].message}</Text>}
        </View>
  )
}

export default CustomTextInput