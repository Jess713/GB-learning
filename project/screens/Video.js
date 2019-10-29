 // screens/Video.js
    import React, { Component } from 'react';
    import { StyleSheet, SafeAreaView, View} from 'react-native';
    import { WebView } from 'react-native-webview';
    import { Actions, Scene, Router } from 'react-native-router-flux';

    export default class WatchVideo extends Component<{}> {

      home(){
        Actions.home();
      }
      videos(){
        Actions.videos();
      }
      constructor(props) {
        super(props);
        console.log(this.props);
      }
      render() {
        return (
          <SafeAreaView style={styles.safeArea}>
              { 
                <WebView
                  source={{ uri: "https://www.youtube.com/embed/"+this.props.video_url}}
                  startInLoadingState={true} 
                />
              }
          </SafeAreaView>
        );
      }
    }
    class MyWebComponent extends Component {
  render() {
    return (
      <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
    );
  }
}
    const styles = StyleSheet.create({
      safeArea: {
        flex: 1,
        backgroundColor: '#fff'
      }
    });