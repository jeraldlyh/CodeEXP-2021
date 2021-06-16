import React, { useEffect } from 'react';
import firebase from "../database/firebaseDB";
import { IconButton, Colors, List } from 'react-native-paper';
import { Text, View, FlatList, Image, ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';
const AllScreen = ({itemData}) => {
    
    return ( 
        <View>
        <FlatList
            data={itemData}
            keyExtractor={item => item.name}
            renderItem={({ item }) => {
                return (
                    <List.Item
                        title={item.name}
                        description={item.location}
                        left={() => <Image source={{ uri: item.img }}
                            style={{ width: 60, height: 60 }} />}
                        onPress={() => navigation.navigate("StoreInfo", { ...item })}
                    />
                )
            }}
        />
    </View> );
}
 
export default AllScreen;