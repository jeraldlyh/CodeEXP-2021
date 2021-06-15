import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootProfileStack from "./RootProfileStack";
import LandingPageStack from "./LandingPageStack";
import ChatStack from "./ChatStack";
import BookmarkStack from "./BookmarkStack";
import Ionicons from 'react-native-vector-icons/Ionicons';

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

                return <Ionicons name={iconName} size={size} color='red' />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'red',
                inactiveTintColor: 'gray',
              }}
        >
            <Tab.Screen name="Home"  component={LandingPageStack} />
            <Tab.Screen name="Bookmark" component={BookmarkStack} />
            <Tab.Screen name="Chat" component={ChatStack} />
            <Tab.Screen name="Profile" component={RootProfileStack} />
        </Tab.Navigator>
    )
}

export default TabStack;