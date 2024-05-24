import React, { useEffect,useState, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image, SafeAreaView, Alert, BackHandler } from 'react-native';
import { Feather } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import tw from "twrnc";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from "react-native-svg";
import LoadingScreen from '../components/Loading.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const swipeRef = useRef();
  const [notifications, setNotification] = useState(false);

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

  // fetch Profiles
  useEffect(() => {
   
    
  }, [user]);
    

  
  // Notfication
  useEffect(() => {
   
  }, [user]);
  
  

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }
    const userSwiped = profiles[cardIndex];
  }

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];

  };

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await firebase.auth().signOut();
 
      // Clear user token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
 
      // Navigate to the authentication screen (e.g., login screen)
      navigation.navigate('Login'); // Change 'Authentication' to the name of your authentication screen
    } catch (error) {
      // Handle logout error
      console.error(error);
    }
  };


  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <LinearGradient colors={["#9169c1", "#fff", "#dfc8e4"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        locations={Number[(0.1, 0.7)]}
         style={{ display: 'flex', height: '100%' }}>
      <LottieView
          source={require("../assets/Main-BackGround.json")}
          autoPlay
          loop
          style={{position: 'absolute',width:'100%',height:'100%'}}
          speed={1.5}
          resizeMode="cover"
        />
        <SafeAreaView style={tw.style("flex-1 mt-2")}>
          <View style={{ backgroundColor: 'transparent', height: '90%' }}>


          

          {profiles &&
            <View style={tw.style("flex-1 -mt-6")}>
              <Swiper
                ref={swipeRef}
                containerStyle={{
                  backgroundColor: "transparent",
                }}
                onSwipedLeft={(cardIndex) => {
                  swipeLeft(cardIndex);
                  console.log("Swipe Pass");
                }}
                onSwipedRight={(cardIndex) => {
                  swipeRight(cardIndex);
                  console.log("Swipe Match");
                }}
                overlayLabels={{
                  left: {
                    title: "NOPE",
                    style: {
                      label: {
                        textAlign: 'right',
                        color: 'red'
                      }
                    }
                  },
                  right: {
                    title: "Match",
                    style: {
                      label: {
                        textAlign: 'left',
                        color: 'green'
                      }
                    }
                  }
                }}
                cards={profiles}
                stackSize={10}
                cardIndex={0}
                animateCardOpacity
                verticalSwipe={false}
                renderCard={(card) => {
                  return card ?  (
                    <View
                      key={card.id}
                      style={{ height: "80%", position: "relative", borderRadius: 20, backgroundColor: 'white' }}
                    >
                      <Image
                        style={tw.style(
                          "absolute top-0 h-full w-full rounded-xl"
                        )}
                        source={{ uri: card.photoUrl }}
                      />

                      <View
                        style={tw.style(
                          "absolute bottom-0 bg-white  w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl",

                        )}
                      >
                        <View>
                          <Text style={tw.style("text-xl font-bold")}>
                          {card.formData.name.split(' ')[0]},{card.formData.age}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('UserProfile', { card }) }}>
                          <Feather
                            name="arrow-up-circle"
                            size={34}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) 

                  : (
                    <View
                      style={[tw.style(
                        "relative bg-white h-3/4 rounded-xl  shadow-xl"
                      ), { justifyContent: 'center', alignItems: 'center' }]}
                    >
                      <Text style={tw.style("font-bold pb-5")}>
                        No more Profiles
                      </Text> 
                      <Svg
                        width={50}
                        height={52}
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        color="black"
                      >
                        <Path
                          fill="currentColor"
                          d="M32 2C15.428 2 2 15.428 2 32s13.428 30 30 30s30-13.428 30-30S48.572 2 32 2m0 57.5C16.836 59.5 4.5 47.164 4.5 32S16.836 4.5 32 4.5c15.163 0 27.5 12.336 27.5 27.5c0 1.357-.103 2.69-.294 3.996c-.838-5.66-5.69-10.766-5.69-10.766s-5.828 6.113-5.828 12.375c0 6.353 6.393 7.996 9.708 4.937C53.251 52.488 43.431 59.5 32 59.5"
                        />
                        <Circle cx={38.498} cy={35} r={5} fill="currentColor" />
                        <Circle cx={15.498} cy={35} r={5} fill="currentColor" />
                        <Path
                          fill="currentColor"
                          d="M21.992 21.58c.541-.469-.971-2.061-1.414-1.674a14.232 14.232 0 0 1-11.693 3.133c-.578-.113-1.088 2.021-.385 2.156a16.417 16.417 0 0 0 13.492-3.615m23.121 1.307c-4.168.748-8.455-.4-11.691-3.133c-.443-.389-1.955 1.205-1.412 1.674a16.418 16.418 0 0 0 13.492 3.615c.703-.135.191-2.27-.389-2.156M38.074 47.33c-5.766-1.549-12.049-.428-16.93 3.014c-1.205.869 1.053 4.027 2.252 3.152c3.223-2.268 8.352-3.834 13.66-2.432c1.423.377 2.536-3.308 1.018-3.734"
                        />
                      </Svg>
                    </View>
                  )
                }}
                
              />
            </View>
          }


          {profiles && 
            <View
              style={{
                width: "100%",
                position: "absolute",
                height: 100,
                bottom: -20,
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#fff",
                  elevation: 5,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => swipeRef.current.swipeLeft()}
              >
                <Image
                  source={require("../assets/icons/cancel.png")}
                  style={{ width: 34, height: 34 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#fff",
                  elevation: 5,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => swipeRef.current.swipeRight()}
              >
                <Image
                  source={require("../assets/icons/heart.png")}
                  style={{ width: 40, height: 40,tintColor: "#00FFC8" }}
                />
              </TouchableOpacity>
            </View>
          }
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Home;

// useEffect(() => {
  //   let unsubscribe;

  //   const fetchUser = async () => {
  //     try {
  //       setLoading(true);
  //       const userDoc = await getDoc(doc(db, 'users', userid));
  //       if (userDoc.exists()) {
  //         const userData = { id: userDoc.id, ...userDoc.data() }; // Include ID along with user data
  //         setUser(userData); // Set user state
  //       } else {
  //         console.log("Document does not exist.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();

  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, []); // This useEffect runs only once to fetch user data



// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import useAuth from '../components/useAuth'; // Adjust the path accordingly
// import { useNavigation } from '@react-navigation/native';

// const YourComponent = () => {
//   const { userData, loading } = useAuth();
//  const id = userData.id;
//  const navigation = useNavigation();

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }
 
//   return (
// <View>
//   <TouchableOpacity onPress={() => {navigation.navigate('profile', {id})}}>
//     <Text>click</Text>
//   </TouchableOpacity>
// </View>
//   );
// };
 
// export default YourComponent;

