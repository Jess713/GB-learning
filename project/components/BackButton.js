import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

/**
 * This is where the back button is configured and animated
 */
const BackButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image style={styles.image} source={require("../assets/arrow_back.png")} />
  </TouchableOpacity>
);
/**
 * This is the position of the back button on the app with the set size
 */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 10
  },
  image: {
    width: 24,
    height: 24
  }
});

export default memo(BackButton);
