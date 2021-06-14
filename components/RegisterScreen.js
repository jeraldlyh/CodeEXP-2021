import React, { useState, useContext } from "react";
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { registerUser } from "../database/actions/User";
import { AuthContext } from "../provider/AuthContext";

function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const { setIsLoggedIn } = useContext(AuthContext);


    const onSignUpPressed = () => {
        registerUser(name, email, password)
            .then(response => {
                setIsLoggedIn(true);
                navigation.popToTop();
            });
        // navigation.navigate('Dashboard');
    };
    return (
        <View style={tailwind("flex-1 w-4/5 justify-center m-10")}>
            <TextInput theme={{ colors: { primary: "red" } }} style={tailwind(" border-b mb-10")}
                label="Name"
                onChangeText={name => setName(name)}
            />
            <TextInput theme={{ colors: { primary: "red" } }} style={tailwind(" border-b mb-10")}
                label="Email"
                textContentType="emailAddress"
                keyboardType="email-address" onChangeText={email => setEmail(email)}
            />

            <TextInput theme={{ colors: { primary: "red" } }} style={tailwind(" border-b mb-5")}
                label="Password" onChangeText={password => setPassword(password)}
                secureTextEntry
            />
            <Button labelStyle={tailwind("text-white text-lg")} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="account-plus" mode="contained" onPress={onSignUpPressed}>
                <Text>Register</Text>
            </Button>

            <View>
                <Text>Already have an account? </Text>
                {/* <TouchableOpacity >
                    <Button labelStyle={{ color: "white", fontSize: 15 }} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="login" mode="contained" onPress={() => navigation.navigate('Login')}>
                        <Text >Login</Text>
                    </Button>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

export default RegisterScreen;