import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Landingphoto = () => (
    <view>
  <Image source={require('../assets/pic1.jpg')} style={styles.image} />
  </view>
);

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 250,
    resizeMode: 'contain'
  },
});

export default memo(Landingphoto);
