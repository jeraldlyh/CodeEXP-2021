import React from 'react';

import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { List, Card, Title, Paragraph, Button } from "react-native-paper";
const ChatInfo = ({route, navigation}) => {
    return ( <View><Title>{route.params.name}<Button icon="star" raised theme={{ colors: {primary: 'red'} }} mode="text" onPress={() => console.log('Bookmark')}></Button></Title>
    <Text>{route.params.location}</Text></View> );
}
 
export default ChatInfo;