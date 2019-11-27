import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * WatchVideo class constructs the video to be played via the correct URL by the user
 * selecting on which video they want to view
 */
export default class WatchVideo extends Component<{}> {
  constructor(props) {
    super(props);
    this.videourl = JSON.stringify(props.navigation.getParam('video_url', 'NO-ID'));
    console.log(this.videourl);
  }
    /*
     * Starts and plays the video from  the beginning
     */
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        {
          <WebView
            source={{ uri: "https://www.youtube.com/embed/" + JSON.parse(this.videourl) }}
            startInLoadingState={true}
          />
        }
      </SafeAreaView>
    );
  }
}
/**
 * Styling for the video player page
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  }
});