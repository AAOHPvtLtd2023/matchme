import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import moment from "moment";
import { useFonts } from "expo-font";

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [lastMessageTime, setLastMessageTime] = useState(null);

    // const [fontsLoaded, fontError] = useFonts({
    //     'custom': require('../assets/fonts/Custom.ttf')
    //   });
      
    useEffect(() => {
        const fetchMatchedUserInfo = async () => {
          
        };

        fetchMatchedUserInfo();
    }, [matchDetails, user]); // Adding matchDetails and user as dependencies

    useEffect(() => {
        // last message
    }, [matchDetails.id]);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("message", { matchDetails, user,matchedUserInfo })}
        >
            {matchedUserInfo &&
                <View style={styles.userInfo}>
                    <View style={styles.userImgWrapper}>
                        <Image
                            source={{ uri: matchedUserInfo?.photoUrl }}
                            style={styles.userImg}
                        />
                    </View>
                    <View style={styles.textSection}>
                        <View style={styles.userInfoText}>
                            <Text
                                style={{
                                    fontFamily: 'custom',
                                    fontSize: 15,
                                }}
                            >
                                {matchedUserInfo?.formData.name} {/* I removed "name" here. */}
                            </Text>
                            {lastMessageTime &&
                                <Text style={styles.postTime}>{moment(lastMessageTime).format('LT')  || ''}</Text>
                            }
                        </View>
                        <Text style={styles.messageText}>{lastMessage|| 'say Hi'}</Text>
                    </View>
                </View>
            }
        </TouchableOpacity>
    );
};


export default ChatRow;



const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 100,
    },
    userInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center'
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