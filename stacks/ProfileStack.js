import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import SettingScreen from "../components/SettingScreen";
import ProfileScreen from '../components/ProfileScreen';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';


const Profile = createStackNavigator()

const ProfileStack = () => {
    return (
        <Profile.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "red" }, headerTintColor: "white" }}>
            <Profile.Screen name="Profile" component={ProfileScreen} />
            <Profile.Screen name="Login" component={LoginScreen} />
            <Profile.Screen name="Register" component={RegisterScreen} />
            <Profile.Screen name="Settings" component={SettingScreen} />
        </Profile.Navigator>
    )
}

export default ProfileStack;