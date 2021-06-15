import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { List } from 'react-native-paper';
import firebase from "../database/firebaseDB";
import { FlatList } from 'react-native-gesture-handler';
import { tailwind } from "tailwind-rn";
import { AuthContext } from "../provider/AuthContext";
import { getConversations } from "../database/actions/Message";


const ChatScreen = ({ navigation }) => {
    const [conversation, setConversation] = useState(null);
    const [convoQuery, setConvoQuery] = useState("");
    const { username } = useContext(AuthContext);

    useEffect(() => {
        getConversations("jerald").then((response) => console.log(response))
        
        // const unsubscribe = firebase.firestore().collection("message")
        //     .doc(convoQuery)
        //     .onSnapshot(collection => {
        //         collection.forEach(doc => {
        //             console.log(doc.data())
        //         })
        //     }
        // )

        // return () => unsubscribe();
    }, []);

    return (
        <View>
            <FlatList
                data={conversation}
                renderItem={({ item }) => {
                    return (
                        <List.Item
                            title={item.name}
                            keyExtractor={item => item}
                            description={item.location}
                            left={() => <Image source={{ uri: 'https://picsum.photos/700' }} style={{ width: 60, height: 60, borderRadius: 100 }} />}
                            right={() => <List.Icon icon="chevron-right" />}
                            onPress={() => navigation.navigate("Room", { ...item })}
                        />
                    )
                }}
            />
        </View>

    );
}

export default ChatScreen;
