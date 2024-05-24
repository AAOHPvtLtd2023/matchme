import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity, StatusBar, BackHandler, Alert } from "react-native";
import Home from '../Pages/Home';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import useAuth from '../components/useAuth';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firbase-config';
import Svg, { Path, Circle } from "react-native-svg";
import ProfileScreen from '../Pages/ProfileScreen';
import ChatList from '../Pages/ChatList';
// import { useFonts } from 'expo-font';



const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
    const [notifications, setNotification] = useState(false);
    const { userData } = useAuth();
    const user = userData;
    // const navigation = useNavigation
    // const [fontsLoaded, fontError] = useFonts({
    //     'love_letter': require('../assets/fonts/Love Letters.ttf'),
    // });

    useEffect(() => {
        if (user) {

            const fetchProfiles = () => {
                const likedUsersQuery = query(collection(db, 'likes'), where('likedUserId', '==', user.id));
                const unsubscribe = onSnapshot(likedUsersQuery, (querySnapshot) => {
                    const likedUserDetails = []; // Initialize array to store liked user details
                    querySnapshot.forEach(async (likeDoc) => {
                        const likedByUserId = likeDoc.data().likedByUserId;
                        const userDoc = await getDoc(doc(db, 'users', likedByUserId));
                        if (userDoc.exists()) {
                            likedUserDetails.push(userDoc.data());
                        } else {
                            console.log(`User with ID ${likedByUserId} not found`);
                        }
                    });

                    // Set notification based on whether there are any liked users
                    setNotification(!querySnapshot.empty);
                });

                return unsubscribe;
            };

            const unsubscribe = fetchProfiles();

            return () => unsubscribe();
        }
    }, [user]);

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

    return (
        <>
            <StatusBar
                barStyle="dark-content" // Change this to "light-content" if you prefer light text on dark background
                backgroundColor="transparent" // Change this to your desired color
                translucent={true} // Set to true to make the status bar transparent
            />
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarShowLabel: false,

                    tabBarStyle: {
                        position: "absolute",
                        elevation: 0,
                        // backgroundColor: "rgba(255, 255, 255, 0)",
                        backgroundColor: '#9169c1',
                        // backgroundColor: 'rgba(145, 105, 193,1)',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: 50,
                        // width:'90%',
                        borderColor: "transparent",
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
            >

                <Tab.Screen
                    name="Chat"
                    component={ChatList}
                    options={{

                        headerShown: true,
                        headerRight: () => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity>
                                    <Feather name="more-vertical" size={28} color="black" />
                                </TouchableOpacity>
                            </View>
                        ),
                        headerTitle: () => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 24, color: 'black', fontFamily: 'love_letter' }}>MatchMee</Text>
                            </View>

                        ),
                        headerStyle: {
                            backgroundColor: '#dfc8e4',
                        },
                        tabBarIcon: ({ focused }) => (
                            <View>
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    width={34}
                                    height={34}
                                    color={focused ? "white" : "black"}
                                >
                                    <Path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                    />
                                </Svg>
                            </View>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: true,
                        headerRight: () => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{ height: 50, width: 70, justifyContent: 'center', alignItems: 'center' }}>

                                    {notifications ? (
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 36 36"
                                            xmlns="http://www.w3.org/2000/svg"
                                            color="black"
                                            onPress={() => navigation.navigate('Like')}
                                        >
                                            <Path
                                                fill="currentColor"
                                                d="M18 34.28A2.67 2.67 0 0 0 20.58 32h-5.26A2.67 2.67 0 0 0 18 34.28"
                                                class="clr-i-solid--badged clr-i-solid-path-1--badged"
                                            />
                                            <Path
                                                fill="currentColor"
                                                d="M32.85 28.13l-.34-.3A14.37 14.37 0 0 1 30 24.9a12.63 12.63 0 0 1-1.35-4.81v-4.94a10.92 10.92 0 0 0-.16-1.79A7.5 7.5 0 0 1 22.5 6v-.63a10.57 10.57 0 0 0-3.32-1V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.3 10.73v4.94a12.63 12.63 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93l-.34.3v2.82h29.8Z"
                                                class="clr-i-solid--badged clr-i-solid-path-2--badged"
                                            />
                                            <Circle
                                                cx={30}
                                                cy={6}
                                                r={5}
                                                fill="red"
                                                class="clr-i-solid--badged clr-i-solid-path-3--badged clr-i-badge"
                                            />
                                            <Path fill="none" d="M0 0h36v36H0z" />
                                        </Svg>
                                    ) :
                                        (<Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 36 36"
                                            xmlns="http://www.w3.org/2000/svg"
                                            color="black"
                                            onPress={() => alert('You have no Likes 😔')}
                                        >
                                            <Path
                                                fill="currentColor"
                                                d="M32.85 28.13l-.34-.3A14.37 14.37 0 0 1 30 24.9a12.63 12.63 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.63 12.63 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93l-.34.3v2.82h29.8Z"
                                                className="clr-i-solid clr-i-solid-path-1"
                                            />
                                            <Path
                                                fill="currentColor"
                                                d="M15.32 32a2.65 2.65 0 0 0 5.25 0Z"
                                                className="clr-i-solid clr-i-solid-path-2"
                                            />
                                            <Path fill="none" d="M0 0h36v36H0z" />
                                        </Svg>)}

                                </TouchableOpacity>
                            </View>
                        ),
                        headerTitle: () => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 24, color: 'black', fontFamily: 'love_letter' }}>MatchMee</Text>
                            </View>

                        ),
                        headerStyle: {
                            backgroundColor: '#dfc8e4',
                        },
                        tabBarIcon: ({ focused }) => (
                            <View>
                                <AntDesign name="home" size={30} color={focused ? "white" : "black"} />
                            </View>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        // headerShown: false,
                        headerShown: true,
                        headerRight: () => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity>
                                    <Feather name="more-vertical" size={35} color="gray" />
                                </TouchableOpacity>
                            </View>
                        ),
                        headerTitle: () => (
                            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                                <Text style={{ fontSize: 24, color: 'black', fontFamily: 'love_letter' }}>MatchMee</Text>
                            </View>

                        ),
                        headerStyle: {
                            backgroundColor: '#dfc8e4',
                        },

                        // tabBarVisible: false,
                        tabBarIcon: ({ focused }) => (
                            <View>
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    width={34}
                                    height={34}
                                    color={focused ? "white" : "black"}
                                >
                                    <Path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </Svg>
                            </View>
                        ),
                    }}
                />

            </Tab.Navigator>
        </>
    );
};

export default Tabs;