import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import LottieView from "lottie-react-native";
import * as Animatable from 'react-native-animatable';

const MatchScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { likerProfile, loggedInprofile } = route.params;

    useEffect(() => {

        // Call checkOnBoarding after 3 seconds
        const timer = setTimeout(() => {
            navigation.navigate('Main');
        }, 5000); // 5 seconds

        // Clean up the timer to avoid memory leaks
        return () => clearTimeout(timer);
    }, [navigation]); // Include navigation in the dependency array

    return (
        <View style={tw.style("h-full bg-grey-500 pt-20", { opacity: 0.89 })} >
            <LottieView source={require("../assets/Love.json")} style={{ height: '150%', width: '100%', position: 'absolute' }} autoPlay loop={false} speed={1.5} />
            <LottieView source={require("../assets/Love.json")} style={{ height: '100%', width: '100%', position: 'absolute' }} autoPlay loop={false} speed={1.5} />
            <LottieView source={require("../assets/love_match.json")} style={{ position: 'absolute', height: '50%', width: '100%' }} autoPlay loop={true} />
            <View style={tw.style("justify-center px-10 pt-20")} >
                <Image

                    // delay={400}
                    source={{
                        uri: "https://djfsjdfjsdfkjsfhdhfk.com/imagesksjfj"
                    }}
                    style={tw.style("h-20 w-full")}
                />
                {likerProfile &&
                    <Text style={tw.style("text-black text-center mt-5")} >
                        You and {likerProfile.formData.name} are liked each other.
                    </Text>
                }


                <View style={tw.style("flex-row justify-evenly mt-5")} >


                    {likerProfile &&
                        <Animatable.Image
                            animation="slideInLeft"
                            duration={3000}
                            style={tw.style("h-32 w-32 rounded-full")}
                            source={{
                                uri: likerProfile.photoUrl,
                            }}
                        />
                    }
                    {loggedInprofile &&

                        <Animatable.Image
                            animation="slideInRight"
                            duration={3000}
                            style={tw.style("h-32 w-32 rounded-full")}
                            source={{
                                uri: loggedInprofile.photoUrl,
                            }}
                        />
                    }

                </View>

            </View>
            <TouchableOpacity
                style={tw.style("bg-white m-5 px-10 py-8 rounded-full mt-20")}
                onPress={() => {
                    navigation.goBack();
                    navigation.navigate("Main");
                }}
            >
                <Text style={tw.style("text-center")} >Send a Message</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MatchScreen;

