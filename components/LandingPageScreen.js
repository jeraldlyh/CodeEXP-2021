import React, {useState, useEffect} from 'react';
import { IconButton, Colors, Searchbar, List } from 'react-native-paper';
import {  Text, View, FlatList, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from "../database/firebaseDB";

const LandingPageScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tempData, setTempData] = useState('');
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
        console.log(text);
        if (text != '') {
            const newData = tempData.filter(item => {
                const compareData = `${item.name.toUpperCase()}`;

                const textData = text.toUpperCase();

                return compareData.indexOf(textData) > -1;
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
        
    return (<View >
        <View style={tailwind("flex my-5 items-center")}>
            <Searchbar style={tailwind("w-4/5 border-solid border-2 border-red-500")}
                placeholder="Search"
                onChangeText={text => searchFilterFunction(text)}
            />
        </View>

        <View style={tailwind("flex flex-row justify-center")}>
            <View style={tailwind("text-center")}>
                <IconButton
                    icon="food-fork-drink"
                    color={Colors.red500}
                    size={50}
                    onPress={() => console.log('Pressed')} />
                <Text style={tailwind("text-center")}>Hawker</Text>
            </View>
            <View style={tailwind("text-center")}>
                <IconButton
                    icon="store"
                    color={Colors.red500}
                    size={50}
                    onPress={() => console.log('Pressed')} />
                <Text style={tailwind("text-center")}>Shops</Text>
            </View>
            <View style={tailwind("text-center")}>
                <IconButton
                    icon="near-me"
                    color={Colors.red500}
                    size={50}
                    onPress={() => navigation.navigate("Nearby")} />
                <Text style={tailwind("text-center")}>Nearby</Text>
            </View>
            <View style={tailwind("text-center")}>
                <IconButton style={tailwind("mx-5")}
                    icon="home"
                    color={Colors.red500}
                    size={50}
                    onPress={() => console.log('Pressed')} />
                <Text style={tailwind("text-center")}>Neighbourhood</Text>
            </View>
        </View>
        <View>
            <FlatList
                data={itemData}
                keyExtractor={item => item.name}
                renderItem={({item}) => {
                    return (
                        <List.Item 
                            title={item.name}
                            description={item.location}
                            left={() => <Image source={{ uri: item.img }}
                                                style={{ width:60, height:60 }}/>}
                            onPress={() => navigation.navigate("StoreInfo", {...item})}
                        />
                    )
                }}
            />
        </View>
    </View>);
}

export default LandingPageScreen;