import React, { memo, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { emailValidator } from "../core/utils";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import Button from "../components/Button";
import { sendEmailWithPassword } from "../api/auth-api";
import Toast from "../components/Toast";
/**
 * 
 *  This class ( ForgotPasswordScreen.js) is supporting a function for users who already signed up,
 *  but forgot their account password. The function is connected with Firebase database.
 *  
 */
const ForgotPasswordScreen = ({ navigation }) => {
  /**
   * Set the varaibles to empty at the initial loading.
   */
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });
  /**
  *  onClick function for button if user click "Send Reset Instructions"
  */
  const _onSendPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    console.log("here");

    setLoading(true);

    const response = await sendEmailWithPassword(email.value);

    if (response.error) {
      setToast({ type: "error", value: response.error });
      console.log("here2");
    } else {
      setToast({
        type: "success",
        value: "Email with password has been sent."
      });
    }
  
    setLoading(false);
  };
  /**
   * Below code represents contexts of the page.
   */

  return (
    <Background>
      {/* <BackButton goBack={() => navigation.navigate("LoginScreen")} /> */}

      <Logo />

      <Header>Restore Password</Header>


      {/* Email address input section with the functions above execute  */}
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      {/* Button that if it pressed, _onSendPressed function above execute */}
      <Button
        loading={loading}
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}
      >
        Send Reset Instructions
      </Button>

      {/* Button for going back to login by using Router  */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>

      <Toast
        type={toast.type}
        message={toast.value}
        onDismiss={() => setToast({ value: "", type: "" })}
      />
    </Background>
  );
};


/**
 * Style sheet for HTML template.
 */
const styles = StyleSheet.create({
  back: {
    width: "100%",
    marginTop: 12
  },
  button: {
    marginTop: 12,
    backgroundColor: "#403a60",
  },
  label: {
    color: theme.colors.secondary,
    width: "100%"
  }
});

/**
 * React Native navigation library...
 */
export default memo(ForgotPasswordScreen);