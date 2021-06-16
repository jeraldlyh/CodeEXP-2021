import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import { List } from 'react-native-paper';
import firebase from "../database/firebaseDB";
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from "../provider/AuthContext";


const ChatScreen = ({ navigation }) => {
    const { username } = useContext(AuthContext);
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("threads")
            .onSnapshot(collection => {
                const userConvo = [];

                collection.forEach(doc => {
                    const message = doc.data();
                    message._id = doc.id;
                    if (message.userOne === username || message.userTwo === username) {
                        userConvo.push(message);
                    }
                })
                setThreads(userConvo)
            })
        return () => unsubscribe();
    }, []);

    return (
        <View>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <List.Item
                            title={item.userOne !== username ? item.userOne : item.userTwo}
                            left={() => <Image source={{ uri: 'https://picsum.photos/700' }} style={{ width: 60, height: 60, borderRadius: 100 }} />}
                            right={() => <List.Icon icon="chevron-right" />}
                            onPress={() => navigation.navigate("Room", { thread: item._id, username: username })}
                        />
                    )
                }}
            />
        </View>
    );
}

export default ChatScreen;
