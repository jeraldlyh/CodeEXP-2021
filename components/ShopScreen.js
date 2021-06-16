import React, {useEffect, useState} from 'react';
import { Text, View, FlatList, Image, ScrollView } from 'react-native';

const ShopScreen = ({tempData}) => {
    const [shopData, setShopData] = useState('');
    useEffect(() => {
        console.log(tempData);
        // var newData = tempData.filter(item => {
        //     const compareData = `${item.type.toUpperCase()}`;
        //     return compareData.indexOf("SHOP") > -1;
        // });
        setShopData(newData);
        
    }, []);
    return ( <View>
        <FlatList
            data={shopData}
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
    </View> );
}
 
export default ShopScreen;