import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookmarkScreen from "../components/BookmarkScreen";
import StoreInfo from "../components/StoreInfo";
import AddOrder from "../components/AddOrder";

const Bookmark = createStackNavigator();

const BookmarkStack = () => {
  return (
    <Bookmark.Navigator screenOptions={{ headerShown: false }}>
      <Bookmark.Screen name="Bookmark" component={BookmarkScreen} />
      <Bookmark.Screen name="StoreInfo" component={StoreInfo} />
      <Bookmark.Screen name="AddOrder" component={AddOrder} />
    </Bookmark.Navigator>
  );
};

export default BookmarkStack;
