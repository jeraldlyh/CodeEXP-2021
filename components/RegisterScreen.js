import React, { useState, useContext } from "react";
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { registerUser } from "../database/actions/user";
import { AuthContext } from "../provider/AuthContext";

function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [error, setError] = useState("");
    const { setIsLoggedIn, setUsername } = useContext(AuthContext);

    const onSignUpPressed = () => {
        registerUser(name, email, password)
            .then(response => {
                setIsLoggedIn(true);
                setUsername(response);
                navigation.navigate("Profile", { screen: "Profile" });
            })
            .catch(error => {
                setError(error.toString().split(":")[1].substr(1));
            })
    };

    return (
        <View style={tailwind("flex-1 w-4/5 m-10")}>
            <Text style={tailwind("text-4xl text-black text-center font-bold mb-20 mt-5")}>REGISTER</Text>
            <Text style={tailwind("text-center mb-5 text-red-500")}>{error}</Text>
            <View>
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Name"
                    onChangeText={name => setName(name)}
                />
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Email"
                    textContentType="emailAddress"
                    keyboardType="email-address" onChangeText={email => setEmail(email)}
                />
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Password" onChangeText={password => setPassword(password)}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Already have an account? </Text>
            </TouchableOpacity>

            <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="account-plus" mode="contained" onPress={onSignUpPressed}>
                <Text>Create my account</Text>
            </Button>

        </View>
    );
}

export default RegisterScreen;