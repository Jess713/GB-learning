import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
/**
 * Sets the landing page image on the screen
 */
const Landingphoto = () => (
  
  <Image source={require('../assets/pic1.jpg')} style={styles.image} />
  
);
/**
 * The physical dimensions and position of the picture to be displayed
 */
const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 250,
    resizeMode: 'contain',
    marginBottom:20,
   
  },
});

export default memo(Landingphoto);
