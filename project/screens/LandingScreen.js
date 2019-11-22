import React, { memo, useState, Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import Constants from 'expo-constants';
import { app } from 'firebase';
import Logo from "../components/Logo";
import Landingphoto from "../components/Landingphoto";
import { theme } from "../core/theme";
import Background from "../components/Background";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
let videoName;
const MAX_RESULT = 50;
const PLAY_LIST_ID = "PLANMHOrJaFxMSduAFHDUSaG5d7NI1a5SW";
const API_KEY = "AIzaSyCJtoZ4XuDc-m6Y6gIltSKj3RX9jigP2mM";

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
  getPickerVal = (val) => {
    videoName = val;
  };


  fetchPlaylistData = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAY_LIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos: json['items'] });
  };

  render() {
    const videos = this.state.videos;
    return (
      <Background>

        <View style={styles.viewstyle}>
          <Text style={styles.baseText}>
            <Text style={styles.titleText}>{'\n'}</Text>
            <Text style={styles.titleText}>{'\n'}</Text>
            <Text style={styles.titleText}>{"Welcome to Granville Learn"}{'\n'}</Text>
            <Text style={styles.titleText}>{'\n'}</Text>

            <Landingphoto />

            <Text style={styles.titleText}>{'\n'}</Text>
            {/* <Text style={styles.bodyText}>{"The Learning Module is the place where you can watch tutorials and lectures on any of our Granville Biomedical product line."}{'\n'}</Text> */}
            <Text style={styles.titleText}>{'\n'}</Text>
            <Text style={styles.bodyText}>{"1. Please select the matching product playlist to view tutorials"}</Text>
            <Text style={styles.titleText}>{'\n'}</Text>
            <Text style={styles.bodyText}>{"2. Each playlist contains multiple videos that will guide your learning"}</Text>
            <Text style={styles.titleText}>{'\n'}</Text>
          </Text>
          <SafeAreaView style={styles.safeArea}>
            <FlatList
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
                        padding: 10,
                        fontSize: 12,
                        height: 44,
                      }}
                    >
                      {item.snippet.title}
                    </Text>
                  </TouchableOpacity>
              }
            />
          </SafeAreaView>



          <Button style={styles.button} mode="outlined" onPress={() => navigation.navigate("LoginScreen")}>
            Logout
        </Button>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  demacate: {
    borderBottomColor: '#8c7ba8',
    borderBottomWidth: 4,
    borderRadius: 15
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 100,
  },
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
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' }
    })
  },

  titleText: {
    fontSize: 25,

    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' }
    }),
    color: "#403a60",
    paddingVertical: 14,
    textAlignVertical: "center",
  },

  bodyText: {
    fontSize: 20,
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' }
    }),
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
