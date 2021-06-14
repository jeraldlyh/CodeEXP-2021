import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
import tailwind from 'tailwind-rn';

const Stack = createStackNavigator();

function ProfileScreen({ navigation }) {

    return (
        <View>
            <Button labelStyle={{ color: "black", fontSize: 15 }} style={tailwind("border-gray-400 border-b bg-white")} icon="login" mode="contained" onPress={() => navigation.navigate("Login")}>
                <Text >Login</Text>
            </Button>
            <Button labelStyle={{ color: "black", fontSize: 15, borderBottomColor: "1px solid black" }} style={tailwind("border-1 border-solid border-red-500 bg-white")} icon="account-plus" mode="contained" onPress={() => navigation.navigate("Register")}>
                <Text >Register</Text>
            </Button>
            <Button labelStyle={{ color: "black", fontSize: 15, borderBottomColor: "1px solid black" }} style={tailwind("border-1 border-solid border-red-500 bg-white")} icon="settings" mode="contained" onPress={() => navigation.navigate("Settings")}>
                <Text >Settings</Text>
            </Button>
        </View>
    );
}
function LoginScreen({ navigation }) {
    const onLoginPressed = () => {
        console.log("loginBtnPressed")
        // navigation.navigate('Dashboard');
    };
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput theme={{ colors: { primary: 'red', underlineColor: 'transparent', } }} outlineColor="white" style={{ borderBottom: "2px solid black ", marginBottom: "10px", backgroundColor: "white" }}
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput theme={{ colors: { primary: 'red', underlineColor: 'transparent', } }} outlineColor="white" style={{ borderBottom: "2px solid black ", marginBottom: "10px", backgroundColor: "white" }}
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button labelStyle={{ color: "white", fontSize: 15 }} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="login" mode="contained" onPress={onLoginPressed}>
                <Text >Login</Text>
            </Button>

            <View>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity>
                    <Button labelStyle={{ color: "white", fontSize: 15 }} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="account-plus" mode="contained" onPress={() => navigation.navigate('Register')}>
                        <Text >Register</Text>
                    </Button>
                </TouchableOpacity>
            </View>
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput theme={{ colors: { primary: 'red', underlineColor: 'transparent', } }} outlineColor="white" style={{ borderBottom: "2px solid black ", marginBottom: "10px", backgroundColor: "white" }}
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />

            <TextInput theme={{ colors: { primary: 'red', underlineColor: 'transparent', } }} outlineColor="white" style={{ borderBottom: "2px solid black ", marginBottom: "10px", backgroundColor: "white" }}
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput theme={{ colors: { primary: 'red', underlineColor: 'transparent', } }} outlineColor="white" style={{ borderBottom: "2px solid black ", marginBottom: "10px", backgroundColor: "white" }}
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <Button labelStyle={{ color: "white", fontSize: 15 }} style={tailwind("border-gray-400 border-b bg-red-500 m-3")} icon="account-plus" mode="contained" onPress={onSignUpPressed}>
                <Text >Register</Text>
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
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                Press me
            </Button>
        </View>
    );
}
const ProfileStack = () => {
    return (<React.Fragment>
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    </React.Fragment>);
}

export default ProfileStack;