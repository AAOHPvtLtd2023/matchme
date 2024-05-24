import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ToastAndroid, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from '../components/Loading.js';
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";

class Item extends React.Component {
    handleLike = () => {
        // Add your function logic here
        const { item, onLike } = this.props;
        onLike(item);
    };

    handleDelete = () => {
        const { item, onDelete } = this.props;
        onDelete(item);
    };

    handleView = () => {
        const { item, onView } = this.props;
        onView(item);
    }

    render() {
        const { item } = this.props;
        return (
            <View style={styles.listItem} >
                <View style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row" }}>
                    <View style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this.handleView}>
                        <Image source={{ uri: item.photoUrl }} style={{ width: 60, height: 60, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                        , width: 200, flexDirection: 'row'
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.formData.name} ,  </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.formData.age}</Text>
                    </View>
                </View>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 50,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={this.handleLike}
                    >
                        <AntDesign name="like2" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 50,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={this.handleLike}
                    >
                        <MaterialIcons name="cancel" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default function Like({ navigation }) {

    // const [user, setUser] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state

    useEffect(() => {
        // Fetch who likes
    }, [user]);

    const handleDeleteItem = async (item) => {
        ToastAndroid.show("Profile Deleted SuccessFully", ToastAndroid.SHORT);
    };

    const handleLikeItem = async (item) => {
        setLoading(true);
        // const loggedInprofile = (await getDoc(doc(db, 'users', user.id))).data();
        // const likerProfile = (await getDoc(doc(db, 'users', item))).data();
        const loggedInprofile = user;
        const likerProfile = item;

        setLoading(false);
        navigation.navigate('MatchScreen', { likerProfile, loggedInprofile })
    }

    const handleViewItem = (item) => {
        navigation.navigate('UserProfile',{card:item})
    }

    return (

        <View style={styles.container}>

            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {profiles &&
                        <LinearGradient style={{ height: '100%', width: '100%' }} colors={["#C499F3", "#F2AFEF"]}>
                            <SafeAreaView
                                style={{
                                    marginTop: 30,
                                    display: "flex",
                                    flexDirection: "row",
                                    height: 60,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "80%",
                                        display: "flex",
                                        marginLeft: 5,
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Ionicons name="return-up-back" size={34} color="black" />
                                    </TouchableOpacity>
                                    <View style={{ height: '100%', display: 'flex', justifyContent: 'center', marginLeft: 5, width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 25 }}>Like</Text>
                                    </View>


                                </View>



                            </SafeAreaView>
                            <View style={{ height: '100%', width: '100%' }}>

                                <FlatList
                                    style={{ flex: 1 }}
                                    key={(item) => profiles[item].id}
                                    data={profiles}
                                    renderItem={({ item }) => <Item item={item} user={user} onDelete={handleDeleteItem} onLike={handleLikeItem} onView={handleViewItem}/>}
                                    keyExtractor={(item) => item.email}

                                />

                            </View>
                        </LinearGradient>
                    }
                </>
            )}

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    listItem: {
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        height: 80,
        justifyContent: 'space-between'
    },
});
