import React, { useState, useEffect } from 'react';
import { IconButton, Colors, Searchbar, List } from 'react-native-paper';
import { Text, View, FlatList, Image, LogBox, ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from "../database/firebaseDB";
import LandingPageTab from './LandingPageTab';
import HawkerScreen from './HawkerScreen';
import ShopScreen from './ShopScreen';
import AllScreen from './AllScreen';

const LandingPageScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tempData, setTempData] = useState('');
    const [hawkerData, setHawkerData] = useState('');
    const [itemData, setItemData] = React.useState("");
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("shop").onSnapshot((collection => {
            const shopData = collection.docs.map(doc => doc.data())
            setItemData(shopData);
            setTempData(shopData);
        }))
        return () => unsubscribe();
    }, []);
    const searchFilterFunction = text => {
        setSearchQuery(text);
        if (text != '') {
            var newData = tempData.filter(item => {
                const compareData = `${item.name.toUpperCase()}`;
                const compareLocationData = `${item.location.toUpperCase()}`;
                const textData = text.toUpperCase();

                return compareData.indexOf(textData) > -1 || compareLocationData.indexOf(textData) > -1;
            });

            setItemData(newData);
        } else {
            const unsubscribe = firebase.firestore().collection("shop").onSnapshot((collection => {
                const shopData = collection.docs.map(doc => doc.data())
                setItemData(shopData);
            }))

            return () => unsubscribe();
        };
    }
    const shopViewFunction = () => {
        var newData = tempData.filter(item => {
            const compareData = `${item.type.toUpperCase()}`;
            const textData = "Shop".toUpperCase();
            return compareData.indexOf("SHOP") > -1;
        });
        setItemData(newData);
    }
    const hawkerViewFunction = () => {
        var newData = tempData.filter(item => {
            const compareData = `${item.type.toUpperCase()}`;
            return compareData.indexOf("HAWKER") > -1;
        });
        setItemData(newData);
    }
    const allViewFunction = () => {
        setItemData(tempData);
    }
    return (<View style={tailwind("flex-1")}>

        <View style={tailwind("flex-row mt-8 justify-center items-center")}>
            <Searchbar style={tailwind("ml-5 w-4/5 border-solid border-2 border-red-500")}
                placeholder="Search"
                onChangeText={text => searchFilterFunction(text)}
            />
            <IconButton
                icon="near-me"
                color={Colors.red500}
                size={40}
                onPress={() => navigation.navigate("Nearby")} />
        </View>

<LandingPageTab itemData={itemData} tempData={tempData} setItemData={setItemData} hawkerData={hawkerData}></LandingPageTab>

        {/* <View>
            <FlatList
                data={itemData}
                keyExtractor={item => item.name}
                renderItem={({ item }) => {
                    return (
                        <List.Item
                            title={item.name}
                            description={item.location}
                            left={() => <Image source={{ uri: item.img }}
                                style={{ width: 60, height: 60 }} />}
                            onPress={() => navigation.navigate("StoreInfo", { ...item })}
                        />
                    )
                }}
            />
        </View> */}
    </View>);
}

export default LandingPageScreen;