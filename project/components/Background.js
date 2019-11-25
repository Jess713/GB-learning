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
  },
  container: {
    backgroundColor:"#b8b8d2",
    height: "auto",
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 410,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(Background);
