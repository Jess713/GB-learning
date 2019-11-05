import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WatchVideo extends Component<{}> {
  constructor(props) {
    super(props);
    this.videourl = JSON.stringify(props.navigation.getParam('video_url', 'NO-ID'));
  }
  home() {
    this.props.navigation.navigate('VideoList');
  }
  videos() {
    this.props.navigation.navigate('WatchVideo');
  }

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  }
});