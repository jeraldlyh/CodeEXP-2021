import React, { useState, useContext } from "react";
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { loginUser } from "../database/actions/User";
import { AuthContext } from "../provider/AuthContext";

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [error, setError] = useState("");

    const { setUsername, setIsLoggedIn } = useContext(AuthContext);

    const onLoginPressed = () => {
        loginUser(email, password)
            .then(response => {
                setUsername(response);
                setIsLoggedIn(true);
                navigation.navigate("Profile", { screen: "Profile" });
            })
            .catch(error => {
                setError(error.toString().split(":")[1].substr(1));
            })
    };

    return (
        <View style={tailwind("flex-1 w-4/5 m-10")}>
            <Text style={tailwind("text-center mb-5 text-red-500")}>{error}</Text>

            <View style={tailwind("flex ")}>
                <TextInput theme={{ colors: { primary: "#ff8b94" } }}
                    label="Email"
                    textContentType="emailAddress"
                    keyboardType="email-address" onChangeText={email => setEmail(email)}
                />
                <TextInput theme={{ colors: { primary: "#ff8b94" } }}
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
                <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b w-5/12")} mode="contained" raised theme={{ colors: { primary: "#ff8b94" } }} onPress={onLoginPressed}>
                    <Text >Login</Text>
                </Button>

                {/* Temporary Register button */}
                <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b w-5/12")} mode="contained" raised theme={{ colors: { primary: "#ff8b94" } }} onPress={() => navigation.push("Register")}>
                    <Text >Register</Text>
                </Button>
            </View>
        </View>
    );
}


export default LoginScreen;