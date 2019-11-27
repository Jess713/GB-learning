import React, { Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Image
} from 'react-native';

import Landingphoto from "../components/Landingphoto";
import Background from "../components/Background";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";


const MAX_RESULT = 50;
const PLAY_LIST_ID = "PLAfn5OU0QoMDK5XQsbkXuITRqvPf6o0gQ";
const API_KEY = "AIzaSyCJtoZ4XuDc-m6Y6gIltSKj3RX9jigP2mM";

/**
 * This screen is our post-login, pulls video from youtube playlist real time and use it's title as a button.
 */
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

  /**
   * fetch playlist asynchronously and store it
   */
  fetchPlaylistData = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAY_LIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos: json['items'] });
  };
  /**
   * renders a view. it conditionally renders videos based on the number of playlist. 
   * if there's no video, set the text.
   */
  render() {
    const videos = this.state.videos;
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={{ backgroundColor: '#B8B8D4' }}>
          <Background>
            {/* <Text style={styles.titleText}>{"GRANVILLE BIOMEDICAL"}</Text>
            <Text style={styles.titleText}>{"EDUCATIONAL TUTORIALS"}</Text> */}
          
              <Image source={require('./images/logo.jpg')} style={styles.image} />
            
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
                        flex: 1,
                        flexDirection: 'row',
                        textAlign: 'center',
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
        </Button>

          </Background>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

/**
 * styling for the component in landing screen 
 */
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
    backgroundColor: '#403a60',
    fontWeight: "bold",
  },
  item: {
    padding: 11,
    fontSize: 12,
    height: 100,
  },

  image: {
    marginTop:10,
    width: 70,
    height: 70,
    resizeMode: 'contain'
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
