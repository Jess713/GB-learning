import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { WebView } from 'react-native-webview';

/**
<<<<<<< HEAD
 * WatchVideo class constructs the video to be played via the correct URL by the user
 * selecting on which video they want to view
=======
 * Gets the video URL from YouTube 
>>>>>>> 792cdc47efb3bccd545be63220f2e60346b41cd0
 */
export default class WatchVideo extends Component<{}> {
  constructor(props) {
    super(props);
    this.videourl = JSON.stringify(props.navigation.getParam('video_url', 'NO-ID'));
    console.log(this.videourl);
  }
  /**
<<<<<<< HEAD
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
=======
   * Starts and plays the video from  the beginning
>>>>>>> 792cdc47efb3bccd545be63220f2e60346b41cd0
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