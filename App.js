import { StatusBar } from 'expo-status-bar';
import React from 'react';
import tailwind from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import LandingPageTabs from './components/landingpagetabs';
import firebase from "./database/firebaseDB"
import Profile from './components/profile';

export default function App() {
    
    firebase.firestore().collection("testing").add({
        title: "test",
        body: "haha"
    })
    const styles = StyleSheet.create({
        textAlign: "center"
    })
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'bookmarks', title: 'Bookmarks', icon: 'bookmark' },
        { key: 'chat', title: 'Chat', icon: 'chat' },
        { key: 'profile', title: 'Profile', icon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: LandingPageTabs,
        bookmarks: LandingPageTabs,
        chat: LandingPageTabs,
        profile: Profile,

    });

    return (
        // <React.Fragment>
            <NavigationContainer>
                <View>
                    <Appbar.Header style={tailwind("bg-red-500")}>
                        <Appbar.Content titleStyle={{ textAlign: "center" }} color="white" title="RedDot" />
                    </Appbar.Header>


                </View>
                <BottomNavigation barStyle={{ backgroundColor: 'red' }}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </NavigationContainer>
            
        // </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
