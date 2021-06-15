import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../components/ChatScreen";
import ChatInfo from "../components/ChatInfo";

const Chat = createStackNavigator();

const ChatStack = () => {
    return (
    <Chat.Navigator screenOptions={{ headerShown: true }}>
        <Chat.Screen name="Chat" component={ChatScreen} />
        <Chat.Screen name="Room" component={ChatInfo} />
    </Chat.Navigator> );
}
 
export default ChatStack;