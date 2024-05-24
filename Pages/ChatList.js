import React, { useEffect, useState } from "react";
import ChatRow from "../components/ChatRow";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TextInput,
} from "react-native";
import LoadingScreen from "../components/Loading";
import NoMatch from "../components/NoMatches";
import { useFonts } from "expo-font";


const ChatList = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true); // Introduce loading state
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const { userData } = useAuth();
    const user = userData;

    // const [fontsLoaded, fontError] = useFonts({
    //     'Classic': require('../assets/fonts/ClassyFont.ttf'),
    //     'customFont': require('../assets/fonts/Custom.ttf')
    //   });

    useEffect(() => {
        let unsubscribe;

        //   fetch chats
    }, [user]);

    useEffect(() => {
        let unsubscribe;

        //   fetch matches
    }, [user]);

    const filteredMatches = matches.filter(match => {
        // Filter matches based on search query
        const usersMatched = Object.values(match.users);
        // const userNames = usersMatched.map(user => user.formData.name); // Assuming 'name' is the property you want to search
        // return userNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    return loading ? (
        <LoadingScreen />
    ) : matches.length > 0 ?
        (
            <LinearGradient
                style={{ display: "flex", height: "100%" }}
                colors={["#9169c1", "#fff", "#dfc8e4"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                locations={Number[(0.1, 0.7)]}
            >

                {/* //Search// */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 20,
                        backgroundColor: "#e6e6e6",
                        marginLeft: 10,
                        marginRight: 10,
                        height: 40,
                        elevation: 25,
                        marginTop: 15
                    }}
                >
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={'gray'}
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                        style={{
                            flex: 1,
                            fontWeight: "600",
                            // padding: 16,
                            marginLeft: 10
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            borderRadius: 20,
                            padding: 12,
                            marginRight: 6,
                        }}
                    >
                        <Ionicons name="search" size={18} color="black" />
                    </TouchableOpacity>
                </View>

                {/* //Horizontal Profile // */}
                <SafeAreaView
                    style={{
                        height: 100,
                        width: "100%",
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ display: 'flex', justifyContent: 'center', alignSelf: 'flex-start', fontSize: 20, marginLeft: 10, fontFamily: 'Classic' }}>Matched People</Text>
                    {matchedUserInfo &&
                        <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <FlatList
                                data={matchedUserInfo}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    // <TouchableOpacity>
                                    <View style={{ width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 6, marginRight: 6 }}>
                                        <TouchableOpacity>
                                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={{
                                                        uri: item.photoUrl,
                                                    }}
                                                    style={{ height: 60, width: 60, borderRadius: 30 }}
                                                />
                                                <Text style={{ fontFamily: 'customFont' }}>{item.formData.name.length > 5 ? item.formData.name.slice(0, 5) + "..." : item.formData.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    }
                </SafeAreaView>


                {/* //Message List// */}
                {filteredMatches.length > 0 &&
                    <View style={styles.container}>
                        <Text style={{ display: 'flex', justifyContent: 'center', alignSelf: 'flex-start', fontSize: 25, marginLeft: 10, fontFamily: 'Classic' }}>Messages</Text>
                        <FlatList
                            data={filteredMatches}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <ChatRow matchDetails={item} />
                            )}
                        />
                    </View>
                }
                {filteredMatches.length === 0 && <NoMatch />}
            </LinearGradient>
        )
        : (
            <NoMatch />
        );
};

export default ChatList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 25,
    },
    card: {
        width: "100%",
        height: 100,
    },
    userInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    userImgWrapper: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textSection: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    userInfoText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    userName: {
        fontSize: 14,
        fontWeight: "bold",
        // fontFamily: "Lato-Regular",
    },
    postTime: {
        fontSize: 12,
        color: "#666",
        // fontFamily: "Lato-Regular",
    },
    messageText: {
        fontSize: 14,
        color: "#333333",
    },
    rotatedFlatList: {
        transform: [{ scaleY: -1 }],
    },
});

