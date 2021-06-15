import React from 'react';
import { ScrollView } from 'react-native';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { List, Card, Title, Paragraph, Button, IconButton } from "react-native-paper";
import tailwind from 'tailwind-rn';

export default function StoreInfo({ route, navigation }) {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={{ uri: route.params.img }} style={{
                    width: '100%',
                    height: 200
                }} />
                <View style={tailwind("flex-row items-center")}>
                    <Title style={tailwind("pl-5")}>{route.params.name}</Title>
                    <IconButton
                        icon="star"
                        color="red"
                        size={25}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
                
                <Text style={tailwind("p-5")}>{route.params.location}</Text>
                <Text style={tailwind("px-5")}>Opening Hours??</Text>
                <List.Section>
                    <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")} raised theme={{ colors: { primary: 'red' } }}
                        title="Description"
                        onPress={handlePress}
                    >
                        <Text style={tailwind("p-5")}>{route.params.description}</Text>
                    </List.Accordion>
                    <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")}
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

                    <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")}
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
                        <View style={tailwind("flex flex-row justify-around mt-5 ")}>
                            <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 w-2/5")} mode="contained" onPress={() => navigation.navigate("AddOrder")}>
                                <Text >Add Order</Text>
                            </Button>

                        </View>
                        
                    </List.Accordion>
                </List.Section>
            </ScrollView>

        </SafeAreaView>
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
