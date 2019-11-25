import React, { memo } from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "../core/theme";


/**
 * This class is for the error warning message
 * It shows when users put wrong input(empty, format)
 */
const Toast = ({ type = "error", message, onDismiss }) => (
  <View style={styles.container}>
    <Snackbar
      visible={!!message}
      duration={2000}
      onDismiss={onDismiss}
      style={{
        backgroundColor:
          type === "error" ? theme.colors.error : theme.colors.success
      }}
    >
      <Text style={styles.content}>{message}</Text>
    </Snackbar>
  </View>
);


/**
 * For the style set of the error message...
 */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80 + getStatusBarHeight(),
    width: "100%"
  },
  content: {
    fontWeight: "500"
  }
});

export default memo(Toast);
