import React, { memo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Picker} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator
} from "../core/utils";
import { signInUser } from "../api/auth-api";
import firebase from "firebase/app";
import Toast from "../components/Toast";

export const productName = "";

const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [product, setProduct] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const setVal = (val)=>{
  //   this.setState({language:val});
  // }
  const _onSignUpPressed = async () => {
    if (loading) return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
   // var pickerVal;
    const response = await signInUser({
      name: name.value,
      email: email.value,
      password: password.value,
      product : product.value
    });

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);

    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //      console.log("user ",user);
    //     // User is logged in
    //     navigation.navigate("LandingScreen");
    //   } else {
    //     // User is not logged in
    //     console.log("user ",user);
    //     console.log("SIGN UP FAILL");
    //     navigation.navigate("LoginScreen");
    //   }
    // });

    var user = firebase.auth().currentUser;

    if (user) {
      console.log("logged in");
      // resetAction;
      navigation.navigate("App");
      
      
    // User is signed in.
    } else {
      console.log("not logged in");

    // No user is signed in.
    }

  };



  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HomeScreen")} />

      <Logo />

      <Header>Create Account</Header>

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

      <TextInput
        label="ProductName"
        returnKeyType="done"
        value={product.value}
        onChangeText={text => setProduct({ value: text, error: ""})}
        secureTextEntry
        autoCapitalize="none"
      />
      
 <View style={styles.Container}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex:.5}}>
        <Text>Select your product:</Text>
      </View>
      <View style={{flex:.5}}>
      <Picker
        // selectedValue={this.state.language}
        selectedValue = {()=>{this.state.language}}
        style={{height: 50, width: 225}}
        // onValueChange={(itemValue, itemIndex) =>
          // this.setState({language: itemValue})}
          onValueChange={(itemValue)=>{console.log("here",itemValue);
          productName = itemValue;
          // itemValue = {product.itemValue}
          // onValueChange= {text => setProduct({ itemValue: text, error: ""})}
         }}
        >
        <Picker.Item label="EpiSim Suturing Task Trainer" value="EpiSim" />
        <Picker.Item label="Fetal Skull" value="FetalSkull" />
        <Picker.Item label="FistulaSim" value="FistSim" />
        <Picker.Item label="OasisSim Obstetrics Simulation Task Trainer" value="OOSTT" />
        <Picker.Item label="PeriSim Obstetrics Simulation Task Trainer" value="POSTT" />
      </Picker>
      </View>
    </View>
  </View>
      <Button
        loading={loading}
        mode="contained"
        onPress={_onSignUpPressed}
        style={styles.button}
      >
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary
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
    color: theme.colors.primary
  }
});

export default memo(RegisterScreen);