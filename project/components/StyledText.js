import React from 'react';
import { Text } from 'react-native';

/**
 * Style pre-set for a styled text 
 * imported in several files.
 */

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style]} />
  );
}
