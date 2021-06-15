import React from 'react';
import {  View, StyleSheet } from 'react-native';
import { Title,  Button, TextInput } from "react-native-paper";

export default function App() {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
        <Title>Add Order</Title>
        <TextInput 
          raised theme={{ colors: {primary: 'red'} }}
          style={styles.textinput}
          label="Item(s)"
          placeholder="State your orders and quantity"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TextInput 
          raised theme={{ colors: {primary: 'red'} }}
          style={styles.textinput}
          label="Price"
          placeholder="State the price you are willing to pay"
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button mode="contained" raised theme={{ colors: {primary: 'red'} }} onPress={() => console.log('Order Submission')}>
            Submit Order
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
  textinput: {
    width: '90%',
    margin:'2%',
  }
});
