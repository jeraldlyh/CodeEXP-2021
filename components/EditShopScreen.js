import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, View, Text, Dimensions } from 'react-native';
import { Card, Title, Button, TextInput, Provider, DefaultTheme, Modal, Portal, Paragraph, RadioButton } from 'react-native-paper';
import { addShop, updateShop } from '../database/actions/Shop';
import tailwind from 'tailwind-rn';
import AwesomeAlert from 'react-native-awesome-alerts';

const addProduct = () => {
    var newData = productData;
    newData.push({ "url": productUrlData, "name": productName, "price": productPriceData })
    setProductData(newData);
    hideModal();
};
const EditShopScreen = ({ route, navigation }) => {
    //modal data
    const [productName, setProductName] = useState('');
    const [productUrlData, setProductUrlData] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAIWZZNRd59YjcVrp1LpfYG_FiyXO1ViH7Q&usqp=CAU');
    const [productPriceData, setProductPriceData] = useState('');

    //shop data
    const [productData, setProductData] = useState(route.params.item.products);
    const [shopNameData, setShopNameData] = useState(route.params.item.name);
    const [shopDescriptionData, setShopDescriptionData] = useState(route.params.item.description);
    const [shopLocationData, setShopLocationData] = useState(route.params.item.location);
    const [shopTypeData, setShopTypeData] = useState(route.params.item.type);

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [visible2, setVisible2] = useState(false);
    const showModal2 = () => setVisible2(true);
    const hideModal2 = () => setVisible2(false);
    const containerStyle = { backgroundColor: "white", padding: 20 };

    //msg
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    const [checked, setChecked] = React.useState("");

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#fa3c4c'
        },
    };
    const editProduct = (item) => {
        var prodName = item.name;
        var prodPrice = item.price;
        if (productPriceData.length != 0 || productPriceData == null) {
            prodPrice = productPriceData;
        }
        if (productName.length != 0 || productPriceData == null){
            prodName = productName;
        }
        var newData = productData.filter(leftitem => leftitem._id != item._id);
        newData.push({ "url": productUrlData, "name": prodName, "price": prodPrice })
        setProductData(newData);
        hideModal2();
    };
    
    const editNewShop = () => {
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
        updateShop(newShop, shopNameData).then(response => {
            setMessage("Success");
            setShowAlert(true);
        }).catch(error => {
            setMessage("Fail" + error);
            setShowAlert(true);
        });

    };

    return (
        <Provider theme={theme}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <AwesomeAlert
                        contentContainerStyle={{ width: Dimensions.get('window').width }}
                        show={showAlert}
                        showProgress={false}
                        title="Edit Shop"
                        message={message}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#fa3c4c"
                        confirmButtonTextStyle={{ paddingLeft: "10%", paddingRight: "10%" }}
                        onCancelPressed={() => {
                            setShowAlert(false)
                        }}
                        onDismiss={() => {
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
                            setShowAlert(false)
                            navigation.navigate("StoreInfo", { ...newShop })
                        }}
                        onConfirmPressed={() => {
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
                            setShowAlert(false)
                            navigation.navigate("StoreInfo", { ...newShop })
                        }}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        style={{backgroundColor: "white"}}
                        label="Description" defaultValue={route.params.item.description}
                        onChangeText={value => setShopDescriptionData(value)}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        style={{backgroundColor: "white"}}
                        label="Location" defaultValue={route.params.item.location}
                        onChangeText={value => setShopLocationData(value)}
                    />
                    <RadioButton.Group
                        onValueChange={newValue => setShopTypeData(newValue)}
                        value={shopTypeData}
                    >
                        <View style={tailwind("bg-white")}>
                            <View style={tailwind("flex flex-row w-full justify-around mt-3")}>
                                <View>
                                    <Text style={tailwind("text-center text-gray-700")}>Hawker</Text>
                                    <RadioButton color="#fa3c4c" value="Hawker" status={ checked === 'Hawker' ? 'checked' : 'unchecked' } onPress={() => setChecked("Hawker")} />
                                </View>
                                <View>
                                    <Text style={tailwind("text-center text-gray-700")}>Shop</Text>
                                    <RadioButton color="#fa3c4c" value="Shop" status={ checked === 'Shop' ? 'checked' : 'unchecked' } onPress={() => setChecked("Shop")} />
                                </View>
                            </View>
                        </View>
                    </RadioButton.Group>
                    <Button
                        mode="text"
                        icon="plus"
                        raised
                        theme={{ colors: { primary: "#fa3c4c" } }}
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
                            <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                                style={{backgroundColor: "white"}}
                                label="Product Name"
                                onChangeText={value => setProductName(value)}
                            />
                            <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                                style={{backgroundColor: "white"}}
                                label="Price"
                                keyboardType='numeric'
                                onChangeText={value => setProductPriceData(value)}
                            />
                            <Button
                                style={{ height: 40, margin: "2%", padding: "1%", marginTop: "10%" }}
                                mode="contained"
                                raised
                                theme={{ colors: { primary: "#fa3c4c" } }}
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
                                        <Button
                                            style={{ height: 40, margin: "2%", padding: "1%", marginTop: "2%" }}
                                            mode="contained"
                                            raised
                                            theme={{ colors: { primary: "#fa3c4c" } }}
                                            onPress={() => showModal2()}
                                        >
                                            Edit
                                        </Button>
                                        <Portal>
                                            <Modal
                                                visible={visible2}
                                                onDismiss={hideModal2}
                                                contentContainerStyle={containerStyle}
                                            >
                                                <Title style={{ textAlign: "center", color: "black" }}>Edit Product</Title>
                                                <TextInput theme={{ colors: { primary: "#fa3c4c" } }} 
                                                style={{backgroundColor: "white"}}
                                                defaultValue={item.name}
                                                    label="Product Name"
                                                    onChangeText={value => setProductName(value)}
                                                />
                                                <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                                                style={{backgroundColor: "white"}}
                                                    label="Price" defaultValue={item.price}
                                                    onChangeText={value => setProductPriceData(value)}
                                                />
                                                <Button
                                                    style={{ height: 40, margin: "2%", padding: "1%", marginTop: "10%" }}
                                                    mode="contained"
                                                    raised
                                                    theme={{ colors: { primary: "#fa3c4c" } }}
                                                    onPress={() => editProduct(item)}
                                                >
                                                    Edit Product
                                                </Button>
                                            </Modal>
                                        </Portal>
                                    </Card.Content>
                                </Card>
                            )
                        }}
                    />
                    <Button
                        style={{ height: 40, margin: "2%", padding: "1%", marginTop: "10%" }}
                        mode="contained"
                        raised
                        theme={{ colors: { primary: "#fa3c4c" } }}
                        onPress={() => editNewShop()}
                    >
                        Edit Shop
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}

export default EditShopScreen;

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