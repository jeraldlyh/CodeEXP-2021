import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Title, Button, TextInput, Provider, DefaultTheme } from 'react-native-paper';

const AddShopScreen = () => {

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: 'red'
        },
    };
    return (<Provider theme={theme}>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Title style={{ textAlign: "center", color: "black" }}>Add Shop</Title>

                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Name"
                    onChangeText={name => setName(name)}
                />
                <TextInput theme={{ colors: { primary: "red" } }}
                    label="Name"
                    onChangeText={name => setName(name)}
                />
                <Button
                    style={{ height: 40, margin: "2%", padding: "1%", marginTop: "2%" }}
                    mode="contained"
                    raised
                    theme={{ colors: { primary: "red" } }}
                    onPress={() => submitOrder()}
                >
                    
                    Submit Order
                </Button>
            </ScrollView>
        </SafeAreaView>
    </Provider>);
}

export default AddShopScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        width: '45%',
        margin: '2%',
    }
});