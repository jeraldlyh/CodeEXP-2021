import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';
import { Card, Title, Button, TextInput, Provider, DefaultTheme, Modal, Portal, Paragraph, RadioButton } from 'react-native-paper';
import { addShop } from '../database/actions/Shop';
import tailwind from 'tailwind-rn';


const AddShopScreen = () => {
    //modal data
    const [productName, setProductName] = useState('');
    const [productUrlData, setProductUrlData] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAIWZZNRd59YjcVrp1LpfYG_FiyXO1ViH7Q&usqp=CAU');
    const [productPriceData, setProductPriceData] = useState('');

    //shop data
    const [productData, setProductData] = useState([]);
    const [shopNameData, setShopNameData] = useState('');
    const [shopDescriptionData, setShopDescriptionData] = useState('');
    const [shopLocationData, setShopLocationData] = useState('');
    const [shopTypeData, setShopTypeData] = useState('');


    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "white", padding: 20 };
    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: 'red'
        },
    };
    const addProduct = () => {
        var newData = productData;
        newData.push({ "url": productUrlData, "name": productName, "price": productPriceData })
        setProductData(newData);
        hideModal();
    };
    const addNewShop = () => {
        const newShop = {
            "name": shopNameData,
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAIWZZNRd59YjcVrp1LpfYG_FiyXO1ViH7Q&usqp=CAU",
            "description": shopDescriptionData,
            "location": shopLocationData,
            "rating": 0,
            "type": shopTypeData,
            "products": productData,
            "listings": [],
            "reviews": []
        }
        addShop(newShop).catch(error => console.log(error));
    };

    return (
        <Provider theme={theme}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TextInput theme={{ colors: { primary: "red" } }}
                        label="Name"
                        onChangeText={value => setShopNameData(value)}
                    />
                    <TextInput theme={{ colors: { primary: "red" } }}
                        label="Description"
                        onChangeText={value => setShopDescriptionData(value)}
                    />
                    <TextInput theme={{ colors: { primary: "red" } }}
                        label="Location"
                        onChangeText={value => setShopLocationData(value)}
                    />
                    <RadioButton.Group
                        onValueChange={newValue => setShopTypeData(newValue)}
                        value={shopTypeData}
                    >
                        <View style={tailwind("bg-gray-200")}>
                            <View style={tailwind("flex flex-row w-full justify-around mt-3")}>
                                <View>
                                    <Text style={tailwind("text-center text-gray-700")}>Hawker</Text>
                                    <RadioButton value="Hawker" />
                                </View>
                                <View>
                                    <Text style={tailwind("text-center text-gray-700")}>Shop</Text>
                                    <RadioButton value="Shop" />
                                </View>
                            </View>
                        </View>
                    </RadioButton.Group>
                    <Button
                        mode="text"
                        raised
                        theme={{ colors: { primary: "red" } }}
                        onPress={showModal}
                    >
                        Add Product
                    </Button>
                    <Portal>
                        <Modal
                            visible={visible}
                            onDismiss={hideModal}
                            contentContainerStyle={containerStyle}
                        >
                            <Title style={{ textAlign: "center", color: "black" }}>Add Product</Title>
                            <TextInput theme={{ colors: { primary: "red" } }}
                                label="Product Name"
                                onChangeText={value => setProductName(value)}
                            />
                            <TextInput theme={{ colors: { primary: "red" } }}
                                label="Product Image" value="https://static.vecteezy.com/system/resources/previews/001/979/281/non_2x/rice-porridge-on-a-wood-table-free-photo.jpg"
                                onChangeText={value => setProductUrlData(value)}
                            />
                            <TextInput theme={{ colors: { primary: "red" } }}
                                label="Price"
                                onChangeText={value => setProductPriceData(value)}
                            />
                            <Button
                                style={{ height: 40, margin: "2%", padding: "1%", marginTop: "2%" }}
                                mode="contained"
                                raised
                                theme={{ colors: { primary: "red" } }}
                                onPress={() => addProduct()}
                            >
                                Add Product
                            </Button>
                        </Modal>
                    </Portal>
                    <FlatList
                        data={productData}
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
                    <Button
                        style={{ height: 40, margin: "2%", padding: "1%", marginTop: "5%" }}
                        mode="contained"
                        raised
                        theme={{ colors: { primary: "#fa3c4c" } }}
                        onPress={() => addNewShop()}
                    >
                        Add Shop
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}

export default AddShopScreen;

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