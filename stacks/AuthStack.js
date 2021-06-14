import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";

const Auth = createStackNavigator()

const AuthStack = () => {
    return (
        <Auth.Navigator screenOptions={{ headerShown: false }}>
            <Auth.Screen name="Login" component={LoginScreen} />
            <Auth.Screen name="Register" component={RegisterScreen} />
        </Auth.Navigator>
    )
}

export default AuthStack;