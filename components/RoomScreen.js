import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import firebase from "../database/firebaseDB";


function RoomScreen({ route }) {
    const [messages, setMessage] = useState([]);
    const { thread, username } = route.params;

    useEffect(() => {
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
                    return data;
                });
                setMessage(messages);
            })
        return () => unsubscribe();
    }, [])

    async function handleSend(messages) {
        firebase.firestore().collection("threads")
            .doc(thread)
            .collection("messages")
            .add({
                text: messages[0].text,
                createdAt: new Date().getTime(),
                user: {
                    _id: username
                }
            })
    }

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#6646ee'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        );
    }

    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#6646ee' />
                </View>
            </Send>
        );
    }

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
            </View>
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{ _id: username }}
            placeholder='Type your message here...'
            alwaysShowSend
            showUserAvatar
            scrollToBottom
            renderBubble={renderBubble}
            renderLoading={renderLoading}
            renderSend={renderSend}
            scrollToBottomComponent={scrollToBottomComponent}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    systemMessageWrapper: {
        backgroundColor: '#6646ee',
        borderRadius: 4,
        padding: 5
    },
});

export default RoomScreen