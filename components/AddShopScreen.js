import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, View, Text, Dimensions } from 'react-native';
import { Card, Title, Button, TextInput, Provider, DefaultTheme, Modal, Portal, Paragraph, RadioButton } from 'react-native-paper';
import { addShop } from '../database/actions/Shop';
import tailwind from 'tailwind-rn';
import AwesomeAlert from 'react-native-awesome-alerts';


const AddShopScreen = ({navigation}) => {
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

    //msg
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    //add shop
    const [checked, setChecked] = React.useState("Hawker");

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#fa3c4c'
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
        addShop(newShop).then(response => {
            setMessage("Success");
            setShowAlert(true);
        }).catch(error => {
            console.log(error);
            setMessage("Fail" + error);
            setShowAlert(true);
        });
            
    };

    return (
        <Provider theme={theme}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <AwesomeAlert
                contentContainerStyle={{width: Dimensions.get('window').width}}
          show={showAlert}
          showProgress={false}
          title="Add Shop"
          message={message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#fa3c4c"
          confirmButtonTextStyle={{paddingLeft:"10%", paddingRight:"10%"}}
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            setShowAlert(false);
            navigation.goBack();
          }}
        />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        style={{backgroundColor: "white"}}
                        label="Name"
                        onChangeText={value => setShopNameData(value)}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        style={{backgroundColor: "white"}}
                        label="Description"
                        onChangeText={value => setShopDescriptionData(value)}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        style={{backgroundColor: "white"}}
                        label="Location"
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
                                raised
                                theme={{ colors: { primary: "#fa3c4c" } }}
                                style={{ height: 40, margin: "2%", padding: "1%", marginTop: "10%" }}
                                mode="contained"
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
                        style={{ height: 40, margin: "2%", padding: "1%", marginTop: "10%" }}
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