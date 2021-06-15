import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { List, Card, Title, Paragraph, DataTable, Button } from "react-native-paper";
import firebase from "../database/firebaseDB";

const ITEMDATA = [
  {
    url: 'https://picsum.photos/700',
    name: 'Item',
    price: '100'
  },
  {
    url: 'https://picsum.photos/700',
    name: 'Item',
    price: '100'
  },
  {
    url: 'https://picsum.photos/700',
    name: 'Item',
    price: '100'
  },
  {
    url: 'https://picsum.photos/700',
    name: 'Item',
    price: '100'
  },
  {
    url: 'https://picsum.photos/700',
    name: 'Item',
    price: '100'
  },
  {
    url: 'https://picsum.photos/700',
    name: 'Item',
    price: '100'
  },
];

const LISTINGDATA = [
  {
    user: 'username',
    order: 'ordering items + quantity',
    price: '100'
  },
  {
    user: 'username',
    order: 'ordering items + quantity',
    price: '100'
  },
  {
    user: 'username',
    order: 'ordering items + quantity',
    price: '100'
  },
];

export default function StoreInfo({route}) {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://picsum.photos/700' }} style={{
                width: '100%',
                height: 200
            }}/>
            <Title>Store Name <Button icon="star" mode="text" onPress={() => console.log('Bookmark')}></Button></Title>
            <Text>Address</Text>
            <Text>Opening Hours??</Text>
            <List.Section>
                <List.Accordion
                    title="Description"
                    onPress={handlePress}
                >
                    <Text>Info about the store</Text>
                </List.Accordion>
                <List.Accordion
                    title="Menu"
                >
                    <FlatList
                    data={ITEMDATA}
                    numColumns={2}
                    keyExtractor={(item, index) => item.id }
                    renderItem={({item}) => {
                        return (
                        <Card style={styles.item}>
                            <Card.Cover source={{ uri: item.url }} />
                            <Card.Content>
                                <Title>{item.name}</Title>
                                <Paragraph>${item.price}</Paragraph>
                            </Card.Content>
                        </Card>
                        )
                    }}
                    />

                </List.Accordion>

                <List.Accordion
                    title="Orders"
                >
                    <FlatList
                        data={LISTINGDATA}
                        keyExtractor={(item, index) => item.id }
                        renderItem={({item}) => {
                            return (
                            <List.Item 
                                title={item.order}
                                description={item.price}
                                onPress
                            />
                            )
                        }}
                    />
                    <Button mode="text" onPress={() => navigation.navigate("AddOrder")}>
                        Add Order
                    </Button>
                </List.Accordion>
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
  item: {
    width: '45%',
    margin:'2%',
  }
});
