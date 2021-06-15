import React, {useState, useEffect} from 'react';
import { IconButton, Colors, Searchbar, List } from 'react-native-paper';
import {  Text, View, Button, FlatList, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAllShops } from "../database/actions/shop.js";
import StoreInfo from "./StoreInfo";

const LandingPageScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const [itemData, setItemData] = React.useState("");
    useEffect(() => {
        getAllShops().then(response => setItemData(response));
    }, []);

    const onChangeSearch = query => setSearchQuery(query);
    return (<View >
        <View style={tailwind("flex my-5 items-center")}>
            <Searchbar style={tailwind("w-4/5 border-solid border-2 border-red-500")}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
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
                    onPress={() => console.log('Pressed')} />
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
                renderItem={({item}) => {
                    return (
                        <List.Item 
                            title={item.name}
                            description={item.location}
                            left={() => <Image source={{ uri: item.img }}
                                                style={{ width:60, height:60 }}/>}
                            onPress={() => navigation.navigate("StoreInfo")}
                        />
                    )
                }}
            />
        </View>
    </View>);
}

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer independent={true}>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={LandingPageTabs} />
//         <Stack.Screen name="Store Info" component={StoreInfo} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


export default LandingPageScreen;