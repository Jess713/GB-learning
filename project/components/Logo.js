import React, { memo } from 'react';
import { Image, StyleSheet,View } from 'react-native';
/**
 * Sets the logo image for the login and register screens 
 */
const Logo = () => (
  <View>
    <Image source={require('../assets/thumbnail_GB_Logo_EN.png')} style={styles.image} />
  </View>
);
/**
 * The physical dimensions and position of the logo to be displayed
 */
const styles = StyleSheet.create({
  image: {
    // flex: 1,
    width: 230,
    height: 240,
    resizeMode: 'contain'
  },
});


export default memo(Logo);
