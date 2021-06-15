import React, { useState, useEffect } from "react";
import { IconButton, Colors, Searchbar, List } from "react-native-paper";
import { Text, View, FlatList, Image } from "react-native";
import tailwind from "tailwind-rn";
import firebase from "../database/firebaseDB";

const BookmarkScreen = ({ navigation }) => {
  const [itemData, setItemData] = React.useState("");

  return (
      <View>
        <FlatList
          data={itemData}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={item.name}
                description={item.location}
                left={() => (
                  <Image
                    source={{
                      uri: item.img
                    }}
                    style={{ width: 60, height: 60 }}
                  />
                )}
                onPress={() => navigation.navigate("StoreInfo", { ...item })}
              />
            );
          }}
        />
      </View>
  );
};

export default BookmarkScreen;
