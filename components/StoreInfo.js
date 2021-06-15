import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { List, Card, Title, Paragraph, Button, IconButton } from "react-native-paper";
import tailwind from 'tailwind-rn';

export default function StoreInfo({ route, navigation }) {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={styles.container}>
            <Image source={{ uri: route.params.img }} style={{
                width: '100%',
                height: 200
            }} />
            <Title>{route.params.name}<Button icon="star" raised theme={{ colors: { primary: 'red' } }} mode="text" onPress={() => console.log('Bookmark')}></Button></Title>
            <Text>{route.params.location}</Text>
            <Text>Opening Hours??</Text>
            <List.Section>
                <List.Accordion raised theme={{ colors: { primary: 'red' } }}
                    title="Description"
                    onPress={handlePress}
                >
                    <Text>{route.params.description}</Text>
                </List.Accordion>
                <List.Accordion
                    raised theme={{ colors: { primary: 'red' } }}
                    title="Menu"
                >
                    <FlatList
                        data={route.params.products}
                        numColumns={2}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
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
                    raised theme={{ colors: { primary: 'red' } }}
                    title="Orders"
                >
                    <FlatList
                        data={route.params.listings}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <List.Item
                                    title={item.order}
                                    description={item.price}
                                    onPress right={() => <IconButton
                                        icon="chat"
                                        color={"red"}
                                        size={20}
                                        onPress={() => navigation.navigate("Room", { ...item })}
                                      />}
                                />
                            )
                        }}
                    />
                    <Button mode="text" raised theme={{ colors: { primary: 'red' } }} onPress={() => navigation.navigate("AddOrder")}>
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
        margin: '2%',
    }
});
