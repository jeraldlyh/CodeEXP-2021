import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { tailwind } from "tailwind-rn"

function ChatScreen() {
    return (
        <View>
            <View style={tailwind("h-3/5 bg-red-100")}>

            </View>
            <TextInput style={tailwind("h-2/5 bg-red-100")}></TextInput>
        </View>
    )
}