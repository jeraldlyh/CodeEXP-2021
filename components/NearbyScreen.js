import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Image } from "react-native";
import { List } from "react-native-paper";
import tailwind from "tailwind-rn";
import { getNearbyShops } from "../database/actions/Shop";

function NearbyScreen() {
    const [nearbyShops, setNearbyShops] = useState([]);

    useEffect(() => {
        getNearbyShops().then(response => setNearbyShops(response))
    }, [])

    return (
        <View>
            {
                nearbyShops.length !== 0
                    ? (
                        <FlatList
                            data={nearbyShops}
                            keyExtractor={item => item.name}
                            renderItem={({ item }) => {
                                return (
                                    <List.Item
                                        title={item.name}
                                        description={item.location}
                                        left={() => <Image source={{ uri: item.img }}
                                            style={{ width: 60, height: 60 }} />}
                                        onPress={() => navigation.navigate("StoreInfo", { ...item })}
                                    />
                                )
                            }}
                        />
                    ) : (
                        <View style={tailwind("flex items-center justify-center w-full h-full")}><ActivityIndicator size="large" color="#fa3c4c" /></View>
                    )
            }
        </View>
    )
}

export default NearbyScreen;