import { StatusBar } from 'expo-status-bar';
import React from 'react';
import tailwind from 'tailwind-rn';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={tailwind("flex flex-row")}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Test 1!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
