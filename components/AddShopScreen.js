import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Card, Title, Button, TextInput, Provider, DefaultTheme, Modal, Portal, Paragraph  } from 'react-native-paper';
import { addShop } from '../database/actions/Shop';
import SelectPicker from 'react-native-form-select-picker';


const AddShopScreen = () => {
    //modal data
    const [productName, setProductName] = useState('');
    const [productUrlData, setProductUrlData] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAIWZZNRd59YjcVrp1LpfYG_FiyXO1ViH7Q&usqp=CAU');
    const [productPriceData, setProductPriceData] = useState('');

    //shopd data
    const [productData, setProductData] = useState([]);
    const [shopNameData, setShopNameData] = useState('');
    const [shopUrlData, setShopUrlData] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAIWZZNRd59YjcVrp1LpfYG_FiyXO1ViH7Q&usqp=CAU");
    const [shopdescriptionData, setShopdescriptionData] = useState('');
    const [shopLocationData, setShopLocationData] = useState('');
    const [shopRatingData, setShopRatingData] = useState('');
    const [shopTypeData, setshopTypeData] = useState('');
    

    
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
        newData.push({"url": productUrlData, "name": productName, "price": productPriceData })
        setProductData(newData);
        hideModal();
    };
    const addNewShop = () => {
        
        const newShop = {"data":{"name": shopNameData, "img": shopUrlData, "description": shopdescriptionData, "location": shopLocationData, "rating": shopRatingData, "type": shopTypeData, "products": productData, "listings": [], "reviews": []}}
        console.log(newShop);
        addShop(newShop).catch(error => console.log(error));
    };
    return (<Provider theme={theme}>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Title style={{ textAlign: "center", color: "black" }}>Add Shop</Title>

                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Name"
                    onChangeText={value => setShopNameData(value)}
                />
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Shop Image" value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAIWZZNRd59YjcVrp1LpfYG_FiyXO1ViH7Q&usqp=CAU"
                    onChangeText={value => setShopUrlData(value)}
                />
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Description"
                    onChangeText={value => setShopdescriptionData(value)}
                />
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Location"
                    onChangeText={value => setShopLocationData(value)}
                />
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Rating"
                    onChangeText={value => setShopRatingData(value)}
                />
                <SelectPicker
                    style={{ borderBottomWidth: 1 }}
                    selectedValue={"hawker"}
                    onValueChange={(itemValue) => setshopTypeData(itemValue)}
                    placeholder="Click to select item"
                >
                    <SelectPicker.Item key={"hawker"} label={"hawker"} value={"Hawker"} />
                    <SelectPicker.Item key={"shop"} label={"shop"} value={"Shop"} />
                </SelectPicker>
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
                    style={{ height: 40, margin: "2%", padding: "1%", marginTop: "2%" }}
                    mode="contained"
                    raised
                    theme={{ colors: { primary: "red" } }}
                    onPress={() => addNewShop()}
                >

                    Add Shop
                </Button>
            </ScrollView>
        </SafeAreaView>
    </Provider>);
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