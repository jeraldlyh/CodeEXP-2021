import React, { useState } from "react";
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';


function SettingScreen({ navigation }) {
    const [oldpassword, setOldpassword] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    return (
        <View style={tailwind("flex-1 w-4/5 justify-center m-10")}>
            <TextInput theme={{ colors: { primary: "red" } }} style={tailwind(" border-b mb-10")}
                label="Old Password" onChangeText={password => setOldpassword(password)}
                secureTextEntry
            />
            <TextInput theme={{ colors: { primary: "red" } }} style={tailwind(" border-b mb-10")}
                label="New Password" onChangeText={password => setPassword(password)}
                secureTextEntry
            />
            <TouchableOpacity >
                <Button labelStyle={{ color: "white", fontSize: 15 }} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="content-save" mode="contained" onPress={() => {}}>
                    <Text >Change Password</Text>
                </Button>
            </TouchableOpacity>
        </View>
    );
}

export default SettingScreen;