import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { IconButton, Colors, Searchbar, List } from 'react-native-paper';

import { TabView, SceneMap } from 'react-native-tab-view';
import tailwind from 'tailwind-rn';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
 
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function Anyhow() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
 
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <View>
            <Text>G</Text>
    </View>;
    }}
  return (
        <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
      
    
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});