import React, { useState, useContext } from "react";
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { loginUser } from "../database/actions/User";
import { AuthContext } from "../provider/AuthContext";

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setUsername, setIsLoggedIn } = useContext(AuthContext);

    const onLoginPressed = () => {
        loginUser(email, password)
            .then(response => {
                setUsername(response);
                setIsLoggedIn(true);
                navigation.popToTop();
            })
            .catch(error => {
                console.log(error)
                setError(error.toString().split(":")[1].substr(1));
            })
    };

    return (
        <View style={tailwind("flex-1 w-4/5 m-10 content-center justify-center")}>
            <Text style={tailwind("text-center mb-5")}>Please login first.</Text>
            <Text style={tailwind("text-center mb-5 text-red-500")}>{error}</Text>

            <View style={tailwind("flex ")}>
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
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <View style={tailwind("flex flex-row justify-around mt-5")}>
                <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b w-5/12")} mode="contained" raised theme={{ colors: { primary: "#fa3c4c" } }} onPress={onLoginPressed}>
                    <Text >Login</Text>
                </Button>

                {/* Temporary Register button */}
                <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b w-5/12")} mode="contained" raised theme={{ colors: { primary: "#fa3c4c" } }} onPress={() => navigation.push("Register")}>
                    <Text >Register</Text>
                </Button>
            </View>
        </View>
    );
}


export default LoginScreen;