import React from "react";
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { List, Card, Title, Paragraph, Button, IconButton, Modal, Portal, Provider, TextInput, DefaultTheme } from "react-native-paper";
import tailwind from 'tailwind-rn';


function ReviewScreen({ reviews }) {
    return (
        <View>
            <FlatList
                data={reviews}
                numColumns={2}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <Card style={tailwind("w-auto m-2")}>
                            <Card.Cover source={{ uri: item.url }} />
                            <Card.Content>
                                <Title>{item.order}</Title>
                                <Paragraph>${item.price}</Paragraph>
                            </Card.Content>
                        </Card>
                    )
                }}
            />
        </View>
    )
}

export default ReviewScreen;