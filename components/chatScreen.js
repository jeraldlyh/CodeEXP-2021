import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { List } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import {hasExistingConvo} from '../database/actions/message'
import { tailwind } from "tailwind-rn"
const ChatScreen = ({navigation}) => {
    const [itemData, setItemData] = React.useState([{name:"Abc", location:"loc"}]);
    // useEffect(() => {
    //     hasExistingConvo().then(response => setItemData(response));
    //     console.log(itemData);
    // }, []);

    return (
        <View>
            <FlatList
                data={itemData}
                renderItem={({item}) => {
                    return (
                        <List.Item 
                            title={item.name}
                            description={item.location}
                            left={() => <Image source={{ uri: 'https://picsum.photos/700' }} style={{ width:60, height:60, borderRadius: 100 }}/>}
                            right={() => <List.Icon icon="chevron-right" />}
                            onPress={() => navigation.navigate("Room", {...item})}
                        />
                    )
                }}
            />
        </View>
    
    );
}
 
export default ChatScreen;
