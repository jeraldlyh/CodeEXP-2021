import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';



function ListingScreen({ listing }) {
    return (
        <View style={tailwind("bg-black")}>
            <Text>Listing</Text>
        </View>
    )
}

export default ListingScreen;