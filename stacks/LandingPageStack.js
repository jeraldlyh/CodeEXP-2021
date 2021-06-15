import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPageScreen from "../components/LandingPageScreen";
import StoreInfo from "../components/StoreInfo";

const Landing = createStackNavigator();

const LandingPageStack = () => {
  return (
    <Landing.Navigator screenOptions={{ headerShown: false }}>
      <Landing.Screen name="Home" component={LandingPageScreen} />
      <Landing.Screen name="StoreInfo" component={StoreInfo} />
    </Landing.Navigator>
  );
};

export default LandingPageStack;
