import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import { Icon } from "react-native-elements";


function Description({ text, rating }) {
    const [showText, setShowText] = useState(false);

    const formatText = (text) => {
        return text.substr(0, 45) + "...";
    };

    const populateRating = (rating) => {
        const stars = [];
        for (var i = 0; i < rating; i++) {
            stars.push(<Icon key={i} name="star" size={20} />);
        };

        for (var i = 0; i < 5 - rating; i++) {
            stars.push(<Icon key={5 * i} name="star-border" />);
        };

        return stars;
    };

    return (
        <View style={tailwind("flex flex-row")}>
            {
                text.length > 45
                    ? (
                        <View style={tailwind("w-9/12 flex-grow")} >
                            <Text style={tailwind("text-gray-800")}>{showText ? text : formatText(text)}</Text>
                            <View style={tailwind("flex justify-center")}>
                                <View style={tailwind("flex flex-row items-center")}>
                                    { populateRating(rating) }

                                        <TouchableOpacity 
                                            style={showText ? tailwind("ml-36") : tailwind("ml-28")}
                                            onPress={() => setShowText(!showText)}
                                        >
                                            <Text style={tailwind("text-xs text-gray-700")}>
                                                { showText ? "Hide" : "Show more"}
                                            </Text>
                                        </TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                    )
                    : (
                        <View>
                            <Text style={tailwind("text-gray-800")}>{text}</Text>
                            <View style={tailwind("flex flex-row")}>
                                { populateRating(rating) }
                            </View>
                        </View>
                    )
            }
        </View>
    )
}

export default Description;