import React, { Component } from 'react';
import { Platform } from 'react-native';

import VideoList from './screens/VideoList';
import WatchVideo from './screens/Video';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator(
  {
    LoginScreen:{screen: LoginScreen},
    // RegisterScreen: {screen: RegisterScreen},
    LandingScreen: {screen: LandingScreen},
    VideoList: {screen: VideoList},
    WatchVideo: {screen: WatchVideo},
  }
);
const Routes = createAppContainer(MainNavigator);

export default Routes;