import React, { useState, useContext, useEffect } from "react";
import tailwind from 'tailwind-rn';
import { Text, View } from 'react-native';
import { Icon } from "react-native-elements";
import moment from "moment";
import { AuthContext } from "../provider/AuthContext";
import TabViewScreen from "./TabViewScreen";
import { getUserProfile } from "../database/actions/User";

export default function ProfileScreen({ navigation }) {
    const [userProfile, setUserProfile] = useState("");
    const { username, setAvatar, setBookmarks } = useContext(AuthContext);

    useEffect(() => {
        getUserProfile(username).then(response => {
            setUserProfile(response);
            setAvatar(response.avatar);
            setBookmarks(response.bookmarks)
        })
    }, []);

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

    const formatJoinedDate = (date) => {
        return "Joined " + moment(date).fromNow();
    };

    return (
        <View style={tailwind("flex-1")}>
            <View style={tailwind("flex m-5")}>
                <Text style={tailwind("font-bold text-lg")}>@jerald</Text>
                <View style={tailwind("mt-2 flex flex-row items-center")}>
                    <Text style={tailwind("mr-1")}>{userProfile.ratings}.0</Text>
                    {populateRating(userProfile.ratings)}
                    <Text style={tailwind("ml-5")}>{formatJoinedDate(userProfile.registeredAt)}</Text>
                </View>
            </View>
            <TabViewScreen listings={userProfile.listings} reviews={userProfile.reviews}/>
        </View>
    );
};