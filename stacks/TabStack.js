import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootProfileStack from "./RootProfileStack";
import LandingPageStack from "./LandingPageStack";
import ChatStack from "./ChatStack";
import BookmarkStack from "./BookmarkStack";

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"  component={LandingPageStack} />
            <Tab.Screen name="Bookmark" component={BookmarkStack} />
            <Tab.Screen name="Chat" component={ChatStack} />
            <Tab.Screen name="Profile" component={RootProfileStack} />
        </Tab.Navigator>
    )
}

export default TabStack;