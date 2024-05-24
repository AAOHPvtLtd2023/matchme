import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import {
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome6,
    Feather,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
const { height, width } = Dimensions.get("window");
import * as Animatable from 'react-native-animatable';
import Tabs from "../navigators/BottomNavigationBar";
import { useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";




const renderItem = ({ item }) => (
    <View
        style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}
    >
        <Image
            source={{ uri: item }}
            style={{ height: "100%", width: 350, resizeMode: "conta", marginLeft: 20, marginRight: 20, borderRadius: 10, }}
        />
    </View>
);

export default function MatchProfilePage({ navigation }) {
    const route = useRoute();
    const { card } = route.params;
    const user = card;
    // const [fontsLoaded, fontError] = useFonts({
    //     'nameFont': require('../assets/fonts/Name.ttf'),
    //     'custom1': require('../assets/fonts/Custom.ttf')
    // });
    useEffect(() => { console.log(user); })

    return (
        <View style={Mainstyles.container}>
            <LinearGradient
                colors={["#fff", "#fff", "black"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                locations={Number[(0.1, 0.7)]}
            >
                <LottieView
                    source={require("../assets/Love.json")}
                    autoPlay
                    loop={false}
                    speed={3}
                    style={{
                        height: "200%",
                        width: "100%",
                        position: "absolute",
                        opacity: 0.6,
                    }}
                />
                <LottieView
                    source={require("../assets/Main-BackGround.json")}
                    autoPlay
                    loop
                    speed={3}
                    style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        opacity: 0.6,
                    }}
                />
                <BlurView
                    tint="systemMaterialDark"
                    intensity={20}
                    style={{ height: "100%", width: "100%" }}
                >
                    <View style={Mainstyles.backbar}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Ionicons name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    {user &&
                        <ScrollView style={{ height: "100%", width: "100%" }}>
                            <View style={Mainstyles.upper}>

                                {/* Profile photos */}
                                <View style={Mainstyles.imageArea}>
                                    <FlatList
                                        data={user.profilePicsURLs}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.index}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>

                                {/* Name & address */}
                                <View style={Mainstyles.nameArea}>
                                    <Text style={Mainstyles.name1}>{user.formData.name}</Text>
                                    <Text style={{ fontSize: 22, marginLeft: 10 }}>
                                        {user.formData.address}
                                    </Text>
                                </View>


                                <View style={Mainstyles.smallCard}>
                                    <View style={{ width: "80%" }}>
                                        <View
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                justifyContent: "space-around",
                                                alignItems: "center",
                                            }}
                                        >
                                            {/* Gender & age */}
                                            <Animatable.View
                                                animation="fadeIn"
                                                delay={1000}
                                                style={{
                                                    height: "auto",
                                                    width: "auto",
                                                    borderWidth: 0.5,
                                                    padding: 5,
                                                    elevation: 3,
                                                    backgroundColor: "transparent",
                                                    borderRadius: 50,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                }}
                                            >
                                                {/* Gender */}
                                                {user.formData.gender === 'male' ? (<Ionicons name="male" size={20} color="black" />)
                                                    : (<Ionicons name="female-sharp" size={20} color="black" />)}
                                                {/* age */}
                                                <Text style={{ fontSize: 15 }}>{user.formData.age}</Text>
                                            </Animatable.View>

                                            {/* Zodiac */}
                                            <Animatable.View
                                                animation="fadeIn"
                                                delay={1000}
                                                style={{
                                                    height: "auto",
                                                    width: "auto",
                                                    borderWidth: 0.5,
                                                    padding: 5,
                                                    elevation: 5,
                                                    backgroundColor: "transparent",
                                                    borderRadius: 50,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <Entypo name="moon" size={20} color="black" />
                                                <Text style={{ fontSize: 15, marginLeft: 5 }}>
                                                    {user.formData.Zodiac}
                                                </Text>
                                            </Animatable.View>

                                            {/* Personality Type */}
                                            <Animatable.View
                                                animation="fadeIn"
                                                delay={1000}
                                                style={{
                                                    height: "auto",
                                                    width: "auto",
                                                    borderWidth: 0.5,
                                                    padding: 5,
                                                    elevation: 5,
                                                    backgroundColor: "transparent",
                                                    borderRadius: 50,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <Feather name="activity" size={20} color="black" />
                                                <Text style={{ fontSize: 15, marginHorizontal: 6 }}>
                                                    ENFJ
                                                </Text>
                                            </Animatable.View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Looking for */}
                            <Animatable.View
                                animation="slideInUp"
                                duration={800}
                                style={{
                                    height: 'auto',
                                    flex: 1,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: height * 0.02,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: "transparent",
                                        height: "100%",
                                        width: "90%",
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        justifyContent: "center",
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginLeft: 10,
                                        }}
                                    >
                                        Lokking For :
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {user.formData.lookingFor}
                                    </Text>
                                </View>
                            </Animatable.View>

                            {/* Second Card  */}
                            {/* About  */}
                            <Animatable.View
                                animation="slideInUp"
                                duration={800}
                                delay={400}
                                style={{
                                    height: 'auto',
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                    marginTop: height * 0.02,
                                }}
                            >
                                <View
                                    style={{
                                        height: "100%",
                                        width: "90%",
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        padding: 10
                                    }}
                                >
                                    <View style={{ marginLeft: 0, marginRight: 0 }}>
                                        <Text style={{ fontSize: 15 }}>About Me...</Text>
                                        <Text
                                            style={{
                                                textAlign: "justify",
                                                fontSize: 18,
                                                justifyContent: "center",
                                            }}
                                        >
                                            {user.formData.aboutme}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            justifyContent: "space-around",
                                            alignSelf: "center",
                                        }}
                                    >
                                        {/* Drink */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginBottom: 20,
                        flexDirection: "row",
                        elevation: 3,
                      }}
                    >
                      <Entypo name="drink" size={18} color="black" />
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily:'custom1'
                        }}
                      >
                        {user.formData.drinking || 'not given'}
                      </Text>
                    </Animatable.View>

                    {/* Smoking */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        flexDirection: "row",
                        marginBottom: 20,
                        elevation: 3,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="cigar"
                        size={22}
                        color="black"
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily:'custom1'
                        }}
                      >
                        {user.formData.smoking || 'not given'}
                      </Text>
                    </Animatable.View>

                    {/* pet */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        flexDirection: "row",
                        marginBottom: 20,
                        elevation: 3,
                      }}
                    >
                      <MaterialIcons name="pets" size={20} color="black" />

                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily:'custom1'
                        }}
                      >
                        {user.formData.pets || 'not given'}
                      </Text>
                    </Animatable.View>

                    {/* education */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        flexDirection: "row",
                        marginBottom: 20,
                        elevation: 3,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="book-education-outline"
                        size={20}
                        color="black"
                      />

                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily:'custom1'
                        }}
                      >
                        {user.formData.education || 'not given'}
                      </Text>
                    </Animatable.View>

                    {/* workout */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        elevation: 3,
                        marginBottom: 20,
                        flexDirection: "row",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="dumbbell"
                        size={18}
                        color="black"
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily: 'custom1'
                        }}
                      >
                        {user.formData.workout || 'not given'}
                      </Text>
                    </Animatable.View>

                    {/* dietaryPreference */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        elevation: 3,
                        marginBottom: 20,
                        flexDirection: "row",
                      }}
                    >
                      <Ionicons
                        name="fast-food-outline"
                        size={18}
                        color="black"
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily: 'custom1'
                        }}
                      >
                        {user.formData.dietaryPreference || 'not given'}
                      </Text>
                    </Animatable.View>

                    {/* Height  */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        elevation: 3,
                        marginBottom: 20,
                        flexDirection: "row",
                      }}
                    >
                      <MaterialIcons name="height" size={20} color="black" />
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily:'custom1'
                        }}
                      >
                        {user.formData.personHeight} cm
                      </Text>
                    </Animatable.View>

                    {/* Weight */}
                    <Animatable.View
                      animation="fadeIn"
                      duration={1000}
                      style={{
                        borderWidth: 1,
                        height: "auto",
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        elevation: 3,
                        marginBottom: 20,
                        flexDirection: "row",
                      }}
                    >
                      <FontAwesome6
                        name="weight-scale"
                        size={18}
                        color="black"
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily:'custom1'
                        }}
                      >
                        {user.formData.personWeight} Kg
                      </Text>
                    </Animatable.View>
                                    </View>
                                </View>
                            </Animatable.View>
                            {/* Third Card  */}
                            {/* Suprise things */}
                            <Animatable.View
                                animation="slideInUp"
                                duration={800}
                                style={{
                                    // height: height * 0.15,
                                    height: 'auto',
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                    marginTop: height * 0.02
                                }}
                            >
                                <View
                                    style={{
                                        width: "90%",
                                        height: "100%",
                                        borderWidth: 0.5,
                                        borderRadius: 10,
                                        padding: 10
                                    }}
                                >
                                    <View style={{ marginLeft: 0, marginRight: 5 }}>
                                        <Text style={{ fontSize: 15 }}>A Suprise Things is ..</Text>
                                        <Text style={{ fontSize: 20, textAlign: "justify" }}>
                                            {user.formData.surpriseThing || 'not given'}
                                        </Text>
                                    </View>
                                </View>
                            </Animatable.View>
                            {/* Fourth Card  */}
                            <Animatable.View
                                animation="slideInUp"
                                duration={800}
                                style={{
                                    // height: height * 0.2,
                                    height: 'auto',
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                    marginTop: height * 0.02
                                }}
                            >
                                <View
                                    style={{
                                        height: "100%",
                                        width: "90%",
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 10
                                    }}
                                >
                                    <Text style={{ fontSize: 20 }}>Intrests</Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            justifyContent: "space-around",
                                            alignSelf: "center",
                                        }}
                                    >
                                        {user.formData.intrests.map((ints, index) => (
                                            <Animatable.View
                                                animation="fadeIn"
                                                duration={1000}
                                                style={{
                                                    borderWidth: 1,
                                                    height: "auto",
                                                    width: "auto",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderRadius: 20,
                                                    padding: 5,
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    marginBottom: 20,
                                                    flexDirection: "row",
                                                    elevation: 3,
                                                }}
                                            >

                                                <Text
                                                    key={index}
                                                    style={{
                                                        fontSize: 15,
                                                        marginLeft: 5,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {ints}
                                                </Text>
                                            </Animatable.View>
                                        ))}

                                    </View>
                                </View>
                            </Animatable.View>
                            {/* Fifth Card  */}
                            <Animatable.View
                                animation="slideInUp"
                                duration={800}
                                style={{
                                    height: 'auto',
                                    flex: 1,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: height * 0.02
                                }}
                            >
                                <View
                                    style={{
                                        height: "100%",
                                        width: "90%",
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 10
                                    }}
                                >
                                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20 }}>My Love Style</Text>
                                        <View
                                            style={{
                                                borderWidth: 1,
                                                height: "auto",
                                                width: "auto",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 20,
                                                padding: 5,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                // marginBottom: 20,
                                                flexDirection: "row",
                                                elevation: 3,
                                                marginLeft: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    marginLeft: 5,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {user.formData.loveStyle || 'not given'}
                                            </Text>
                                        </View>
                                    </View>


                                </View>
                            </Animatable.View>
                            {/* Sixth Card  */}
                            <Animatable.View
                                animation="slideInUp"
                                duration={800}
                                style={{
                                    // height: height * 0.2,
                                    height: 'auto',
                                    flex: 1,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: height * 0.02
                                }}
                            >
                                <View
                                    style={{
                                        height: "100%",
                                        width: "90%",
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 10
                                    }}
                                >
                                    <Text style={{ fontSize: 20 }}>Languages</Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            justifyContent: "space-around",
                                            alignSelf: "center",
                                        }}
                                    >
                                        {user.formData.language.map((lan, index) => (

                                            <View
                                                style={{
                                                    borderWidth: 1,
                                                    height: "auto",
                                                    width: "auto",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderRadius: 20,
                                                    padding: 5,
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    marginBottom: 20,
                                                    flexDirection: "row",
                                                    elevation: 3,
                                                }}
                                            >
                                                <Text
                                                    key={index}
                                                    style={{
                                                        fontSize: 15,
                                                        marginLeft: 5,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {lan}
                                                </Text>
                                            </View>
                                        ))}

                                    </View>
                                </View>
                            </Animatable.View>
                            {/* Seventh Card  */}
                            <Animatable.View
                                animation="slideInUp"
                                duration={800}
                                style={{
                                    height: 'auto',
                                    flex: 1,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: height * 0.02,
                                    marginBottom: height * 0.03
                                }}
                            >
                                <View
                                    style={{
                                        height: "100%",
                                        width: "90%",
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 10
                                    }}
                                >
                                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}>
                                        <Text style={{ fontSize: 20 }}>My Comuunication Style</Text>
                                        <View
                                            style={{
                                                borderWidth: 1,
                                                height: "auto",
                                                width: "auto",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 20,
                                                padding: 5,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                flexDirection: "row",
                                                elevation: 3,
                                                marginLeft: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    marginLeft: 5,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {user.formData.communicationStyle || 'not given'}                                            </Text>
                                        </View>
                                    </View>


                                </View>
                            </Animatable.View>
                        </ScrollView>
                    }
                </BlurView>
            </LinearGradient>
        </View>
    );
}

