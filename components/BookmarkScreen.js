import React, { useState, useEffect, useContext } from "react";
import { Searchbar, List } from "react-native-paper";
import { Text, View, FlatList, Image } from "react-native";
import { AuthContext } from "../provider/AuthContext";
import { getUserProfile } from "../database/actions/User";
import { getShopByName } from "../database/actions/Shop";

const BookmarkScreen = ({ navigation }) => {
    const [bookmark, setBookmark] = useState([]);

    const { username } = useContext(AuthContext);

    const getAllShops = async (bookmarks) => {
        const shopData = await Promise.all(bookmarks.map(async (bookmark) => {
            const data = await getShopByName(bookmark)
            return data;
        }));
        return shopData;
    }

    useEffect(() => {
        getUserProfile(username)
            .then(response => {
                getAllShops(response.bookmarks)
                    .then(data => setBookmark(data))
            })
    }, [])

    return (
        <View>
            {
                bookmark.length !== 0
                    ? (
                        <FlatList
                            data={bookmark}
                            keyExtractor={(item, index) => index.toString()}
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
                    )
                    : (
                        <View><Text>No bookmarks</Text></View>
                    )
            }

        </View>
    );
};

export default BookmarkScreen;
