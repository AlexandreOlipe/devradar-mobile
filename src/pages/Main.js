import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import MapView, { Marker } from 'react-native-maps';

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

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -25.40, longitude: -49.20}}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/34045338?v=4'}}/>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    }
});

export default Main;