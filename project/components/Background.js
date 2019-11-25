import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { AuthSession } from "expo";
/**
 * Gets the background image and ensures any orientation of the screen
 * is resolved
 */
const Background = ({ children }) => (
  <ImageBackground
    source={require("../assets/background.png")}
    resizeMode="cover"
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);
/**
 * To ensure the background image takes over the whole screen
 */
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height:"100%",
    
    // backgroundColor:"#8385ad",
  },
  container: {
    backgroundColor:"#b8b8d2",
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth:350,
    height:"100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(Background);
