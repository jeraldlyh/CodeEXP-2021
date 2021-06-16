import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import firebase from "../database/firebaseDB";
import Filter from "bad-words";


function RoomScreen({ route }) {
    const [messages, setMessage] = useState([]);
    const { thread, username, product } = route.params;
    const filter = new Filter();

    const formatProductMessage = (product) => {
        return `${username} has offered to purchase ${product.order} (${product.quantity}) for $${product.price}!`;
    }

    useEffect(() => {
        console.log(route)
        if (product) {
            firebase.firestore().collection("threads")
                .doc(thread)
                .collection("messages")
                .add({
                    text: formatProductMessage(product),
                    createdAt: new Date().getTime(),
                    system: true
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

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.email
                        };
                    }

                    return data;
                });
                setMessage(messages);
            })
        return () => unsubscribe();
    }, [])

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
                    _id: username
                }
            });
    };

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#6646ee"
                    },
                    right: {
                        backgroundColor: "#6646ee"
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

    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6646ee" />
            </View>
        );
    };

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon="send-circle" size={32} color="#6646ee" />
                </View>
            </Send>
        );
    };

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
            </View>
        );
    }

    function renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
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
        backgroundColor: "#6646ee",
        borderRadius: 4,
        padding: 5
    },
    systemMessageText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold"
    }
});

export default RoomScreen