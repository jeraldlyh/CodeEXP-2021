import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookmarkScreen from "../components/BookmarkScreen";
import StoreInfo from "../components/StoreInfo";

const Bookmark = createStackNavigator();

const BookmarkStack = () => {
    return (
        <Bookmark.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#fa3c4c" }, headerTintColor: "#ffffff" }}>
            <Bookmark.Screen name="Bookmark" component={BookmarkScreen} />
            <Bookmark.Screen name="StoreInfo" component={StoreInfo} options={({ route, navigation }) => ({
                title: route.params.name,
                headerRight: () => (
                    <IconButton
                        icon="pencil-outline"
                        onPress={() => navigation.navigate("Edit Shop", { item: route.params })}
                        color="#ffffff"
                        style={{ paddingRight: 10 }}
                    />
                )
            })} />
        </Bookmark.Navigator>
    );
};

export default BookmarkStack;
