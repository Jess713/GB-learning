import React, { memo, useState, useEffect } from "react";
import { StackActions } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";
import { loginUser } from "../api/auth-api";
import Toast from "../components/Toast";

/**
 * Sets the default name, email, password, error, and toast to an empty string
 */
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ value: "", type: "" });

  /**
   * After pressing the login up button, it will validate the user's email and 
   * password input and returns an error message if needed
   */
  const _onLoginPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    /**
     * Sets the validated email and password for Firebase to ensure login is successful
     */
    const response = await loginUser({
      email: email.value,
      password: password.value
    });
     /**
     * Displays a toast message if the login failed or succeeded
     */
    if (response.error) {
      setError(response.error);
      setToast({ type: "error", value: response.error });
      console.log("login failed");
    } else {
      console.log("Login success");
      setTimeout(() => navigation.navigate("App"), 1000);
      // resetAction;
    }

    setLoading(false);

  };
   /**
   * Page layout of the Login Screen.
   */
  return (
    <Background>
      {/* <BackButton goBack={() => navigation.navigate("HomeScreen")} /> */}

      <Logo />

      {/* <KeyboardAvoidingView behavior="padding" enabled> */}
      
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            // autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
            autoCapitalize="none"
          />

          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.label}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <Button style={{ backgroundColor: "#403a60" }} loading={loading} mode="contained" onPress={_onLoginPressed}>
            Login
      </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <Toast
            type={toast.type}
            message={toast.value}
            onDismiss={() => setToast({ value: "", type: "" })}
          />
      
      {/* </KeyboardAvoidingView> */}
    </Background>
  );
};
/**
 * Styling for the Login Screen page
 */
const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});

export default memo(LoginScreen);
