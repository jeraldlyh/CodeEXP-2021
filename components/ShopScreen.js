import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { View, FlatList, Image } from 'react-native';

const ShopScreen = ({ navigation, itemData }) => {
    const [shopData, setShopData] = useState([]);

    useEffect(() => {
        if (itemData) {
            var newData = itemData.filter(item => {
                return item.type.toUpperCase().trim() === "SHOP";
            });
            setShopData(newData);
        }

    }, [itemData]);

    return ( 
        <View>
            <FlatList
                data={shopData}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <List.Item
                            title={item.name}
                            style={{ borderBottomWidth: 0.5, borderBottomColor: "#fa3c4c" }}
                            description={item.location}
                            left={() => <Image source={{ uri: item.img }}
                                style={{ width: 60, height: 60 }} />}
                            onPress={() => navigation.navigate("StoreInfo", { ...item })}
                        />
                    )
                }}
            />
        </View> );
}

export default React.memo(ShopScreen);