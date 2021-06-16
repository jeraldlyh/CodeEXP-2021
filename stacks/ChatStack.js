import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../components/ChatScreen";
import RoomScreen from "../components/RoomScreen";

const Chat = createStackNavigator();

const ChatStack = () => {
    return (
        <Chat.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#fa3c4c" }, headerTintColor: "#ffffff" }}>
            <Chat.Screen name="Chat" component={ChatScreen} />
            <Chat.Screen name="Room" component={RoomScreen} options={({ route }) => ({ title: route.params.anotherUser })}/>
        </Chat.Navigator>
    );
}

export default ChatStack;