import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import React, { Component } from 'react';
import { Alert, TextInput, View, StyleSheet, Image } from 'react-native';


export default class App extends Component {
   static navigationOptions ={
    title: "Granville Biomedical Inc.",
    headerTitleStyle: { textAlign: 'center',flex:1},
    
  };


  // HomeScreen.navigationOptions = {
  //     header: null,
  //   };




  constructor(props) {
    super(props);

    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  
  onLogin() {
    const { username, password } = this.state;
    Alert.alert('Credentials', `${username} + ${password}`);
  }

  render() {
    return (
      
      <Background>
      <Logo />
      <Header>Firebase Login</Header>
  
      <Paragraph>
        This template supports Firebase authorization out of the box.
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  image: {
    width:100,
    height:100,
    display:'flex',
  }
});


function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

