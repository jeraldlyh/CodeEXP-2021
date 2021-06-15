import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';


function ReviewScreen() {
    return (
        <View style={tailwind("bg-red-500")}>
            <Text>ReviewScreen</Text>
        </View>
    )
}

export default ReviewScreen;