import React from 'react';
import { List } from 'react-native-paper';
import { View, FlatList, Image } from 'react-native';

const AllScreen = ({ navigation, itemData }) => {
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