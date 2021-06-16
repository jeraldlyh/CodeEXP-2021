import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../components/ChatScreen";
import RoomScreen from "../components/RoomScreen";
// import { Button, Icon } from "react-native";
import { IconButton } from "react-native-paper";

const Chat = createStackNavigator();

const ChatStack = () => {
    return (
        <Chat.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#fa3c4c" }, headerTintColor: "#ffffff" }}>
            <Chat.Screen name="Chat" component={ChatScreen} />
            {/* <Chat.Screen name="Room" component={RoomScreen} options={{headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          )}}/> */}
            <Chat.Screen name="Room" component={RoomScreen} options={({ route }) => ({ title: route.params.anotherUser,
                                                                                        headerRight: () => (
                                                                                        <IconButton
                                                                                        icon="thumb-up-outline"
                                                                                        onPress={() => alert('It works!')}
                                                                                        color="#ffffff"
                                                                                        style={{paddingRight: 10}}
                                                                                        />
            ) })}/>
        </Chat.Navigator>
    );
}

export default ChatStack;