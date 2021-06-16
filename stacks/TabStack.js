import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootProfileStack from "./RootProfileStack";
import LandingPageStack from "./LandingPageStack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RootChatStack from "./RootChatStack";
import RootBookmarkStack from "./RootBookmarkStack";

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Bookmark') {
                    iconName = focused
                    ? 'star'
                    : 'star-outline';
                } else if (route.name === 'Chat') {
                    iconName = focused
                    ? 'chatbubble'
                    : 'chatbubble-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused
                    ? 'person'
                    : 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color="#ff8b94" />;
                },
            })}
            tabBarOptions={{
                activeTintColor: "#ff8b94",
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home"  component={LandingPageStack} />
            <Tab.Screen name="Bookmark" component={RootBookmarkStack} />
            <Tab.Screen name="Chat" component={RootChatStack} />
            <Tab.Screen name="Profile" component={RootProfileStack} />
        </Tab.Navigator>
    )
}

export default TabStack;