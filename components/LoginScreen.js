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

    const { setUsername } = useContext(AuthContext);

    const onLoginPressed = () => {
        loginUser(email, password)
            .then(response => {
                setUsername(response);
            })
            .catch(error => {
                setError(error.toString().split(":")[1].substr(1));
            })
    };

    return (
        <View style={tailwind("flex-1 w-4/5 m-10")}>
            <Text style={tailwind("text-4xl text-black text-center font-bold mb-20 mt-5")}>LOGIN</Text>
            <Text style={tailwind("text-center mb-5 text-red-500")}>{error}</Text>

            <View style={tailwind("flex ")}>
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
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <View style={tailwind("flex flex-row justify-around mt-5")}>
                <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 w-2/5")} mode="contained" onPress={onLoginPressed}>
                    <Text >Login</Text>
                </Button>

                {/* Temporary Register button */}
                <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 w-2/5")} mode="contained" onPress={() => navigation.push("Register")}>
                    <Text >Register</Text>
                </Button>
            </View>
        </View>
    );
}


export default LoginScreen;