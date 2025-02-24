import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import MapView, { Marker, Callout } from 'react-native-maps';

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

                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Alexandre Pereira</Text>
                        <Text style={styles.devBio}>Desenvolvedor em várias tecnologias, mas sempre em busca de novos conhecimentos</Text>
                        <Text style={styles.devTechs}>Java, Angular, JavaScript, SQL</Text>
                    </View>
                </Callout>
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
        borderColor: '#000'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    }
});

export default Main;