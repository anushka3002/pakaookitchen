import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Location from '../../assets/grey-location.svg';
import Locate from '../../assets/locate.svg';
import { useDispatch } from 'react-redux';
import { getGeoLocation } from '../../reducers/mapSlice';

const Map = ({ geolocation, getCurrentLocation, selectedLocation, setLocation }) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [markerPosition, setMarkerPosition] = useState({
    latitude: geolocation?.data?.lat || 20.5937,
    longitude: geolocation?.data?.lng || 78.9629,
  });

  // Zoom to user location
  useEffect(() => {
    if (mapRef.current && geolocation?.data?.lat && geolocation?.data?.lng) {
      setMarkerPosition({
        latitude: geolocation.data.lat,
        longitude: geolocation.data.lng,
      });
      setLocation({
        latitude: geolocation.data.lat,
        longitude: geolocation.data.lng,
      });
      mapRef.current.animateToRegion({
        latitude: geolocation.data.lat,
        longitude: geolocation.data.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
  }, [geolocation]);

  // Handle Drag & Drop
  const handleDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    setLocation({ latitude, longitude });
  };

  // Handle Map Click
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    setLocation({ latitude, longitude });
  };

  useEffect(() => {
    dispatch(getGeoLocation(selectedLocation))
  }, [selectedLocation])

  return (
    <View style={styles.shadowBox} className="pt-2 pb-4 px-4 mb-4">
      <Text className="text-lg poppins-medium mb-3">Location</Text>
      <View style={[{ width: '100%', height: 214 }]}>
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: markerPosition.latitude,
              longitude: markerPosition.longitude,
              latitudeDelta: 0.0005,
              longitudeDelta: 0.0005,
            }}
            onPress={handleMapPress} // Tap to select location
          >
            <Marker
              coordinate={markerPosition}
              draggable // Drag karne dega
              onDragEnd={handleDragEnd} // Jab drag khatam ho
            />
          </MapView>
        </View>
        <TouchableOpacity className='items-end justify-end' onPress={getCurrentLocation}>
          <Locate/>
        </TouchableOpacity>
      </View>
      <View className="flex-row mt-3 pr-3">
        {selectedLocation && <View className='mt-1'><Location /></View>}
        <Text className="text-[15px] txt-grey ml-1 poppins-regular">{selectedLocation}</Text>
      </View>
    </View>
  );
};

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
});

export default Map;
