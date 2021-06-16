import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ScrollView, LogBox } from 'react-native';
import { List, Card, Title, Paragraph, Button, IconButton, Modal, Portal, Provider, TextInput, DefaultTheme } from "react-native-paper";
import { BlurView } from 'expo-blur';
import tailwind from 'tailwind-rn';
import { AuthContext } from '../provider/AuthContext';
import { addBookmark } from '../database/actions/Bookmark';
import NumericInput from 'react-native-numeric-input';
import { addListing } from '../database/actions/Listing';
import SelectPicker from 'react-native-form-select-picker';
import { createConvo } from '../database/actions/Message';
import _ from "lodash";
import moment from "moment";

export default function StoreInfo({ route, navigation }) {
    // Accordion
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    // Modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "white", padding: 20 };
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState("");
    const [listings, setListings] = useState([])

    const { username, isLoggedIn } = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false);              // Force refresh flat list

    const onBookmark = () => {
        if (!isLoggedIn) {
            navigation.navigate("Profile");
        } else {
            addBookmark(username, route.params.name);
        }
    }

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: 'red'
        },
    };

    const submitOrder = () => {
        addListing(username, route.params.name, product, quantity, price)
            .then(response => {         // Reset form fields
                setQuantity(0);
                setPrice("");
                hideModal();

                if (listings) {
                    setListings(prevListing => {
                        return [
                            ...prevListing,
                            response
                        ]
                    });
                } else {
                    setListings([response]);
                }
                setRefresh(!refresh);
            })
            .catch(error => console.log(error))
    };

    const openChat = (product) => {
        createConvo(username, product.username)
            .then(response => {
                navigation.navigate("Room", { 
                    thread: response, 
                    username: username,
                    anotherUser: product.username,
                    product: product 
                })
            })
    }

    const formatListingTitle = (title, quantity) => {
        return `${title} (${quantity})`;
    }

    const formatListingDescription = (price, user, listAt) => {
        const time = _.isInteger(listAt) ? listAt : parseInt(listAt);     // Fix format pre-inserted data
        const formatTime = moment(time).format("MMMM Do YYYY, h:mm:ss a");
        return `Placed by: ${user}\nPrice: $${price} \nListed at: ${formatTime}`;
    }

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        setListings(route.params.listings);
    }, [])

    return (
        <Provider theme={theme}>
            <SafeAreaView style={styles.container}>
                <ScrollView>

                    <Image source={{ uri: route.params.img }} style={{
                        width: '100%',
                        height: 200
                    }} />
                    <View style={tailwind("flex-row items-center")}>
                        <Title style={tailwind("pl-5")}>{route.params.name}</Title>
                        <IconButton
                            icon={isLoggedIn ? "star" : "star-outline"}
                            color="red"
                            size={25}
                            onPress={() => onBookmark()}
                        />
                    </View>

                    <Text style={tailwind("p-5")}>{route.params.location}</Text>
                    <Text style={tailwind("px-5")}>Opening Hours??</Text>
                    <View>

                        <List.Section>
                            {/* DESCRIPTION */}
                            <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")} raised theme={{ colors: { primary: 'red' } }}
                                title="Description"
                                onPress={handlePress}
                            >
                                <Text style={tailwind("p-5")}>{route.params.description}</Text>
                            </List.Accordion>

                            {/* PRODUCTS */}
                            <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")}
                                raised theme={{ colors: { primary: 'red' } }}
                                title="Menu"
                            >
                                <FlatList
                                    data={route.params.products}
                                    numColumns={2}
                                    keyExtractor={item => item._id}
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

                            {/* LISTINGS */}
                            <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")}
                                raised theme={{ colors: { primary: 'red' } }}
                                title="Orders"
                            >
                                <View style={tailwind("flex")}>
                                    {/* {
                                        isLoggedIn
                                            ? <Fragment />
                                            : <BlurView intensity={300} style={{  height: 300, position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100 }}>
                                                <View style={tailwind("flex flex-col justify-center items-center")}>
                                                    <Text style={tailwind("text-center")}>Hello! I am bluring contents underneath</Text>
                                                    <Button>test</Button>
                                                </View>
                                            </BlurView>
                                    } */}
                                    <FlatList
                                        data={listings}
                                        extraData={refresh}
                                        keyExtractor={item => item._id}
                                        renderItem={({ item }) => {
                                            return (
                                                <List.Item
                                                    title={formatListingTitle(item.order, item.quantity)}
                                                    description={
                                                        formatListingDescription(item.price, item.username, item.listAt)
                                                    }
                                                    descriptionNumberOfLines={3}
                                                    right={() => 
                                                        <IconButton
                                                            icon="chat"
                                                            color={"red"}
                                                            size={20}
                                                            onPress={() => openChat(item)}
                                                        />
                                                    }
                                                />
                                            )
                                        }}
                                    />
                                    

                                    <Portal>
                                        <Modal
                                            visible={visible}
                                            onDismiss={hideModal}
                                            contentContainerStyle={containerStyle}
                                        >
                                            <Title style={{ textAlign: "center", color: "black" }}>Add Order</Title>
                                            
                                            <SelectPicker
                                                style={{ borderBottomWidth: 1}}
                                                selectedValue={product}
                                                onValueChange={(itemValue, itemIndex) => setProduct(itemValue)}
                                                placeholder="Click to select item"
                                            >
                                                {
                                                    route.params.products.map((item, index) => {
                                                        return (
                                                            <SelectPicker.Item key={item.name} label={item.name} value={item.name} />
                                                        )
                                                    })
                                                }
                                            </SelectPicker>

                                            <View style={tailwind("flex-row justify-between items-center")}>
                                                <NumericInput
                                                    initValue={quantity}
                                                    value={quantity}
                                                    onChange={quantity => setQuantity(quantity)}
                                                    rounded
                                                    totalHeight={40}
                                                    textColor='#103900'
                                                    iconStyle={{ color: 'white' }}
                                                    rightButtonBackgroundColor='#EA3788'
                                                    leftButtonBackgroundColor='#E56B70'
                                                />
                                                <TextInput
                                                    raised
                                                    theme={{ colors: { primary: "red", text: "black", label: "black", accent: "black" } }}
                                                    style={tailwind("bg-white w-3/5")}
                                                    placeholderTextColor="black"
                                                    keyboardType="numeric"
                                                    label="Price"
                                                    placeholder="State the price you are willing to pay"
                                                    value={price}
                                                    onChangeText={(price) => setPrice(price)}
                                                />
                                            </View>
                                            <Button
                                                style={{ height: 40, margin: "2%", padding:"1%", marginTop: "2%" }}
                                                mode="contained"
                                                raised
                                                theme={{ colors: { primary: "red" } }}
                                                onPress={() => submitOrder()}
                                            >
                                                Submit Order
                                            </Button>
                                        </Modal>
                                    </Portal>
                                    <Button
                                        mode="text"
                                        raised
                                        theme={{ colors: { primary: "red" } }}
                                        onPress={showModal}
                                    >
                                        Add Order
                                    </Button>
                                </View>
                            </List.Accordion>
                        </List.Section>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Provider>
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
