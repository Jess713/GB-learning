import React, { memo, useState, Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Constants from 'expo-constants';
import { app } from 'firebase';

const DATA = [
  {
    id: 'first',
    title: 'First Item',
  },
  {
    id: 'second',
    title: 'Second Item',
  },
  {
    id: 'third',
    title: 'Third Item',
  },
  {
    id: 'fourth',
    title: 'Fourth Item',
  },
];

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={styles.item}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

// export default function LandingScreen() {
const LandingScreen = ({ navigation }) => {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      //   alert(id);

      setSelected(newSelected);
      // Actions.videolist({pressed: id});
      navigation.navigate('VideoList', { pressed: id });
    },
    [selected],
  );

  return (
    <SafeAreaView style={styles.container}>
    <View
      style={{
        flexDirection: 'row',
        height: 100,
        padding: 20,
      }}>
      <View style={{backgroundColor: 'blue', flex: 0.3}} />
      <View style={{backgroundColor: 'red', flex: 0.5}} />
      <Text>Hello World!</Text>
    </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#8c7ba8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
});

export default memo(LandingScreen);