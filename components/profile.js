import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
import tailwind from 'tailwind-rn';

const Stack = createStackNavigator();

function ProfileScreen({ navigation }) {

    return (
        <View>
            <Button style={tailwind("border-b-2 border-t border-gray-400 bg-white text-black")} labelStyle={tailwind("text-black")} icon="login" mode="contained" onPress={() => navigation.navigate("Login")}>
                <Text style={tailwind("text-black")}>Login</Text>
            </Button>
            <Button style={tailwind("border-b-2 border-gray-400 bg-white text-black")} labelStyle={tailwind("text-black")} icon="account-plus" mode="contained" onPress={() => navigation.navigate("Register")}>
                <Text >Register</Text>
            </Button>
            <Button style={tailwind("border-b-2 border-gray-400 bg-white text-black")} labelStyle={tailwind("text-black")} icon="cog" mode="contained" onPress={() => navigation.navigate("Settings")}>
                <Text >Settings</Text>
            </Button>
        </View>
    );
}
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
        </View>
    );
}
function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const onSignUpPressed = () => {
        console.log("registerbtn pressed")

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
                <TouchableOpacity >
                    <Button labelStyle={{ color: "white", fontSize: 15 }} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="login" mode="contained" onPress={() => navigation.navigate('Login')}>
                        <Text >Login</Text>
                    </Button>
                </TouchableOpacity>
            </View>
        </View>
    );
}
function SettingsScreen({ navigation }) {
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
const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

export default ProfileStack;