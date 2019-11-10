import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
const MAX_RESULT = 15;
// const PLAYLIST_ID = "PLb2quItt3GbhQV9yvsMdszoTwQ-_7JaLA";
const PLAYLIST_1 = "PLANMHOrJaFxMSduAFHDUSaG5d7NI1a5SW";
const PLAYLIST_2 = "PLANMHOrJaFxMobwlFyaSZdxoh-nl6-o1X";
const PLAYLIST_3 = "PLANMHOrJaFxMX3j37_6YIcdcAOll84cX9";
const PLAYLIST_4 = "PLANMHOrJaFxNPB0dHFRJKiDkrAuQqkBs3";

const API_KEY = "AIzaSyCJtoZ4XuDc-m6Y6gIltSKj3RX9jigP2mM";
export default class VideoList extends Component<{}> {



  VideoList() {
    this.props.navigation.navigate('VideoList');
  }





  componentWillMount() {
    this.fetchPlaylistData();
  }

  getVideoPlayList(id) {
    let val = JSON.parse(id);

    console.log(val);
    switch (val) {
      case "first":
        return "PLANMHOrJaFxMSduAFHDUSaG5d7NI1a5SW";
      case "second":
        return "PLANMHOrJaFxMobwlFyaSZdxoh-nl6-o1X";
      case "third":
        return "PLANMHOrJaFxMX3j37_6YIcdcAOll84cX9";
      case "fourth":
        return "PLANMHOrJaFxNPB0dHFRJKiDkrAuQqkBs3";
      default:
        break;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    }
  }
  watchVideo(video_url) {
    // Actions.watchvideo({video_url: video_url});
    this.props.navigation.navigate('WatchVideo', { video_url: video_url });
  }

  fetchPlaylistData = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.getVideoPlayList(JSON.stringify(this.props.navigation.getParam('pressed', 'NO_ID')))}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos: json['items'] });
  };

  render() {
    const videos = this.state.videos;
    return (
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
                    // fontFamily: 'arial'
                  }}
                >
                  {item.snippet.title}
                </Text>
              </TouchableOpacity>
          }
        />
      </SafeAreaView>
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
    borderBottomWidth: 1.5,
    borderRadius: 10
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 44,
  },
});

VideoList.navigationOptions = {
  title: 'Granville Biomedical INC.',
};