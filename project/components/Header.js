import React, { memo } from "react";
import { StyleSheet, Text, Platform } from "react-native";
import { theme } from "../core/theme";
/**
 * The header is created depending on which child (screen) is passed in
 */
const Header = ({ children }) =>
 <Text style={styles.header}>{children}</Text>;
/**
 * Style of the header on the app with arial font, for ios, roboto font 
 * for android, and the physical layout of the header on the app
 */
const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }
 }),
    color: "#363c74",
    fontWeight: "bold",
    paddingVertical: 14,
    marginTop:-30,

  }
});

export default memo(Header);