const Mainstyles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        position: "relative",
        flexDirection: "column",
        marginBottom: Tabs.currentHeight || 50,
    },
    backbar: {
        width: "100%",
        justifyContent: "center",
        marginLeft: width * 0.02,
        marginTop: height * 0.04,
    },
    upper: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageArea: {
        height: height * 0.49,
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
    },
    image: {
        height: "100%",
        width: "100%",
        alignSelf: "center",
        overflow: "hidden",
    },
    nameArea: {
        width: "100%",
        height: height * 0.08,
        justifyContent: "center",
        alignItems: "center",
    },
    name1: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "800",
    },
    name2: {
        fontSize: 19,
        fontWeight: "500",
        color: "#fff",
    },
    smallCard: {
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
    },
    card: {
        height: 70,
        width: 70,
        borderRadius: 20,
        borderWidth: 0.5,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    cardBlur: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    cardGradiant: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    lower: {
        width: "100%",
        height: height * 0.6,
        overflow: "hidden",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: "white",
        borderWidth: 0.5,
    },
    row: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "rgba(255,255,255,0.5)",
        marginBottom: 5,
    },
    signMargin: {
        marginLeft: 5,
    },
    detailsrow: {
        width: "100%",
        fontSize: 22,
        color: "#B9B4C7",
        marginLeft: 3,
        fontWeight: "bold",
    },
});
