import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../provider/AuthContext";
import ChatScreen from "../components/ChatScreen";
import RoomScreen from "../components/RoomScreen";

const Chat = createStackNavigator();

const ChatStack = () => {
    const { username } = useContext(AuthContext);

    return (
        <Chat.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "red" }, headerTintColor: "white" }}>
            <Chat.Screen name="Chat" component={ChatScreen} />
            <Chat.Screen 
                name="Room" 
                component={RoomScreen} 
            />
        </Chat.Navigator>
    );
}

export default ChatStack;