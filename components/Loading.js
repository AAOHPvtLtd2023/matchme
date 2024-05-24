import React from 'react';
import { View, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';


export default function LoadingScreen() {
    return (
        // <View style={[StyleSheet.absoluteFillObject, style.container]}>
            <LottieView source={require('../assets/Loading-new2.json')} autoPlay loop style={{height:'100%', width:'100%'}}/>
        // </View>
    )
}

const style= StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    }
})