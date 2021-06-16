import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Button, TextInput, Provider, DefaultTheme } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Rating } from 'react-native-elements';
import { addReview } from '../database/actions/User';
import { v4 as uuidv4 } from "uuid";


const UserReviewScreen = ({ navigation, route }) => {
    const [reviewText, setReviewText] = useState("");
    const [ratings, setRatings] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const { ratedUser, voteUser, voteAvatar } = route.params;

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#fa3c4c'
        },
    };

    const ratingCompleted = (rating) => {
        setRatings(rating);
    }

    const submitRating = () => {
        const data = {
            review: {
                text: reviewText,
                rating: ratings,
                user: voteUser,
                avatar: voteAvatar,
                ratedAt: new Date().getTime(),
                _id: uuidv4()
            },
            ratedUser: ratedUser
        }
        console.log(data)
        addReview(data)
            .then(response => {
                if (response) {
                    setShowAlert(true);
                }
            })
    }


    return (
        <Provider theme={theme}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <AwesomeAlert
                        contentContainerStyle={{ width: Dimensions.get('window').width }}
                        show={showAlert}
                        showProgress={false}
                        title="Reviews"
                        message={`You have just rated ${ratedUser} ${ratings} stars! 😊`}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#fa3c4c"
                        confirmButtonTextStyle={{ paddingLeft: "10%", paddingRight: "10%" }}
                        onCancelPressed={() => {
                            setShowAlert(false);
                        }}
                        onConfirmPressed={() => {
                            setShowAlert(false);
                            navigation.goBack();
                        }}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        style={{ backgroundColor: "white" }}
                        label={ratedUser}
                        editable={false}
                    />
                    <TextInput theme={{ colors: { primary: "#fa3c4c" } }}
                        style={{ backgroundColor: "white" }}
                        label="Review Text"
                        onChangeText={value => setReviewText(value)}
                    />
                    <Rating
                        count={5}
                        showRating
                        type="custom"
                        defaultRating={3}
                        ratingColor={"#fa3c4c"}
                        size={20}
                        onFinishRating={ratingCompleted}
                    />
                    <Button
                        style={{ height: 40, margin: "2%", padding: "1%", marginTop: "10%" }}
                        mode="contained"
                        raised
                        theme={{ colors: { primary: "#fa3c4c" } }}
                        onPress={() => submitRating()}
                    >
                        Add Shop
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}

export default UserReviewScreen;

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