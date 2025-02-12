import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Location from '../../assets/grey-location.svg';

const Map = ({geolocation, query, selectedLocation}) => {

  return (
    <View style={styles.shadowBox} className="rounded-xl pt-2 pb-4 px-4 mb-3">
          <Text className="text-lg font-medium mb-3">Location</Text>
          <View style={[{ width: '100%', height: 214 }]}>
            <View style={styles.container}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude: geolocation?.data?.lat || 20.5937,  
                  longitude: geolocation?.data?.lng || 78.9629, 
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5,
                }}
              >
                <Marker coordinate={{ latitude: geolocation?.data?.lat || 20.5937, longitude: geolocation?.data?.lng || 78.9629 }} />
              </MapView>
            </View>
          </View>
          <View className="flex-row mt-3 pr-3">
            {selectedLocation && <Location />}
            <Text className="text-[15px] txt-grey ml-1">{query}</Text>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 214,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      shadowBox: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
      },
})

export default Map