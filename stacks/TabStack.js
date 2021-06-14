import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootProfileStack from "./RootProfileStack";
import LandingPageTabs from "../components/LandingPageScreen"

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"  component={LandingPageTabs} />
            <Tab.Screen name="Profile" component={RootProfileStack} />
        </Tab.Navigator>
    )
}

export default TabStack;