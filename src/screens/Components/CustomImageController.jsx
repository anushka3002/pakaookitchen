import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Camera from '../../assets/camera.svg';
import { Controller } from 'react-hook-form';
import { handleImageUpload } from '../../constant';
import CameraFront from '../../assets/camera-front.svg'

const CustomImageController = ({control, controllerName, imageValue, setImages, images, imageName}) => {
    return (
        <Controller
            control={control}
            name={controllerName}
            render={({ field: { onChange } }) => (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            handleImageUpload(imageValue, onChange, setImages);
                        }}
                        style={[styles.dashedBorder, { width: controllerName == 'gst_image' || controllerName == 'fssai_image' ? '100%' : '47%', height: '121px' }]} 
                        className={`${!images[imageValue] && (controllerName == 'gst_image' || controllerName == 'fssai_image' ? 'py-14 px-3' : 'py-5 px-3')} justify-center items-center`}
                    >
                        {images[imageValue] ? (
                            <ImageBackground
                                source={{ uri: images[imageValue] }}
                                style={{ width: '100%', height: 100, borderRadius: 10 }}
                                resizeMode="contain"
                                className='items-center justify-center'
                            >
                                <CameraFront />
                            </ImageBackground>
                        ) : (
                            <View className='items-center'>
                                <Camera />
                                { controllerName != 'gst_image' && controllerName != 'fssai_image' && <Text className='text-gray-500 poppins-medium mt-1'>{imageName}</Text>}
                            </View>
                        )}
                    </TouchableOpacity>
                </>
            )}
        />
    )
}

const styles = StyleSheet.create({
  dashedBorder: {
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderStyle: "dashed",
    borderRadius: Platform.OS === 'ios' ? 8 : 0,
  },
})

export default CustomImageController