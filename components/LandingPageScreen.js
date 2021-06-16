import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Button, IconButton, Searchbar } from 'react-native-paper';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from "../database/firebaseDB";
import LandingPageTab from './LandingPageTab';
import { AuthContext } from '../provider/AuthContext';

const LandingPageScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [itemData, setItemData] = React.useState("");
    const { username, isLoggedIn } = useContext(AuthContext);
    const [tempData, setTempData] = React.useState("");

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
    return (
        <View style={tailwind("flex-1")}>
            <View style={tailwind("flex-row mt-6 justify-center items-center")}>
                <Searchbar style={tailwind("ml-5 w-5/6 border-solid border border-black h-8")}
                    placeholder="Search"
                    onChangeText={text => searchFilterFunction(text)}
                />
                <IconButton
                    icon="near-me"
                    color="#fa3c4c"
                    size={30}
                    onPress={() => navigation.navigate("Nearby")} />
            </View>

            <View style={tailwind("flex-row justify-center items-center")}>
                {
                    isLoggedIn
                        ? <Button raised theme={{ colors: { primary: "#fa3c4c" } }} mode="text" icon="plus" style={{ margin: "2%" }}
                            onPress={() => navigation.navigate("Add Shop")}>
                            <Text >Add Shop</Text>
                        </Button>
                        : <Fragment />
                }
            </View>
            <LandingPageTab itemData={itemData}></LandingPageTab>
        </View>
    );
}

export default LandingPageScreen;