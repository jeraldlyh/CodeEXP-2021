import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ScrollView, LogBox, Dimensions } from 'react-native';
import { List, Card, Title, Paragraph, Button, IconButton, Modal, Portal, Provider, TextInput, DefaultTheme } from "react-native-paper";
import { BlurView } from 'expo-blur';
import tailwind from 'tailwind-rn';
import { AuthContext } from '../provider/AuthContext';
import { addBookmark, removeBookmark } from '../database/actions/Bookmark';
import NumericInput from 'react-native-numeric-input';
import { addListing } from '../database/actions/Listing';
import SelectPicker from 'react-native-form-select-picker';
import { createConvo } from '../database/actions/Message';
import _ from "lodash";
import moment from "moment";
import AwesomeAlert from 'react-native-awesome-alerts';


export default function StoreInfo({ route, navigation }) {
    // Accordion
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    // Modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "#ffffff", padding: 20 };
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState("");
    const [listings, setListings] = useState([])

    const { username, isLoggedIn, avatar, bookmarks, setBookmarks } = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false);              // Force refresh flat list

    //msg
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    const bookmarkIcon = (shopName) => {
        if (!isLoggedIn) {
            return "star-outline";
        } else if (bookmarks && bookmarks.includes(shopName)) {
            return "star";
        }
        return "star-outline";
    }

    const onBookmark = (icon) => {
        if (!isLoggedIn) {
            navigation.navigate("Profile");
        } else {
            if (icon === "star") {
                removeBookmark(username, route.params.name);

                const updatedBookmarks = bookmarks.filter(function(bookmark) {
                    return bookmark !== route.params.name;
                });
                setBookmarks(updatedBookmarks);
            } else {
                addBookmark(username, route.params.name);
                setBookmarks(prevBookmarks => {
                    return [...prevBookmarks, route.params.name];
                })
            }
        }
    }

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: "#fa3c4c"
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
                        return [...prevListing, response]
                    });
                } else {
                    setListings([response]);
                }
                setRefresh(!refresh);
                setMessage("Success");
                setShowAlert(true);
            })
            .catch(error => console.log(error))
    };

    const openChat = (product) => {
        createConvo(username, product.username)
            .then(response => {
                navigation.navigate("Room", { 
                    thread: response, 
                    username: username,
                    avatar: avatar,
                    anotherUser: product.username,
                    product: product,
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
        // LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        setListings(route.params.listings);
    }, [])

    return (
        
        <Provider theme={theme}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <AwesomeAlert
                contentContainerStyle={{width: Dimensions.get('window').width}}
          show={showAlert}
          showProgress={false}
          title="Add Order"
          message={message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#fa3c4c"
          confirmButtonTextStyle={{paddingLeft:"10%", paddingRight:"10%"}}
          onCancelPressed={() => {
            setShowAlert(false)
          }}
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
        />
                    <Image source={{ uri: route.params.img }} style={{
                        width: '100%',
                        height: 200
                    }} />
                    <View style={tailwind("flex-row items-center")}>
                        <Title style={tailwind("pl-5")}>{route.params.name}</Title>
                        <IconButton
                            icon={bookmarkIcon(route.params.name)}
                            color="#fa3c4c"
                            size={25}
                            onPress={() => onBookmark(bookmarkIcon(route.params.name))}
                        />
                    </View>

                    <Text style={tailwind("pl-5 pb-5")}>{route.params.location}</Text>
                    {/* <Text style={tailwind("px-5")}>Opening Hours??</Text> */}
                    <View>

                        <List.Section>
                            {/* DESCRIPTION */}
                            <List.Accordion
                                style={ {borderBottomWidth: 0.5, borderBottomColor: "#fa3c4c"}}
                                raised theme={{ colors: { primary: "#fa3c4c" }} }
                                title="Description"
                                onPress={handlePress}
                            >
                                <Text style={tailwind("p-5")}>{route.params.description}</Text>
                            </List.Accordion>

                            {/* PRODUCTS */}
                            <List.Accordion
                                style={ {borderBottomWidth: 0.5, borderBottomColor: "#fa3c4c"}}
                                raised theme={{ colors: { primary: "#fa3c4c" }} }
                                title="Menu"
                            >
                                <FlatList
                                    data={route.params.products}
                                    numColumns={2}
                                    columnWrapperStyle={{justifyContent: 'space-between'}}
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
                            <List.Accordion
                                style={ {borderBottomWidth: 0.5, borderBottomColor: "#fa3c4c"}}
                                raised theme={{ colors: { primary: "#fa3c4c" }} }
                                title="Orders"
                            >
                                <View style={tailwind("flex")}>
                                    {
                                        isLoggedIn
                                            ? <Fragment />
                                            : <BlurView intensity={85} style={{  height:"100%", position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100 }}>
                                                <View style={tailwind("flex flex-col justify-center items-center mt-10")}>
                                                    <Text style={tailwind("text-center mb-5")}>The content cannot be seen because you are not logged in.</Text>
                                                    <Button mode="contained" onPress={() => navigation.navigate("Login")}>Login</Button>
                                                </View>
                                            </BlurView>
                                    }
                                    <FlatList
                                        data={listings}
                                        extraData={refresh}
                                        keyExtractor={item => item._id}
                                        renderItem={({ item }) => {
                                            return (
                                                <List.Item
                                                    style={ {borderBottomWidth: 0.5, borderBottomColor: "#fa3c4c"}}
                                                    title={formatListingTitle(item.order, item.quantity)}
                                                    description={
                                                        formatListingDescription(item.price, item.username, item.listAt)
                                                    }
                                                    descriptionNumberOfLines={3}
                                                    right={() => 
                                                        <IconButton
                                                            icon="chat"
                                                            color={"#fa3c4c"}
                                                            size={20}
                                                            style={{alignSelf: "center"}}
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
                                            <Title style={{ textAlign: "center", color: "#000000", marginBottom: "5%" }}>Add Order</Title>
                                            
                                            <SelectPicker
                                                style={{ borderBottomWidth: 1, borderBottomColor: "#bababa", marginBottom: "2%" }}
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
                                                    textColor='grey'
                                                    iconStyle={{ color: "#ffffff" }}
                                                    rightButtonBackgroundColor="#fa3c4c"
                                                    leftButtonBackgroundColor="#fc7782"
                                                />
                                                <TextInput
                                                    raised
                                                    theme={{ colors: { primary: "#fa3c4c", text: "#000000", label: "#000000", accent: "#000000" } }}
                                                    style={tailwind("bg-white w-3/5")}
                                                    placeholderTextColor="#000000"
                                                    keyboardType="numeric"
                                                    label="Price"
                                                    placeholder="State the price you are willing to pay"
                                                    value={price}
                                                    onChangeText={(price) => setPrice(price)}
                                                />
                                            </View>
                                            <Button
                                                style={{ height: 40, margin: "2%", padding:"1%", marginTop: "8%" }}
                                                mode="contained"
                                                raised
                                                theme={{ colors: { primary: "#fa3c4c" } }}
                                                onPress={() => submitOrder()}
                                            >
                                                Submit Order
                                            </Button>
                                        </Modal>
                                    </Portal>
                                    <Button
                                        mode="text"
                                        raised
                                        theme={{ colors: { primary: "#fa3c4c" } }}
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
        backgroundColor: '#ffffff',
    },
    item: {
        width: '45%',
        margin: '2%',
    }
});
