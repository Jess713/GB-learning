import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState, Component} from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Routes from './Route';
// import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Routes/>
    );
  }
}

