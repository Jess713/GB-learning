import React, { memo, useState, Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import Constants from 'expo-constants';

const DATA = [
  {
    id: 'first', //has to be string here for id
    title: 'Anatomical Models',
  },
  
  
  // {
  //   id: 'fourth',
  //   title: 'Fourth Item',
  // },
];

const DATA2 = [
  {
    id: 'second',
    title: 'Surgical Task Trainers',
  }
];

const DATA3 =[
  {
    id: 'third',
    title: 'Patient Education',
  },
]

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

function Item2({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={styles.item2}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>

  );
}
function Item3({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={styles.item3}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>

  );
}


// export default function LandingScreen() {
  const LandingScreen = ({navigation,navigationOptions})=>{
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
    //   alert(id);

      setSelected(newSelected);
      // Actions.videolist({pressed: id});
      navigation.navigate('VideoList',{pressed: id});
    },
    [selected],
  );

  return (
    // <View>
    //   <Text> asbd" </Text>
    // </View>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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
      <FlatList
        data={DATA2}
        renderItem={({ item }) => (
          <Item2
            id={item.id}
            title={item.title}
            selected={selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      <FlatList
        data={DATA3}
        renderItem={({ item }) => (
          <Item3
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
    flexDirection:"row",
    //display:"flex",
    //flexDirection:"row",
    
    
    alignItems:'center',
    justifyContent:'center',
    //height:700,
  },
  item: {
    //height:300,
    //display:"flex",
    //width:"100%",
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    width:150,
    backgroundColor: '#8c7ba8',
    padding: 20,
    //marginVertical: 8,
    marginHorizontal: 10,
    justifyContent:'center',
    
    
    //display:"flex",
  },
  item2: {
    //height:300,
    //display:"flex",
    //width:"100%",
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    width:150,
    backgroundColor: '#8c7ba8',
    padding: 20,
    //marginVertical: 8,
    marginHorizontal: 10,
    justifyContent:'center',
  },
  item3: {
    //height:300,
    //display:"flex",
    //width:"100%",
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    width:150,
    backgroundColor: '#8c7ba8',
    padding: 20,
    //marginVertical: 8,
    marginHorizontal: 10,
    justifyContent:'center',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});
export default memo(LandingScreen);