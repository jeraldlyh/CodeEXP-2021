import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../provider/AuthContext';
import AuthStack from './AuthStack';
import ChatStack from './ChatStack';

const RootChat = createStackNavigator();

const RootChatStack = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <RootChat.Navigator screenOptions={{ headerShown: false }}>
            {
                isLoggedIn
                    ? <RootChat.Screen name="Profile" component={ChatStack} />
                    : <RootChat.Screen name="Auth" component={AuthStack} />
            }
        </RootChat.Navigator>
    );
}

export default RootChatStack;