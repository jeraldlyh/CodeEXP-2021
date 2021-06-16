import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../provider/AuthContext';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';

const RootProfile = createStackNavigator();

const RootProfileStack = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <RootProfile.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#ff8b94" }, headerTintColor: "#ffffff" }}>
            {
                isLoggedIn
                    ? <RootProfile.Screen name="Profile" component={ProfileStack} />
                    : <RootProfile.Screen name="Auth" component={AuthStack} />
            }
        </RootProfile.Navigator>
    );
}

export default RootProfileStack;