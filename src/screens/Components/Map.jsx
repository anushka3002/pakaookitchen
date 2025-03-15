import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Location from '../../assets/grey-location.svg';
import Locate from '../../assets/locate.svg';

const Map = ({ geolocation, getCurrentLocation, selectedLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && geolocation?.data?.lat && geolocation?.data?.lng) {
      mapRef.current.animateToRegion({
          latitude: geolocation.data.lat,
          longitude: geolocation.data.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  }, [geolocation]);

  return (
    <View style={styles.shadowBox} className="pt-2 pb-4 px-4 mb-4">
      <Text className="text-lg poppins-medium mb-3">Location</Text>
      <View style={[{ width: '100%', height: 214 }]}>
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: geolocation?.data?.lat || 20.5937,
              longitude: geolocation?.data?.lng || 78.9629,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker coordinate={{ latitude: geolocation?.data?.lat || 20.5937, longitude: geolocation?.data?.lng || 78.9629 }} />
          </MapView>
        </View>
        <TouchableOpacity className='items-end justify-end' onPress={()=>getCurrentLocation()}><Locate/></TouchableOpacity>
      </View>
      <View className="flex-row mt-3 pr-3">
        {selectedLocation && <View className='mt-1'><Location /></View>}
        <Text className="text-[15px] txt-grey ml-1 poppins-regular">{selectedLocation}</Text>
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
    borderRadius: 10,
    padding: 10,
  },
})

export default Map