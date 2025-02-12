import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Camera from '../../assets/camera.svg';
import { Controller } from 'react-hook-form';
import { handleImageUpload } from '../../constant';

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
                        style={[!images[imageValue] && styles.dashedBorder, { width: controllerName == 'gst_image' || controllerName == 'fssai_image' ? '100%' : '47%', height: '121px' }]} 
                        className={`${!images[imageValue] && (controllerName == 'gst_image' || controllerName == 'fssai_image' ? 'py-14 px-3' : 'py-5 px-3')} justify-center items-center`}
                    >
                        {images[imageValue] ? (
                            <Image
                                source={{ uri: images[imageValue] }}
                                style={{ width: '100%', height: 100, borderRadius: 10 }}
                                resizeMode="contain"
                            />
                        ) : (
                            <View>
                                <Camera />
                                { controllerName != 'gst_image' && controllerName != 'fssai_image' && <Text className='text-gray-500 mt-1'>{imageName}</Text>}
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