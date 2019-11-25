import React, { Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  Platform
} from 'react-native';

import { app } from 'firebase';
import Logo from "../components/Logo";
import Landingphoto from "../components/Landingphoto";
import { theme } from "../core/theme";
import Background from "../components/Background";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
<<<<<<< HEAD
/**
 * This class ( LandingScreen.js ) is for the page which after the users sign-in,
 * Displays the video from Youtube and shows play lists of each categories
 */
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
/**
 * Item Function creates HTML designs and call it inside main rendering function.
 * 
 */
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

// The main function which returns the HTML designs, and also addes other functions.

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

  /**
   * HTML syntax part
   */
  return (
    <Background>
      <View style={styles.viewstyle}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>{'\n'}</Text>
          <Text style={styles.titleText}>{'\n'}</Text>
          <Text style={styles.titleText}>{"Welcome to Granville Learn"}{'\n'}</Text>
          <Text style={styles.titleText}>{'\n'}</Text>
          <View>
            <Landingphoto />
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
=======

const MAX_RESULT = 50;
//Heathers:PLAfn5OU0QoMDK5XQsbkXuITRqvPf6o0gQ
const PLAY_LIST_ID = "PLAfn5OU0QoMDK5XQsbkXuITRqvPf6o0gQ";
const API_KEY = "AIzaSyCJtoZ4XuDc-m6Y6gIltSKj3RX9jigP2mM";


export default class LandingScreen extends Component<{}> {
  componentWillMount() {
    this.fetchPlaylistData();
  }

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    }
    
  }

  watchVideo(val) {

    this.props.navigation.navigate('WatchVideo', { video_url: val });
  }

  fetchPlaylistData = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAY_LIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos: json['items'] });
  };

  render() {
    const videos = this.state.videos;
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={{backgroundColor:'#B8B8D4'}}>
          <Background>
            <Text style={styles.titleText}>{"GRANVILLE BIOMEDICAL"}</Text>
            <Text style={styles.titleText}>{"EDUCATIONAL TUTORIALS"}</Text>
            <Landingphoto />
            {!!videos ? <FlatList
              data={this.state.videos}
              keyExtractor={(_, index) => index.toString()}
              renderItem={
                ({ item }) =>
                  <TouchableOpacity
                    style={styles.demacate}
                    onPress={() => this.watchVideo(item.contentDetails.videoId)}
                  >
                    <Text
                      style={{
                        padding: 15,
                        fontSize: 16,
                        fontWeight: 'bold',
                        // height: 44,
                        ...Platform.select({
                          ios: { fontFamily: 'Arial', },
                          android: { fontFamily: 'Roboto' }
                        }),

                        justifyContent: 'center',
                        color: '#ffffff',
                      }}
                    >
                      {item.snippet.title}
                    </Text>
                  </TouchableOpacity>
              }
            /> : null}
            {!videos ? <Text style={styles.titleText}>{"Playlist is currently empty."}</Text> : null}


            <Button style={styles.button} onPress={() => {
              this.props.navigation.navigate('LoginScreen');
              logoutUser();
            }}>
              Logout
>>>>>>> 792cdc47efb3bccd545be63220f2e60346b41cd0
        </Button>

          </Background>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
<<<<<<< HEAD
/**
 *  These function sets the title navigates for different pages.
 */
LandingScreen.navigationOptions = {
  title: 'Home',
  headerLeft: null,

};

/**
 * Style sets...
 */
=======

>>>>>>> 792cdc47efb3bccd545be63220f2e60346b41cd0
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
  },
  demacate: {
    height: 100,
    height: 80,
    width: 250,
    borderRadius: 13,
    padding: 10,
    marginTop: 23,
    backgroundColor: '#9891b5',
    fontWeight: "bold",
  },
  item: {
    padding: 11,
    fontSize: 12,
    height: 100,
  },



  titleText: {
    fontSize: 25,
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' }
    }),
    textAlign: 'center',
    color: "#403a60",
    fontWeight: "bold",
  },


  viewstyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: 30,
  },

  button: {
<<<<<<< HEAD

=======
    backgroundColor: "#403a60",
    marginTop: 40,
    marginBottom: 40,
>>>>>>> 792cdc47efb3bccd545be63220f2e60346b41cd0
  },

});
