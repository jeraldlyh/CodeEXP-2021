import React, { useEffect, useState, Fragment } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Alert } from "react-native";
import { GiftedChat, Bubble, Send, SystemMessage, Time } from 'react-native-gifted-chat';
import firebase from "../database/firebaseDB";
import Filter from "bad-words";
import { List, Card, Title, Paragraph, Button, IconButton, Modal, Portal, Provider, TextInput, DefaultTheme } from "react-native-paper";
import tailwind from "tailwind-rn";
import { removeListing } from "../database/actions/Listing";



function RoomScreen({ route }) {
    const [messages, setMessage] = useState([]);
    const { thread, username, product, avatar } = route.params;
    const filter = new Filter();

    const formatProductMessage = (product) => {
        return `${username} has offered to purchase ${product.order} (${product.quantity}) for $${product.price}!`;
    }

    useEffect(() => {
        // console.log(route)
        if (product) {
            console.log(product)
            firebase.firestore().collection("threads")
                .doc(thread)
                .collection("messages")
                .add({
                    text: formatProductMessage(product),
                    createdAt: new Date().getTime(),
                    system: true,
                    quantity: product.quantity,
                    product: product.order,
                    buyer: product.username,
                    productId: product._id
                })
        }

        const unsubscribe = firebase.firestore().collection("threads")
            .doc(thread)
            .collection("messages")
            .orderBy("createdAt", "desc")
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const messageData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: "",
                        createdAt: new Date().getTime(),
                        ...messageData
                    };

                    if (!messageData.system) {
                        data.user = {
                            ...messageData.user,
                            avatar: messageData.user.avatar
                        };
                    }

                    return data;
                });
                setMessage(messages);
            })
        return () => unsubscribe();
    }, [])

    const completeOrder = (buyer, productId, product, quantity) => {
        Alert.alert(
            "Complete Order",
            "Ensure that you've communicated with the user",
            [
                {
                    text: "Cancel",
                    onPress: () => { console.log("Cancel") },
                    style: "cancel"
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        removeListing(buyer, productId)
                            .then(response => {
                                if (response) {
                                    firebase.firestore().collection("threads")
                                        .doc(thread)
                                        .collection("messages")
                                        .add({
                                            text: `The order for ${product} (${quantity}) has been completed`,
                                            createdAt: new Date().getTime(),
                                            system: true,
                                            complete: true,
                                        })
                                }
                            })
                    },
                }
            ]
        )
    }


    async function handleSend(messages) {
        var text = messages[0].text;
        text = filter.clean(text);

        firebase.firestore().collection("threads")
            .doc(thread)
            .collection("messages")
            .add({
                text: text,
                createdAt: new Date().getTime(),
                user: {
                    _id: username,
                    avatar: avatar,
                }
            });
    };

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "grey"
                    },
                    right: {
                        backgroundColor: "#fa3c4c"
                    }
                }}
                textStyle={{
                    left: {
                        color: "#fff"
                    },
                    right: {
                        color: "#fff"
                    }
                }}
            />
        );
    };

    function renderTime(props) {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: "#fff"
                    },
                    right: {
                        color: "#fff"
                    },
                }}
            />
        );
    }

    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fa3c4c" />
            </View>
        );
    };

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon="send-circle" size={32} color="#fa3c4c" />
                </View>
            </Send>
        );
    };

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon="chevron-double-down" size={36} color="#fa3c4c" />
            </View>
        );
    }

    function renderSystemMessage(props) {
        return (
            <View style={styles.systemContainer}>
                <View style={styles.systemMessageWrapper}>
                    <Text style={styles.systemMessageText}>{props.currentMessage.text}</Text>
                    <View style={tailwind("flex flex-row justify-around")}>
                        {
                            props.currentMessage.complete
                                ? <Fragment />
                                : (
                                    <Button onPress={() => completeOrder(
                                        props.currentMessage.buyer,
                                        props.currentMessage.productId,
                                        props.currentMessage.product,
                                        props.currentMessage.quantity
                                    )} color="#fa3c4c">Complete</Button>
                                )
                        }
                    </View>
                </View>
            </View>
        );
    }


    return (
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{ _id: username }}
            placeholder="Type your message here..."
            alwaysShowSend
            showUserAvatar
            scrollToBottom
            renderBubble={renderBubble}
            renderLoading={renderLoading}
            renderSend={renderSend}
            renderTime={renderTime}
            renderSystemMessage={renderSystemMessage}
            scrollToBottomComponent={scrollToBottomComponent}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    sendingContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    bottomComponentContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    systemMessageWrapper: {
        backgroundColor: "#d1d1d1",
        opacity: 0.8,
        borderRadius: 4,
        padding: 5,
        width: "80%",
        alignItems: 'center',
        justifyContent: "center"
    },
    systemMessageText: {
        fontSize: 14,
        textAlign: "center",
        color: "#000000",
        fontWeight: "bold",
        backgroundColor: "transparent",
        fontSize: 12,
        fontWeight: '300',
        paddingTop: 10
    },
    systemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
    }
});

export default RoomScreen