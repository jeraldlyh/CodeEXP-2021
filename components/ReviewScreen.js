import React, { useContext, useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import { Button, Avatar } from "react-native-paper";
import tailwind from 'tailwind-rn';
import { addReview } from "../database/actions/User";
import { AuthContext } from "../provider/AuthContext";
import Description from "./Description";
import { v4 as uuidv4 } from "uuid";


function ReviewScreen({ reviews }) {
    const { avatar } = useContext(AuthContext);
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        if (reviews) {
            setReviewList(reviews)
        }
    }, [reviews]);


    

    const onSubmit = () => {
        const data = {
            review: {
                text: "very good user",
                rating: 5,
                user: "haha",
                avatar: avatar,
                ratedAt: new Date().getTime(),
                _id: uuidv4()
            },
            ratedUser: "haha",
        }
        addReview(data);
    }

    return (
        <View>
            <FlatList
                data={reviewList}
                numColumns={2}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    console.log(item.text)
                    return (
                        <View style={tailwind("flex flex-row w-full p-3 items-center")}>
                            <Avatar.Image source={{uri: item.avatar}} style={tailwind("mr-4")}/>
                            <View style={tailwind("flex flex-col pt-2 pb-2 justify-between")}>
                                <Description text={item.text} rating={item.rating}/>
                            </View>
                        </View>
                    )
                }}
            />
            <Button onPress={() => onSubmit()}>test</Button>
        </View>
    )
}

export default ReviewScreen;