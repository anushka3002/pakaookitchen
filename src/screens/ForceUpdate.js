import { StyleSheet, Text, TouchableOpacity, View, Linking  } from 'react-native'
import React from 'react'

// styles
import styles from '../styles/LayoutStyles.js'

const ForceUpdate = () => {

    const handleUpdate = () => {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.pakaoo.kitchenapp');
    };

    return (
        <View style={[styles.dflex, styles.alignCenter, stylesContent.Background]}>
            <View style={styles.modal}>
                <View style={styles.modelContent}>
                    <Text style={[styles.modalt2]} className="poppins-semibold">A new version of the app is available. {"\n"}Please update to continue.
                    </Text>
                    <View style={[styles.dflex, styles.flexRowDirection, { gap: 20 }]}>
                        <TouchableOpacity style={styles.modalOkButtonSelected} onPress={handleUpdate}>
                            <Text style={[styles.modalOkSelected]} className='poppins-medium'>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ForceUpdate

const stylesContent = StyleSheet.create({
    Background: {
        backgroundColor: "#ffffff",
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: "100%",
        height: "100%"
    }
})