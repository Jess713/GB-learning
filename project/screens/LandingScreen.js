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

const MAX_RESULT = 50;
const PLAY_LIST_ID = "PLANMHOrJaFxMX3j37_6YIcdcAOll84cX9";
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
    console.log("hi2222");
  }

  watchVideo(val) {

    this.props.navigation.navigate('WatchVideo', { video_url: val });
  }

  fetchPlaylistData = async () => {
    console.log("fetchPlaylistData i made it");
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAY_LIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos: json['items'] });
  };

  render() {
    console.log("render");
    const videos = this.state.videos;
    console.log(videos);
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <Background>
            <Text style={styles.titleText}>{"GRANVILLE BIOMEDICAL"}</Text>
            <Text style={styles.titleText}>{"EDUCATIONAL TUTORIALS"}</Text>
            <Landingphoto />
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
            />


            <Button style={styles.button} onPress={() => {
              this.props.navigation.navigate('LoginScreen');
              logoutUser();
            }}>
              Logout
        </Button>

          </Background>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

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
    marginTop:23,
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
    backgroundColor: "#403a60",
    marginTop: 40,
    marginBottom: 40,
  },

});
