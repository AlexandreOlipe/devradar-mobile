import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import MapView from 'react-native-maps';

function Main() {

    const [ currentRegion, setCurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadInitialposition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude, 
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInitialposition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return <MapView initialRegion={currentRegion} style={styles.map}/>
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default Main;