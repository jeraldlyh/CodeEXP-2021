import React, { useState, useEffect } from "react";
import { View, FlatList } from 'react-native';
import { Avatar } from "react-native-paper";
import tailwind from 'tailwind-rn';
import Description from "./Description";



function ReviewScreen({ reviews }) {
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        if (reviews) {
            setReviewList(reviews)
        }
    }, [reviews]);

    return (
        <View>
            <FlatList
                data={reviewList}
                numColumns={2}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={[{ borderBottomWidth: 0.5, borderBottomColor: "#fa3c4c" }, tailwind("flex flex-row w-full p-3 items-center")]}>
                            <Avatar.Image source={{ uri: item.avatar }} style={tailwind("mr-4")} />
                            <View style={tailwind("flex flex-col pt-2 pb-2 justify-between")}>
                                <Description text={item.text} rating={item.rating} />
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default ReviewScreen;