import { useRoute } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  NativeEventEmitter,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  //   NativeEventEmitter
} from "react-native";
const { width, height } = Dimensions.get("screen");
// import Animated from 'react-native-reanimated';



const imageW = width * 0.7;
const imageH = height * 0.5;
export default function BlurImageBg({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const { img } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
          {img.map((image, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                key={`image-${index}`}
                source={{ uri: image }}
                style={[StyleSheet.absoluteFillObject, { opacity }]}
                blurRadius={30}
              />
            );
          })}
  
      </View>
      <Animated.FlatList
        data={img}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true } // Make sure to set this to false if you are using state or props
        )}
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 20,
                shadowOpacity: 1,
                elevation: 40,
              }}
            >
              <Image
                source={{ uri: item }}
                key={index}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: "cover",
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
