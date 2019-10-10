import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Image } from 'react-native';


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
      
      <View style={styles.container}>
        
        <Image style={styles.image} source={require('./images/logo.jpg')} />
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>

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
    display:'block',
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

