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
import RNPickerSelect from 'react-native-picker-select';
let videoName;
const MAX_RESULT = 50;
const PLAY_LIST_ID = "PLANMHOrJaFxMSduAFHDUSaG5d7NI1a5SW";
const API_KEY = "AIzaSyCJtoZ4XuDc-m6Y6gIltSKj3RX9jigP2mM";

export default class LandingScreen extends Component<{}> {
  // watchVideo(video_url) {
  //   // Actions.watchvideo({video_url: video_url});
  //   this.props.navigation.navigate('WatchVideo', { video_url: video_url });
  // }
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    }
  }
  getPickerVal = (val) => {
    videoName = val;
  };

  componentWillMount() {
    this.fetchPlaylistData();
  }

  fetchPlaylistData = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAY_LIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos: json['items'] });
  };

  render() {
    const videos = this.state.videos;
    const newVideos=videos.map(x => ({
      label: x.Text,
      value: x.Value
    }))
    console.log("---",newVideos);
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
          <RNPickerSelect
            placeholder={{ label: 'Please select your product', value: 'N/A', color: "#363c74", }}
            onValueChange={(value) => getPickerVal(value)}
            items={videos}
            //   [
            //   { label: 'EpiSim Suturing Task Trainer', value: 'EpiSim', color: "#363c74" },
            //   { label: 'Fetal Skull', value: 'FetalSkull', color: "#363c74" },
            //   { label: 'FistulaSim', value: 'FistSim', color: "#363c74" },
            //   { label: 'OasisSim Obstetrics Simulation Task Trainer', value: 'OOSTT', color: "#363c74" },
            //   { label: 'PeriSim Obstetrics Simulation Task Trainer', value: 'POSTT', color: "#363c74" },
            // ]}
          />
          <Button style={styles.button} mode="outlined" onPress={() => navigation.navigate("LoginScreen")}>
            Logout
        </Button>
        </View>
      </Background>
    );
  }
}

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
