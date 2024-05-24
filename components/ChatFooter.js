import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    // padding: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    position:'absolute'
  },
  footerText: {
    color: 'gray',
  },
});

export default ChatFooter;
