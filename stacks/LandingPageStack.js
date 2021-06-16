import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import LandingPageScreen from "../components/LandingPageScreen";
import StoreInfo from "../components/StoreInfo";
import NearbyScreen from "../components/NearbyScreen";
import RoomScreen from "../components/RoomScreen";
import AddShopScreen from "../components/AddShopScreen";
import LoginScreen from "../components/LoginScreen";
import EditShopScreen from "../components/EditShopScreen";

const Landing = createStackNavigator();

const LandingPageStack = ({navigator}) => {
    return (
        <Landing.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#fa3c4c" }, headerTintColor: "#ffffff" }} >
            <Landing.Screen name="Red Dot Kakis" component={LandingPageScreen} />
            <Landing.Screen name="Nearby" component={NearbyScreen} />
            <Landing.Screen name="Add Shop" component={AddShopScreen} />
            <Landing.Screen name="StoreInfo" component={StoreInfo} options={({ route, navigation }) => ({ title: route.params.name, 
                                                                                        headerRight: () => (
                                                                                        <IconButton
                                                                                        icon="pencil-outline"
                                                                                        onPress={() => navigation.navigate("Edit Shop", { item: route.params })}
                                                                                        color="#ffffff"
                                                                                        style={{paddingRight: 10}}
                                                                                         />
            ) })} />
            <Landing.Screen name="Edit Shop" component={EditShopScreen}/>
            <Landing.Screen name="Room" component={RoomScreen} options={({ route }) => ({ title: route.params.anotherUser,
                                                                                        headerRight: () => (
                                                                                        <IconButton
                                                                                        icon="thumb-up-outline"
                                                                                        onPress={() => alert('It works!')}
                                                                                        color="#ffffff"
                                                                                        style={{paddingRight: 10}}
                                                                                        />
            ) })}/>
            <Landing.Screen name="Login" component={LoginScreen} />
        </Landing.Navigator>
    );
};

export default LandingPageStack;
