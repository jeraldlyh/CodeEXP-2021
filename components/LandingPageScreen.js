import React, { useState, useContext, useEffect } from 'react';
import { Button, IconButton, Colors, Searchbar, List } from 'react-native-paper';
import { Text, View, FlatList, Image, LogBox, ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from "../database/firebaseDB";
import LandingPageTab from './LandingPageTab';
import { AuthContext } from '../provider/AuthContext';

const LandingPageScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [itemData, setItemData] = React.useState("");
    const { username, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("shop").onSnapshot((collection => {
            const shopData = collection.docs.map(doc => doc.data())
            setItemData(shopData);
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
        
        <View style={tailwind("flex-row m-3 justify-center items-center")}>
        {isLoggedIn ? <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 w-2/5")} mode="contained" onPress={() => navigation.navigate("AddShop")}>
                <Text >Add Shop</Text>
            </Button> : <Text></Text>}
            
        </View>
        <LandingPageTab itemData={itemData}></LandingPageTab>
    </View>);
}

export default LandingPageScreen;