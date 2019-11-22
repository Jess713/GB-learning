import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { AuthSession } from "expo";

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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    
    // backgroundColor:"#8385ad",
  },
  container: {
    backgroundColor:"#b8b8d2",
    height: "auto",
    flex: 1,
    padding: 20,
    width: "100%",
    
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(Background);
