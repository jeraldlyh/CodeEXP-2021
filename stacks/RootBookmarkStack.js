import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../provider/AuthContext';
import AuthStack from './AuthStack';
import BookmarkStack from './BookmarkStack';

const RootBookmark = createStackNavigator();

const RootBookmarkStack = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <RootBookmark.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#ff8b94" }, headerTintColor: "#ffffff" }}>
            {
                isLoggedIn
                    ? <RootBookmark.Screen name="Profile" component={BookmarkStack} />
                    : <RootBookmark.Screen name="Auth" component={AuthStack} />
            }
        </RootBookmark.Navigator>
    );
}

export default RootBookmarkStack;