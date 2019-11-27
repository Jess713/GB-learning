import React, { memo, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
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
const setProductName = (val) => {
  productName = val;
};
/**
 * Sets the default name, email, password, error, and toast to an empty string
 */
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ value: "", type: "" });

  /**
   * After pressing the sign up button, it will validate the user's input and
   * return an error message if needed
   */
  const _onSignUpPressed = async () => {
    if (loading) return;
    console.log(productName);
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else if (productName === "N/A" || !productName) {
      setToast({ type: "error", value: "Please select your product" });
      return;
    }
    /**
     * Sets the validated name, email, password and product name for Firebase to ensure 
     * registering is successful
     */
    setLoading(true);
    const response = await signInUser({
      name: name.value,
      email: email.value,
      password: password.value,
      product: productName,
    });
    /**
     * Displays a toast message if user forgets to select product name
     */
    if (response.error) {
      setError(response.error);
      setToast({ type: "error", value: response.error });
    }
    setLoading(false);
    /**
     * Creates and authenticates the user in Firebase
     */
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
   * Page layout of the Register Screen.
   */
  return (
   
    <ScrollView style={{backgroundColor:'#B8B8D4'}}>
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
          style={{width:370,margin:'auto',}}
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
          style={{width:370,margin:'auto',}}
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
          style={{width:370,margin:'auto',}}
        />

        <RNPickerSelect
          placeholder={{}}
          onValueChange={(value) => setProductName(value)}
          items={[
            { label: 'Please select your product', value: 'N/A', color: "#363c74" },
            { label: 'EpiSim Task Trainer', value: 'EpiSim', color: "#363c74" },
            { label: 'FistulaSim Task Trainer', value: 'FistSim', color: "#363c74" },
            { label: 'OasisSim Task Trainer', value: 'OasisSim', color: "#363c74" },
            { label: 'PeriSim Task Trainer', value: 'PeriSim', color: "#363c74" },
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
          <Text style={{ color: "#363c74", marginBottom: 30, }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

        <Toast
          type={toast.type}
          message={toast.value}
          onDismiss={() => setToast({ value: "", type: "" })}
        />
      </Background>
    </ScrollView>
    
  );

};
/**
 * Styling for the Register Screen page
 */
const styles = StyleSheet.create({
  label: {

  },
  button: {
    marginTop: 24,
    backgroundColor: "#403a60",
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