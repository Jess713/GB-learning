import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
      <Text style={styles.header}>Registration</Text>

      <TextInput style={styles.textinput}placeholder="Your name" underlineColorAndroid={'transparent'}/>
      <TextInput style={styles.textinput}placeholder="Your Email" underlineColorAndroid={'transparent'}/>
      <TextInput style={styles.textinput}placeholder="Your Password" underlineColorAndroid={'transparent'}/>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.btntext}>Sign up</Text>
      </TouchableOpacity>
      </View>
      


    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
    alignItems:'center',
    
  },
  innerView:{
    alignItems:'center',
    width:400,
    height:500,
    borderWidth:5,
    borderColor:'rgba(128,128,128,0.4)'
  },
  header:{
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom:40,
    borderBottomColor:'#199187',
    borderBottomWidth: 1,
    color:'rgb(0,0,0)',
    fontWeight:'bold',
  },
  textinput:{
    alignSelf:'stretch',
    //weight:50,
    height:40,
    marginBottom:30,
    color: '#fff',
    borderBottomColor:'#f8f8f8',
    borderBottomWidth:1,
    textAlign: "center", 
  },
  button:{
    alignSelf:'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext:{
    color:'#fff',
    fontWeight:'bold',
  }
});
