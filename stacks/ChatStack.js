import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../components/ChatScreen";
import RoomScreen from "../components/RoomScreen";
import UserReviewScreen from "../components/UserReviewScreen";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../provider/AuthContext";

const Chat = createStackNavigator();

const ChatStack = () => {
    const navigation = useNavigation();
    const { username, avatar } = useContext(AuthContext);

    return (
        <Chat.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#fa3c4c" }, headerTintColor: "#ffffff" }}>
            <Chat.Screen name="Chat" component={ChatScreen} />
            <Chat.Screen name="Room" component={RoomScreen} options={({ route }) => ({
                title: route.params.anotherUser,
                headerRight: () => (
                    <IconButton
                        icon="thumb-up-outline"
                        onPress={() => navigation.navigate("Review", {
                            ratedUser: route.params.anotherUser,
                            voteUser: username,
                            voteAvatar: avatar,
                        })}
                        color="#ffffff"
                        style={{ paddingRight: 10 }}
                    />
                )
            })} />
            <Chat.Screen name="Review" component={UserReviewScreen} options={({ route }) => ({
                title: "Review for " + route.params.ratedUser,
            })} />
        </Chat.Navigator>
    );
}

export default ChatStack;