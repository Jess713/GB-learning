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
  }
  /**
   * Displays video list page
   */
  home() {
    this.props.navigation.navigate('VideoList');
  }
  /**
   * Displays the video player page
   */
  videos() {
    this.props.navigation.navigate('WatchVideo');
  }
  /**
   * Plays the video starting from the beginning
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