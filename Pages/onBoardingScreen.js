import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useFonts } from "expo-font";
const { width } = Dimensions.get("window");
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const [fontsLoaded, fontError] = useFonts({
        'onboard': require('../assets/fonts/Onboarding1.ttf'),
        'love_letter': require('../assets/fonts/Love Letters.ttf'),
        'decent': require('../assets/fonts/Custom.ttf')
    });

    const handleDone = async () => {
        await AsyncStorage.setItem('onBoardingShow', 'true');
        navigation.navigate("Login");
    };

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        );
    };
    const CustomDot = ({ selected }) => {
        return (
            <View
                style={{
                    width: 7,
                    height: 7,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor: selected ? "#8E7AB5" : "#CCCCCC",
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* <StatusBar /> */}
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                bottomBarHighlight={false}
                DoneButtonComponent={doneButton}
                containerStyles={{ paddingHorizontal: 15 }}
                transitionAnimationDuration={300}
                DotComponent={CustomDot}
                pages={[
                    {
                        backgroundColor: "#000000",
                        image: (
                            <View style={styles.lottie}>
                                <Lottie
                                    source={require("../assets/Welcome_rose.json")}
                                    autoPlay
                                    loop
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        flex: 1,
                                        resizeMode: "stretch",
                                        zIndex: 122,
                                    }}
                                />
                            </View>
                        ),
                        title: '',
                        subtitle: (
                            <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        // backgroundColor: 'red',

                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 30, color: "white", fontFamily: 'onboard', marginRight: 10 }}
                                    >
                                        Welcome to
                                    </Text>
                                    <Text style={{ fontSize: 30, color: "red", fontFamily: 'love_letter' }}>MatchMee !
                                    </Text>
                                </View>
                                <View style={{ width: width * 0.95 }}>
                                    <Text
                                        style={{
                                            fontSize: 28,
                                            color: "white",
                                            fontFamily: "onboard",
                                            textAlign: "center",
                                            // fontStyle: 'italic'

                                        }}
                                    >
                                        Find meaningful connections and romance with our innovative
                                        matchmaking tech .
                                        {/* onboarding1 font  */}

                                    </Text>
                                </View>

                            </View>
                        ),

                    },
                    {
                        backgroundColor: "#fef3c7",

                        title: "Work Seamlessly",
                        titleStyles: { fontFamily: 'decent', fontSize: 25 },
                        subtitle: "Find your match in a swipe ! Start your journey to Love \u2764 today .",
                        subTitleStyles: { fontSize: 20, color: "black", fontFamily: 'onboard' },
                        image: (
                            <View style={styles.lottie}>
                                <Lottie
                                    source={require("../assets/Love-Message.json")}
                                    autoPlay
                                    loop
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        flex: 1,
                                        resizeMode: "stretch",
                                        zIndex: 122,
                                    }}
                                />
                            </View>
                        ),
                    },
                    {
                        backgroundColor: "#a78bfa",
                        image: (
                            <View style={styles.lottie}>
                                <Lottie
                                    source={require("../assets/privacy.json")}
                                    autoPlay
                                    loop
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        flex: 1,
                                        resizeMode: "stretch",
                                        zIndex: 122,
                                    }}
                                />
                            </View>
                        ),
                        title: "Your privacy is our priority ",
                        titleStyles: { fontFamily: 'decent', fontSize: 25 },
                        subtitle:
                            "we're committed to protecting your personal information.",

                        subTitleStyles: { fontSize: 28, color: "black", fontFamily: 'onboard' },
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    lottie: {
        width: width * 0.9,
        aspectRatio: 1, // Maintain aspect ratio
        alignSelf: "center", // Center the Lottie animation horizontally
        // backgroundColor: 'red',
    },
    doneButton: {
        padding: 20,
    },
});
