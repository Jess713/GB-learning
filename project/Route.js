import React, { Component } from 'react';
import { Platform } from 'react-native';

import WatchVideo from './screens/Video';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const AuthStack = createStackNavigator(
  {
    LoginScreen:{screen: LoginScreen},
    RegisterScreen: {screen: RegisterScreen},
    ForgotPasswordScreen: {screen: ForgotPasswordScreen},
  }
);
const MainNavigator = createStackNavigator(
  {
    LandingScreen: {screen: LandingScreen},
    WatchVideo: {screen: WatchVideo},
  }
);

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: MainNavigator,
    }));

export default Routes;