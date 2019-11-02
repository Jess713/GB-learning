// Route.js
  import React, { Component } from 'react';
  import {Platform} from 'react-native';
  // import components from react-native-router-flux
  import {Router, Stack, Scene} from 'react-native-router-flux';
  // import our screens as components 
  import VideoList from './screens/VideoList';
  import WatchVideo from './screens/Video';
  import LandingScreen from './screens/LandingScreen';
  import LoginScreen from './screens/LoginScreen';
  import RegisterScreen from './screens/RegisterScreen';

  export default class Routes extends Component<{}> {
    render() {
      return(
        <Router>
            <Stack key="root">
              <Scene key="login" component={LoginScreen} title="Login" />
              <Scene key="register" component={RegisterScreen} title="Register" />
              <Scene key="videolist" component={VideoList} title="Granville Biomedical" />
              <Scene key="watchvideo" component={WatchVideo} title="View Video"/>
              <Scene key="landing" component={LandingScreen} title="Directories"/>

            </Stack>
        </Router>
        )
    }
  }