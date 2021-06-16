import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPageScreen from "../components/LandingPageScreen";
import StoreInfo from "../components/StoreInfo";
import NearbyScreen from "../components/NearbyScreen";

const Landing = createStackNavigator();

const LandingPageStack = () => {
    return (
        <Landing.Navigator 
            screenOptions={{ 
                headerShown: true, 
                headerStyle: { backgroundColor: "red"}, 
                headerTintColor: "white" ,

            }} >
            <Landing.Screen name="Red Dot Kakis" component={LandingPageScreen} />
            <Landing.Screen name="Nearby" component={NearbyScreen} />
            <Landing.Screen name="StoreInfo" component={StoreInfo} options={({ route }) => ({ title: route.params.name })} />
        </Landing.Navigator>
    );
};

export default LandingPageStack;
