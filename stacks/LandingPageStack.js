import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPageScreen from "../components/LandingPageScreen";
import StoreInfo from "../components/StoreInfo";
import AddOrder from "../components/AddOrder";

const Landing = createStackNavigator();

const LandingPageStack = () => {
  return (
    <Landing.Navigator >
      <Landing.Screen name="Home" options={{ headerShown: false   }}component={LandingPageScreen} />
      <Landing.Screen name="StoreInfo" component={StoreInfo}options={({ route }) => ({ title: route.params.name })}/>
      <Landing.Screen name="AddOrder" component={AddOrder} />
    </Landing.Navigator>
  );
};

export default LandingPageStack;
