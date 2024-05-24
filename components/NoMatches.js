import LottieView from "lottie-react-native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NoMatch() {
  return (
    <View style={styles.footerContainer}>
      <LottieView
        source={require("../assets/sorry.json")}
        style={{
          display: "flex",
          position: "relative",
          height: "80%",
          width: "100%",
        }}
        autoPlay
        loop
        speed={0.7}
      />
      <Text style={styles.footerText}>No matches Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  footerText: {
    color: "gray",
    fontSize: 24,
    textAlign: "center",
    
  },
});

