import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";
/**
 * Different styles of buttons are created depending on the style
 */
const Button = ({ mode, style, children, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      mode === "outlined" && { backgroundColor: theme.colors.surface },
      style
    ]}
    labelStyle={[
      styles.text,
      mode === "contained" && { color: theme.colors.surface }
    ]}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);
/**
 * Button styling, determing physical size and text size and colour
 */
const styles = StyleSheet.create({
  button: {
    width: "85%",
    marginVertical: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color:"#ffffff",
  }
});

export default memo(Button);
