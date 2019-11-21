import React, { memo, useState, Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import Constants from 'expo-constants';
import firebase from "firebase/app";
// const ref = firestore().collection('categories');
let videoListsName = {};
let videoListsURLs = {};
const DATA = [
  {
    id: 'first', //has to be string here for id
    title: 'Anatomical Models',
  },
  {
    id: 'second',
    title: 'Surgical Task Trainers',
  },
  {
    id: 'third',
    title: 'Patient Education',
  },
];

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={styles.item}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

// async function getDocs(){
//   const snapshot = await firebase.firestore().collection('categories').get()
//   return snapshot.docs.map(doc=> 

//     doc.data()
//   );
// }

/**
 * this listens to realtime database firestore
 * and stores them into arrays.
 */
async function getDocs(){
 
  const snapshot = await firebase.firestore().collection('categories').onSnapshot((snapshot)=>{
    let counter = 0;
    snapshot.forEach((doc)=>{
      counter ++;
      videoListsName.push({id: counter.toString(), title:doc.data().name});
      videoListsURLs.push(doc.data().URL);
    });
  });
  
}



// export default function LandingScreen() {
  const LandingScreen = ({navigation,navigationOptions})=>{
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
    //   alert(id);

      // getDocs().forEach(element => {
      //   console.log("hi!",element);
   
      getDocs();
      let myJSON = JSON.stringify(videoListsName);
      console.log("DATA",DATA);
      console.log("JSON",myJSON);
      let jsonObj={};
      
for (let i = 0; i <videoListsName.length; i++) {
  console.log(videoListsName[i])
  console.log("stringyfy",JSON.stringify(videoListsName[i]))
 
}
      console.log("json",jsonObj);
      console.log(videoListsURLs);
      // });
      setSelected(newSelected);
      // Actions.videolist({pressed: id});
      navigation.navigate('VideoList',{pressed: id});
    },
    [selected],
  );

  //  const usersCollectionRef = firestore.collection('categories');
   


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        // keyExtractor={}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
}
LandingScreen.navigationOptions = {
  title: 'Home',
  headerLeft: null,

};
const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: Constants.statusBarHeight,
    //display:"flex",
    flexDirection:"row",
    maxWidth:400,
    alignItems:'center',
    justifyContent:'center',
    height:700,
  },
  item: {
    height:300,
    display:"flex",
    flex:1,
    backgroundColor: '#8c7ba8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    //display:"flex",
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
});
export default memo(LandingScreen);