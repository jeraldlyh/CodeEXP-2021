import React, { useState, useEffect } from "react";
import tailwind from 'tailwind-rn';
import { Text, View  } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
    const [userProfile, setUserProfile] = useState("");

    return (
        <View>
            <Button style={tailwind("border-b-2 border-t-2 border-gray-400 bg-white text-black")} labelStyle={tailwind("text-black")} icon="login" mode="contained" onPress={() => navigation.navigate("Login")}>
                <Text>Login</Text>
            </Button>
            <Button style={tailwind("border-b-2 border-gray-400 bg-white text-black")} labelStyle={tailwind("text-black")} icon="account-plus" mode="contained" onPress={() => navigation.navigate("Register")}>
                <Text>Register</Text>
            </Button>
            <Button style={tailwind("border-b-2 border-gray-400 bg-white text-black")} labelStyle={tailwind("text-black")} icon="cog" mode="contained" onPress={() => navigation.navigate("Settings")}>
                <Text>Settings</Text>
            </Button>
        </View>
    );
}