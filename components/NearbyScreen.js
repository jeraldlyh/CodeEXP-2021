import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image } from "react-native";
import { List } from "react-native-paper";
import { getNearbyShops } from "../database/actions/Shop";

function NearbyScreen() {
    const [nearbyShops, setNearbyShops] = useState([]);

    useEffect(() => {
        // getNearbyShops()
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
                        <View><Text>no data</Text></View>
                    )
            }
        </View>
    )
}

export default NearbyScreen;