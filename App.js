import React, { useContext } from 'react';
import tailwind from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { View } from 'react-native';
// import RootProfileStack from './stacks/RootProfileStack';
import AuthContextProvider from "./provider/AuthContext"
import TabStack from './stacks/TabStack';
import { createStackNavigator } from "@react-navigation/stack";
import StoreInfo from "./components/StoreInfo";

export default function App() {
    // const [index, setIndex] = React.useState(0);
    // const [routes] = React.useState([
    //     { key: 'home', title: 'Home', icon: 'home' },
    //     { key: 'bookmarks', title: 'Bookmarks', icon: 'bookmark' },
    //     { key: 'chat', title: 'Chat', icon: 'chat' },
    //     { key: 'profile', title: 'Profile', icon: 'account' },
    // ]);

    // const renderScene = BottomNavigation.SceneMap({
    //     home: LandingPageTabs,
    //     bookmarks: LandingPageTabs,
    //     chat: LandingPageTabs,
    //     profile: RootProfileStack,

    // });

    const Stack = createStackNavigator();

    return (
        <AuthContextProvider>
            <NavigationContainer>
                {/* <View>
                    <Appbar.Header style={tailwind("bg-red-500")}>
                        <Appbar.BackAction onPress={() => {}} />
                        <Appbar.Content titleStyle={{ textAlign: "center" }} color="white" title="RedDot" />
                    </Appbar.Header>
                </View> */}
                <TabStack />
                {/* <BottomNavigation barStyle={{ backgroundColor: 'red' }}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                /> */}
            </NavigationContainer>
        </AuthContextProvider>
    );
}
