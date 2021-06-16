import React, { useState } from "react";
import { TabView } from "react-native-tab-view";
import AllScreen from "./AllScreen";
import HawkerScreen from "./HawkerScreen";
import ShopScreen from "./ShopScreen";

const LandingPageTab = ({ itemData }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "All" },
        { key: "second", title: "Hawker" },
        { key: "third", title: "Shop" },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return <AllScreen itemData={itemData}></AllScreen>;
            case "second":
                return <HawkerScreen itemData={itemData}></HawkerScreen>;
            case "third":
                return <ShopScreen itemData={itemData}></ShopScreen>;
            default:
                return null;
        }
    }
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
        />
    );
}

export default LandingPageTab;