import React, { memo, useState, Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Constants from 'expo-constants';
import { app } from 'firebase';
import Logo from "../components/Logo";
import Landingphoto from "../components/Landingphoto";
import { theme } from "../core/theme";
import Background from "../components/Background";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";

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
  // {
  //   id: 'fourth',
  //   title: 'Fourth Item',
  // },
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

// export default function LandingScreen() {
const LandingScreen = ({ navigation, navigationOptions }) => {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      //   alert(id);

      setSelected(newSelected);
      // Actions.videolist({pressed: id});
      navigation.navigate('VideoList', { pressed: id });
    },
    [selected],
  );

  return (
    <Background>
      <View style={styles.viewstyle}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>{'\n'}</Text>
          <Text style={styles.titleText}>{'\n'}</Text>
          <Text style={styles.titleText}>{"Welcome to Granville Learn"}{'\n'}</Text>
          <Text style={styles.titleText}>{'\n'}</Text>
          <View>
            <Landingphoto/>
          </View>
          <Text style={styles.titleText}>{'\n'}</Text>
          {/* <Text style={styles.bodyText}>{"The Learning Module is the place where you can watch tutorials and lectures on any of our Granville Biomedical product line."}{'\n'}</Text> */}
          <Text style={styles.titleText}>{'\n'}</Text>
          <Text style={styles.bodyText}>{"1. Please select the matching product playlist to view tutorials"}</Text>
          <Text style={styles.titleText}>{'\n'}</Text>
          <Text style={styles.bodyText}>{"2. Each playlist contains multiple videos that will guide your learning"}</Text>
          <Text style={styles.titleText}>{'\n'}</Text>
        </Text>

        <FlatList style={styles.list}
          data={DATA}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              selected={selected.get(item.id)}
              onSelect={onSelect}
              style={styles.item}
            />
          )}

          keyExtractor={item => item.id}
          extraData={selected}
        />

        <Button style={styles.button} mode="outlined" onPress={() => navigation.navigate("LoginScreen")}>
          Logout
        </Button>

      </View>
    </Background>
  );
}
LandingScreen.navigationOptions = {
  title: 'Home',
  headerLeft: null,

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    //display:"flex",
    flexDirection: "row",
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
    height: 700,
  },
  item: {
    height: 300,
    display: "flex",
    flex: 1,
    backgroundColor: '#8c7ba8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    //display:"flex",
  },

  list: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    //display:"flex",
    flexDirection: "row",
    maxWidth: 400,
    height: 700,
    padding: 20,
  },

  baseText: {
    fontFamily: 'Arial',
  },

  titleText: {
    fontSize: 25,
    fontFamily: 'Arial',
    color: "#403a60",
    fontWeight: "bold",
    paddingVertical: 14,
    textAlignVertical: "center",
  },

  bodyText: {
    fontSize: 20,
    fontFamily: 'Arial',
    color: theme.colors.secondary,
    textAlignVertical: "center",
    alignItems: "center",
  },

  viewstyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30",
  },

  button: {
    
  },

});

export default memo(LandingScreen);