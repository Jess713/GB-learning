import React, { memo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Picker } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import RNPickerSelect from 'react-native-picker-select';
import {
  emailValidator,
  passwordValidator,
  nameValidator
} from "../core/utils";
import { signInUser } from "../api/auth-api";
import firebase from "firebase/app";
import Toast from "../components/Toast";
let productName;

/**
 * Gets the product name from the user and sets the value in productName variable
 */
const setProductName = (val) => {
  productName = val;
};
/**
 * Validates the user entries of the name, email, password, and product entries when
 * the user decides to register for an account
 */
const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  /**
   * When user presses "sign up" button, it will validate if it's a proper name,
   * email and if the password is strong enough
   */
  const _onSignUpPressed = async () => {
    if (loading) return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      /**
       * Sets the name as an error
       */
      setName({ ...name, error: nameError });
      /**
       * Sets the email as an error
       */
      setEmail({ ...email, error: emailError });
      /**
       * Sets the password as an error
       */
      setPassword({ ...password, error: passwordError });
      return;
    }
    /**
     * If no errors had occured and all parts of the register entries are valid,
     * then it will set the the new user's info in the database
     */
    setLoading(true);
    const response = await signInUser({
      name: name.value,
      email: email.value,
      password: password.value,
      product: productName,
    });

    if (response.error) {
      setError(response.error);
    }
    setLoading(false);

    var user = firebase.auth().currentUser;

    if (user) {
      console.log("logged in");
      // resetAction;
      navigation.navigate("App");
    } else {
      console.log("not logged in");
    }
  };



  /**
   * This section renders and displays what the user will see on the
   * RegisterScreen page
   */
  return (
    <Background>
      {/* <BackButton goBack={() => navigation.navigate("HomeScreen")} /> */}
      <Logo />

      {/* <Header style={{ marginTop: -30, color: "#363c74" }}>Create Account</Header> */}

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

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
      
      <RNPickerSelect
        placeholder={{ label: 'Please select your product', value: 'N/A', color: "#363c74", }}
        onValueChange={(value) => setProductName(value)}
        items={[
          { label: 'EpiSim Suturing Task Trainer', value: 'EpiSim', color: "#363c74" },
          { label: 'Fetal Skull', value: 'FetalSkull', color: "#363c74" },
          { label: 'FistulaSim', value: 'FistSim', color: "#363c74" },
          { label: 'OasisSim Obstetrics Simulation Task Trainer', value: 'OOSTT', color: "#363c74" },
          { label: 'PeriSim Obstetrics Simulation Task Trainer', value: 'POSTT', color: "#363c74" },
        ]}
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={_onSignUpPressed}
        style={styles.button}
      >
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={{ color: "#363c74" }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );

};
/**
 * Styling for the RegisterScreen page
 */
const styles = StyleSheet.create({
  label: {

  },
  button: {
    marginTop: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  link: {
    fontWeight: "bold",
    color: "#363c74",

  }
});

RegisterScreen.navigationOptions = {
  title: 'Create Account',
};

export default memo(RegisterScreen);