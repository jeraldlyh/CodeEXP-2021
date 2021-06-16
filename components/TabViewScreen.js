import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ListingScreen from './ListingScreen';
import ReviewScreen from './ReviewScreen';

function TabViewScreen(props) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "Listings" },
        { key: "second", title: "Reviews" },
    ]);

    // const renderScene = SceneMap({
    //     first: ListingScreen,
    //     second: ReviewScreen
    // });

    const renderScene = ({ route }) => {
        switch(route.key) {
            case "first":
                return <ListingScreen listings={props.listings} />;
            case "second":
                return <ReviewScreen reviews={props.reviews} />;
            default:
                return null;
        }
    }

    

    return (
        <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props => <TabBar {...props} style={{backgroundColor: "tomato"}} indicatorStyle={{ backgroundColor: "grey" }}/>}
        />
    );
};

export default TabViewScreen;