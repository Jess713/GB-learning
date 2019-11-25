import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../core/theme";


/**
 * Js file for the paragraph style pre-setted.
 * imported in several files.
 */
const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;


/**
 * The style setting.
 */
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: "center",
    marginBottom: 14
  }
});

export default memo(Paragraph);
