import React from "react";
import { FlatList } from 'react-native';
import { Card, Title, Paragraph } from "react-native-paper";


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