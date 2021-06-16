import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPageScreen from "../components/LandingPageScreen";
import StoreInfo from "../components/StoreInfo";
import NearbyScreen from "../components/NearbyScreen";
import RoomScreen from "../components/RoomScreen";
import AddShopScreen from "../components/AddShopScreen";
import LoginScreen from "../components/LoginScreen";

const Landing = createStackNavigator();

const LandingPageStack = () => {
    return (
        <Landing.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#fa3c4c" }, headerTintColor: "#ffffff" }} >
            <Landing.Screen name="Red Dot Kakis" component={LandingPageScreen} />
            <Landing.Screen name="Nearby" component={NearbyScreen} />
            <Landing.Screen name="AddShop" component={AddShopScreen} />
            <Landing.Screen name="StoreInfo" component={StoreInfo} options={({ route }) => ({ title: route.params.name })} />
            <Landing.Screen name="Room" component={RoomScreen} options={({ route }) => ({ title: route.params.username })}/>
            <Landing.Screen name="Login" component={LoginScreen} />
        </Landing.Navigator>
    );
};

export default LandingPageStack;
