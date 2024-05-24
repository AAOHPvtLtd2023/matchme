import React, { useState, useEffect, useCallback } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Modal, Image, StatusBar, StyleSheet } from "react-native";
import { Avatar, Bubble, Day, GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import LoadingScreen from "../components/Loading.js";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import ChatFooter from "../components/ChatFooter.js";
import LottieView from "lottie-react-native";
import moment from "moment";

const MessageScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const route = useRoute();
    const { matchDetails, user, matchedUserInfo } = route.params;
    // const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // fetch messages
    }, [matchDetails]);

    const onSend = useCallback(async (message = []) => {
        const msg = message[0];
        const mymsg = {
            ...msg,
            sentBy: user.id,
            sendTo: matchedUserInfo.id,
            createdAt: Date.parse(msg.createdAt),
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    })


    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "rgba(0,0,0,0)",
                        borderWidth: 0.5,
                        // elevation: 3,
                        borderColor: 'pink'

                    },
                    left: {
                        // backgroundColor: "#9AC8CD",
                        backgroundColor: "rgba(0,0,0,0)",
                        borderWidth: 0.5,
                        // elevation: 3,
                        borderColor: 'green'
                    },
                }}
                textStyle={{
                    right: {
                        color: "black",
                        fontWeight: "500",
                    },
                }}
            />
        );
    };

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{ borderTopColor: 'transparent' }}
                textInputStyle={{ color: "black" }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props} >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        marginBottom: 10,
                        marginRight: 5
                    }}
                >
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                        }}
                        size={35}
                        color="black"
                    />
                </View>
            </Send>
        );
    };

    const renderChatFooter = () => {
        return <ChatFooter />;
    };

    const scrollToBottomComponent = () => {
        return <FontAwesome name="angle-double-down" size={22} color="#333" />;
    };


    const renderActions = (props) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    // Implement your action here, e.g., opening a file picker
                    console.log("Attach file");
                }}
                style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                    marginBottom: 10
                }}
            >
                <MaterialCommunityIcons
                    name="attachment"
                    size={28}
                    color="black"
                    style={{ justifyContent: "center", alignSelf: "center" }}
                />
            </TouchableOpacity>
        );
    };

    const renderTicks = (message) => {
        if (message.user._id !== 1) {
            // Only render ticks for messages from the current user
            return null;
        }

        if (message.sent && !message.received) {
            // Message has been sent but not yet delivered
            return <Text style={{ color: 'gray' }}>✓</Text>;
        } else if (message.received && !message.read) {
            // Message has been delivered but not yet read
            return <Text style={{ color: 'blue' }}>✓✓</Text>;
        } else if (message.read) {
            // Message has been read
            return <Text style={{ color: 'green' }}>✓✓</Text>;
        }

        return null;
    };

    const renderTime = (props) => {
        // Format the timestamp using moment.js
        const formattedTime = moment(props.currentMessage.createdAt).format('LT');

        return (
            <Text style={{ color: 'black', fontSize: 12, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginLeft: 10 }}>
                {formattedTime}
            </Text>
        );
    };

    const renderAvatar = (props) => {
        const { currentMessage } = props;
        if (currentMessage.user._id !== user.id) {
            return (
                <Avatar
                    source={matchedUserInfo.photoUrl}
                    size="small"
                    rounded
                />
            );
        }
        return null;
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <View
            style={{
                backgroundColor: "#dfc8e4",
                flex: 1,
            }}
        >
            <StatusBar backgroundColor={'#dfc8e4'} barStyle={'dark-content'} />

            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    gap: 60,
                    height: '10%',
                    backgroundColor: "#dfc8e4",
                    opacity: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10

                }}
            >
                {matchedUserInfo &&
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "50%",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            // height:'100%'
                            marginTop: 20
                        }}
                    >
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                            <Ionicons name="return-up-back" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={{ height: 40, width: 40, borderRadius: 20 }}
                                source={{
                                    uri: matchedUserInfo?.photoUrl,
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: "black" }}>{matchedUserInfo.formData.name}</Text>
                    </View>
                }

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        alignSelf: 'center',
                        marginTop: 20
                    }}
                >
                    <TouchableOpacity>
                        <Ionicons name="call-outline" size={25} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            name="video-outline"
                            size={28}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="more-vertical" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ backgroundColor: "#fff", flex: 1, opacity: 1, borderRadius: 30 }}>
                <LottieView
                    style={{
                        position: "absolute",
                        height: "200%",
                        width: "100%",
                        opacity: 0.2,
                    }}
                    source={require("../assets/Love.json")}
                    loop
                    autoPlay
                    speed={1.2}
                />
                <LottieView
                    style={{
                        position: "absolute",
                        height: "150%",
                        width: "100%",
                        opacity: 0.2,
                    }}
                    source={require("../assets/Love.json")}
                    loop
                    autoPlay
                    speed={1.3}
                />
                <LottieView
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        opacity: 0.2,
                    }}
                    source={require("../assets/Love.json")}
                    loop
                    autoPlay
                    speed={1.4}
                />
                <LottieView
                    style={{
                        position: "absolute",
                        height: "50%",
                        width: "100%",
                        opacity: 0.2,
                    }}
                    source={require("../assets/Love.json")}
                    loop
                    autoPlay
                    speed={1.5}
                />
                <GiftedChat
                    messages={messages}
                    onSend={text => onSend(text)}
                    user={{
                        _id: user.id,
                        avatar: matchedUserInfo.photoUrl
                    }}
                    renderBubble={renderBubble}
                    renderSend={renderSend}
                    renderInputToolbar={renderInputToolbar}
                    alwaysShowSend={false}
                    renderAvatarOnTop={true}
                    showAvatarForEveryMessage={true}
                    // renderAvatar={renderAvatar}
                    renderActions={renderActions}
                    scrollToBottom
                    scrollToBottomComponent={scrollToBottomComponent}
                    style={{ color: "black" }}
                    textInputProps={styles.composer}
                    maxComposerHeight={100}
                    renderChatFooter={renderChatFooter}
                    renderTime={renderTime}
                />

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    time: {
        fontSize: 12,
        color: "grey",
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
    },
    composer: {
        backgroundColor: "#ddd",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "gray",
        paddingHorizontal: 10,
        // paddingTop: 8,
        fontSize: 16,
        marginVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        elevation: 20,
        marginBottom: 10,
    },
});

export default MessageScreen;


