import React, { useEffect, useState } from 'react';
import firebase from "../database/firebaseDB";
import { IconButton, Colors, List } from 'react-native-paper';
import { Text, View, FlatList, Image, ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';
const HawkerScreen = ({tempData, setItemData}) => {
    const [hawkerData, setHawkerData] = useState([]);
    useEffect(() => {
        console.log(tempData.length);
        // var newData = tempData.filter(item => {
        //             // const compareData = `${item.type.toUpperCase()}`;
        //             return item.type.toUpperCase() == "HAWKER";
        //         });
        //         setHawkerData(newData);

    }, []);
    // const hawkerViewFunction = () => {
    //     var newData = tempData.filter(item => {
    //         const compareData = `${item.type.toUpperCase()}`;
    //         return compareData.indexOf("HAWKER") > -1;
    //     });
    //     setItemData(newData);
    // }
    return ( 
        <View>
        <FlatList
            data={tempData}
            keyExtractor={item => item._id}
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
 
export default HawkerScreen;