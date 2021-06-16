import React, { useState, useContext } from "react";
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { registerUser } from "../database/actions/User";
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={tailwind("flex-1 w-4/5 m-10 justify-center")}>
                <Text style={tailwind("text-center mb-5")}>Register for a new account.</Text>
                <Text style={tailwind("text-center mb-5 text-red-500")}>{error}</Text>
                <View>
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        label="Name"
                        onChangeText={name => setName(name)}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        label="Email"
                        textContentType="emailAddress"
                        keyboardType="email-address" onChangeText={email => setEmail(email)}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        label="Password" onChangeText={password => setPassword(password)}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Already have an account? </Text>
                </TouchableOpacity>

                <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="account-plus" mode="contained" raised theme={{ colors: { primary: "#fa3c4c" } }} onPress={onSignUpPressed}>
                    <Text>Create my account</Text>
                </Button>

            </View>
        </TouchableWithoutFeedback>
    );
}

export default RegisterScreen;