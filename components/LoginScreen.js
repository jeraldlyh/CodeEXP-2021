import React, { useState } from "react";
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

function LoginScreen({ navigation }) {
    const onLoginPressed = () => {
        console.log("loginBtnPressed")
    };
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    return (
        <View style={tailwind("flex-1 w-4/5 justify-center m-10")}>

            <TextInput theme={{ colors: { primary: "red" } }} style={tailwind(" border-b mb-10")}
                label="Email"
                textContentType="emailAddress"
                keyboardType="email-address" onChangeText={email => setEmail(email)}
            />
            <TextInput theme={{ colors: { primary: "red" } }}
                label="Password" onChangeText={password => setPassword(password)}
                secureTextEntry
            />

            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="login" mode="contained" onPress={onLoginPressed}>
                <Text >Login</Text>
            </Button>

            {/* Temporary Register button */}
            <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="login" mode="contained" onPress={() => navigation.navigate("Register")}>
                <Text >Register</Text>
            </Button>
        </View>
    );
}


export default LoginScreen;