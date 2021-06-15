import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPageScreen from "../components/LandingPageScreen";
import StoreInfo from "../components/StoreInfo";
import { IconButton, Colors, Searchbar, List } from 'react-native-paper';

import NearbyScreen from "../components/NearbyScreen";
import { HeaderBackButton } from "@react-navigation/stack";
import { tail } from "lodash";
import tailwind from "tailwind-rn";

const Landing = createStackNavigator();

const LandingPageStack = () => {
    return (
        <Landing.Navigator 
            screenOptions={{ 
                headerShown: true, 
                headerTitleStyle: { textAlign: "center", flex: 1 }, 
                headerStyle: { backgroundColor: "red"}, 
                headerTintColor: "white" ,
                headerTitleContainerStyle: {        // Android configuration
                    left: 0,
                },
                // headerBackTitle: "Back"

            }} >
            <Landing.Screen name="Red Dot Kakis" component={LandingPageScreen} />
            <Landing.Screen name="Nearby" component={NearbyScreen} />
            <Landing.Screen name="StoreInfo" component={StoreInfo} options={({ route }) => ({ title: route.params.name })} />
        </Landing.Navigator>
    );
};

export default LandingPageStack;
