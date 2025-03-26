import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getKitchenAllInfo } from '../../../reducers/authSlice'
import Loader from '../../../Loader'
import Navbar from '../../Components/Navbar'
import { Controller } from 'react-hook-form'

const EditProfile = () => {
    const { kitchenProfileKyc, profileDataloading } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getKitchenAllInfo())
    }, [])

    const kycDocs = kitchenProfileKyc?.data
    return (
        <SafeAreaView className='bg-white flex-1' style={{flex: 1}}>
            <Navbar screen={'Profile'} />
            {profileDataloading ? <Loader /> :
                <ScrollView
                showsHorizontalScrollIndicator={false}  contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}  style={{flex: 1}}>
                    <View style={styles.profileContainer}>
                        <Text className="text-[15px] poppins-medium mb-[14] ">Owner Name<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.owner_name}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Email<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.email}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Kitchen name<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.kitchen_name}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Aadhar Number<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.signedUrls?.aadhar_number}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Aadhar Image<Text className="text-red-500">*</Text></Text>

                        <View style={styles.imageFilter}>
                            <Image
                                source={{ uri: kycDocs?.signedUrls?.aadhar_front }}
                                style={styles.kycImage}
                            />
                            <Image
                                source={{ uri: kycDocs?.signedUrls?.aadhar_back }}
                                style={styles.kycImage}
                            />
                        </View>


                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Pan Number<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.signedUrls?.pan_number}</Text>
                        </View>


                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Pan Image<Text className="text-red-500">*</Text></Text>

                        <View style={styles.imageFilter}>
                            <Image
                                source={{ uri: kycDocs?.signedUrls?.pan_front }}
                                style={styles.kycImage}
                            />
                            <Image
                                source={{ uri: kycDocs?.signedUrls?.pan_back }}
                                style={styles.kycImage}
                            />
                        </View>


                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Gst Number<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.signedUrls?.gst_number}</Text>
                        </View>


                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Gst Image<Text className="text-red-500">*</Text></Text>

                        <View style={styles.imageFilter}>
                            <Image
                                source={{ uri: kycDocs?.signedUrls?.gst_image }}
                                style={styles.kycBigImage}
                            />
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Fssai Number<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.signedUrls?.fssia_number}</Text>
                        </View>


                        <Text className="text-[15px] poppins-medium mb-[14] mt-4">Fssai Image<Text className="text-red-500">*</Text></Text>

                        <View style={styles.imageFilter}>
                            <Image
                                source={{ uri: kycDocs?.signedUrls?.fssai_image }}
                                style={styles.kycBigImage}
                            />
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Fssai expiry date<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.signedUrls?.fssai_expiry_date}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Kitchen address<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.Kitchen_address?.address_line_one}</Text>
                        </View>
                        <View style={styles.inputBox} className='mt-4'>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.Kitchen_address?.address_line_two}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Kitchen pincode<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.Kitchen_address?.pincode}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Bank account holder name<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.bank_detail?.bank_holder_name}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Bank name<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.bank_detail?.bank_name}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">IFSC code<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.bank_detail?.ifsc_code}</Text>
                        </View>

                        <Text className="text-[15px] poppins-medium mb-[14]  mt-4">Account number<Text className="text-red-500">*</Text></Text>
                        <View style={styles.inputBox}>
                            <Text className="text-[15px] poppins-medium">{kycDocs?.bank_detail?.account_number}</Text>
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 14,
        paddingVertical: 34
    },
    inputBox: {
        paddingHorizontal: 7,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: "#7B7B7B",
        borderRadius: 10
    },
    kycImage: {
        borderColor: "#D6D6D6",
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 10,
        width: "48%",
        height: 121
    },
    kycBigImage: {
        borderColor: "#D6D6D6",
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        height: 170,
        resizeMode: 'contain',

    },
    imageFilter: {
        display: 'flex',
        flexDirection: 'row', // Ensures images are side by side
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})