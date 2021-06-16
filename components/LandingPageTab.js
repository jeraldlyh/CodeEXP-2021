import React, { useState } from "react";
import { TabView } from "react-native-tab-view";
import { Text, View, FlatList, Image, ScrollView } from 'react-native';
import AllScreen from "./AllScreen";
import HawkerScreen from "./HawkerScreen";
import ShopScreen from "./ShopScreen";
const LandingPageTab = ({tempData, setItemData, itemData, setTempData, hawkerData}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "All" },
        { key: "second", title: "Hawker" },
        { key: "third", title: "Reviews" },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return <AllScreen setItemData={setItemData} tempData={tempData} setTempData={setTempData} itemData={itemData}></AllScreen>;
            case "second":
                return <HawkerScreen tempData={tempData} setItemData={setItemData}></HawkerScreen>;
            // case "third":
            //     return <ShopScreen tempData={tempData}></ShopScreen>;
            default:
                return null;
        }
    }
    return (<TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
    />);
}

export default LandingPageTab;