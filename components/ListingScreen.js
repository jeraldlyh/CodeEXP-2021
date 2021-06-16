import React from "react";
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { List, Card, Title, Paragraph, Button, IconButton, Modal, Portal, Provider, TextInput, DefaultTheme } from "react-native-paper";
import tailwind from 'tailwind-rn';


function ListingScreen({ listings }) {
    const formatListingTitle = (title, quantity) => {
        return `${title} (${quantity})`;
    }
    
    return (
            <FlatList
                data={listings}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <Card style={{width:"46%", margin: "2%"}}>
                            <Card.Cover source={{ uri: item.url }} />
                            <Card.Content>
                                <Title>{formatListingTitle(item.order, item.quantity)}</Title>
                                <Paragraph>${item.price}</Paragraph>
                            </Card.Content>
                        </Card>
                    )
                }}
            />
    )
}

export default ListingScreen;