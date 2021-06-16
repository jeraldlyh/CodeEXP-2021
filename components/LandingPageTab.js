import React, { useState } from "react";
import { TabView, TabBar } from "react-native-tab-view";
import AllScreen from "./AllScreen";
import HawkerScreen from "./HawkerScreen";
import ShopScreen from "./ShopScreen";
import { useNavigation } from "@react-navigation/native";

const LandingPageTab = ({ itemData }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "All" },
        { key: "second", title: "Hawker" },
        { key: "third", title: "Shop" },
    ]);

    const navigation = useNavigation();

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return <AllScreen navigation={navigation} itemData={itemData}></AllScreen>;
            case "second":
                return <HawkerScreen navigation={navigation} itemData={itemData}></HawkerScreen>;
            case "third":
                return <ShopScreen navigation={navigation} itemData={itemData}></ShopScreen>;
            default:
                return null;
        }
    }
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => <TabBar {...props} style={{backgroundColor: "#ff6976"}} indicatorStyle={{ backgroundColor: "grey" }}/>}
        />
    );
}

export default LandingPageTab;