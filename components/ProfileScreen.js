import React, { useState, useContext, useEffect } from "react";
import tailwind from 'tailwind-rn';
import { Text, View } from 'react-native';
import { Icon } from "react-native-elements";
import moment from "moment";
import { AuthContext } from "../provider/AuthContext";
import TabViewScreen from "./TabViewScreen";
import { getUserProfile } from "../database/actions/User";
import { IconButton } from "react-native-paper";
import { Avatar } from "react-native-paper";
import _ from "lodash";


export default function ProfileScreen({ navigation }) {
    const [userProfile, setUserProfile] = useState("");
    const { username, setAvatar, setBookmarks, setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        getUserProfile(username).then(response => {
            setUserProfile(response);
            setAvatar(response.avatar);
            setBookmarks(response.bookmarks)
        })
    }, []);

    const getTotalRating = (reviews) => {
        if (reviews) {
            var totalRating = _.sumBy(reviews, function(r) { return r.rating });
            totalRating = Math.ceil(totalRating / reviews.length);
    
            return totalRating;
        }
        return 0;
    }

    const populateRating = (totalRating) => {
        const stars = [];

        for (var i = 0; i < totalRating; i++) {
            stars.push(<Icon key={i} name="star" size={20} />);
        };

        for (var i = 0; i < 5 - totalRating; i++) {
            stars.push(<Icon key={5 * i} name="star-border" />);
        };

        return stars;
    };

    const formatJoinedDate = (date) => {
        return "Joined " + moment(date).fromNow();
    };

    const logoutUser = () => {
        setIsLoggedIn(false);
        // navigation.navigate("Login", { logoutMessage: "You have successfully logged out! 😀" });
        navigation.navigate("Login");
    }

    return (
        <View style={tailwind("flex-1")}>
            <View style={tailwind("flex m-5")}>
                <View style={tailwind("flex flex-row items-center")}>
                    <Avatar.Image source={{ uri: userProfile.avatar }} style={tailwind("mr-4")} />
                    <View style={tailwind("flex flex-col")}>
                        <Text style={tailwind("font-bold text-lg")}>@{username}</Text>
                        <View style={tailwind("flex flex-row items-center")}>
                            {populateRating(getTotalRating(userProfile.reviews))}
                            <Text style={tailwind("ml-1")}>({getTotalRating(userProfile.reviews)}.0)</Text>
                        </View>
                        <Text>{formatJoinedDate(userProfile.registeredAt)}</Text>
                    </View>
                    <IconButton icon="logout" size={40} onPress={() => logoutUser()} color="#fa3c4c" style={tailwind("ml-16")} />
                </View>
            </View>
            <TabViewScreen listings={userProfile.listings} reviews={userProfile.reviews} />
        </View>
    );
};