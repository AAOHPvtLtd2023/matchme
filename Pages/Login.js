import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Alert,
    BackHandler
} from "react-native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoadingScreen from "../components/Loading";

const LoginScreen = () => {
    const [sentOtp, setSentOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const inputRefs = useRef([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();
    const focusNextInput = (index) => {
        if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };
    const [loading, setLoading] = useState(false);


    const handleOtpInput = (value, index) => {
        // Clone the current OTP array
        const newOtp = [...otp];

        // Update the OTP value at the specified index
        newOtp[index] = value;

        // Set the updated OTP array
        setOtp(newOtp);

        // Move focus to the next input field if there's input and the current index is not the last one
        if (value.length > 0 && index < 5) {
            focusNextInput(index);
        }
    };

    function isValidIndianPhoneNumber(phoneNumber) {
        // Regular expression for Indian mobile numbers
        const regex = /^(\+91[\-\s]?)?[7-9-6-8]\d{9}$/;

        // Test if the phoneNumber matches the regex pattern
        return regex.test(phoneNumber);
    }


    const sendVerification = async () => {
        if (phoneNumber === '') {
            Alert.alert('Enter a valid Number');
            return;
        }

        if (!isValidIndianPhoneNumber(phoneNumber)) { // Check if phone number is NOT valid
            Alert.alert('Enter a valid Indian phone number');
            return;
        }

        console.log(phoneNumber);

        setLoading(true);
    };

    const confirmCode = async () => {
        const newOtp = otp.join(""); // Join the elements of the array without any separator
    };


    const checkAutoLogin = async () => {
       
    };

    const handleBackspace = (index) => {
        if (index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        } else if (index === 0) {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };

    const handleBackpress = () => {
        Alert.alert('Exit',
            'Do you want to exit?', [{
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',

            },
            {
                text: 'exit',
                onPress: () => BackHandler.exitApp(),
            }]);
        return true;
    }
    useFocusEffect(
        React.useCallback(() => {

            BackHandler.addEventListener('hardwareBackPress', handleBackpress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackpress);
            };
        })
    )

    useEffect(() => {
        checkAutoLogin();
    }, []);

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    {sentOtp ? (
                        <View>
                            <Text style={{ fontSize: height * 0.04, fontFamily: "Inter-Black1" }}>Enter Your Code</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: height * 0.019 }}>You got a code on {phoneNumber}</Text>
                                <TouchableOpacity onPress={() => { setSentOtp(false) }} style={{ marginLeft: width * 0.01 }}><Feather name="edit-2" size={20} color="black" /></TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                {[...Array(6)].map((_, index) => (
                                    <TextInput
                                        key={index}
                                        style={styles.pinput}
                                        value={otp[index] || ""}
                                        onChangeText={(value) => handleOtpInput(value, index)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === "Backspace") {
                                                handleBackspace(index);
                                            }
                                        }}
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                    />
                                ))}
                            </View>
                        </View>


                    ) : (
                        <View>
                            <Text style={{ fontSize: height * 0.04, fontFamily: "Inter-Black1" }}>Can we get your Phone?</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setPhoneNumber(text)}
                                />
                            </View>
                            <Text style={{ fontSize: height * 0.019 }}>
                                We will text you a 6 digit code to verify you're really you.
                            </Text>
                        </View>
                    )}

                    {sentOtp ? (
                        <TouchableOpacity style={styles.button} onPress={confirmCode}>
                            <View
                                style={{
                                    display: "flex",
                                    height: "100%",
                                    width: "50%",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.buttonText}>Continue</Text>
                                <AntDesign
                                    name="arrowright"
                                    size={24}
                                    color="white"
                                    style={{ marginLeft: 5 }}
                                />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={sendVerification}>
                            <View
                                style={{
                                    display: "flex",
                                    height: "100%",
                                    width: "50%",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.buttonText}>Send OTP</Text>
                                <FontAwesome
                                    name="send"
                                    size={24}
                                    color="white"
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    animationContainer: {
        width: "80%",
        aspectRatio: 1,
        marginBottom: height * 0.1,
        top: 80,
    },
    backgroundAnimation: {
        position: "absolute",
        // width: width * 2,
        width: "100%",
        height: "100%",
    },
    title: {
        color: "green",
        fontSize: height * 0.05,
        marginBottom: height * 0.1,
    },
    formContainer: {
        position: "absolute",
        top: height * 0.09,
        width: "100%",
        height: "1000%",
        alignItems: "center",
        paddingVertical: height * 0.03,
        paddingHorizontal: width * 0.03,
        // overflow: "hidden",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: height * 0.03,
        width: "100%",
    },
    countryCodeInput: {
        height: height * 0.07,
        width: "20%",
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
    },
    input: {
        height: height * 0.07,
        width: "95%",
        marginVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1,
        color: "black",
        fontStyle: "italic",
    },
    pinput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        height: height * 0.09,
        width: "15%",
        textAlign: 'center',
        fontSize: 18,
        // backgroundColor:'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
    },
    button: {
        backgroundColor: "rgba(0,0,0,0.8)",
        height: height * 0.07,
        width: "85%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 20,
        marginTop: height * 0.01,
    },
    buttonText: {
        color: "white",
        fontSize: height * 0.025,
    },
});

export default LoginScreen;
