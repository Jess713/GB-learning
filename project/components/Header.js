import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../core/theme";

const Header = ({ children }) =>
 <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    // fontFamily: 'arial',
    color: "#363c74",
    fontWeight: "bold",
    paddingVertical: 14,
    marginTop:-30,

  }
});

export default memo(Header);
