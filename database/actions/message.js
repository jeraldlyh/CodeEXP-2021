import firebase from "../firebaseDB";
import { v4 as uuidv4 } from "uuid";


// export const getConversations = (username) => {
//     return new Promise((resolve, reject) => {
//         firebase.firestore().collection("message")
//             .get()
//             .then(querySnapshot => {
//                 const userConvo = [];
//                 querySnapshot.forEach(doc => {
//                     const message = doc.data();

//                     if (message.userOne === username || message.userTwo === username) {
//                         userConvo.push(message);
//                     }
//                 })
//                 resolve(userConvo);
//             })
//             .catch(error => {
//                 console.log(error);
//                 reject(error);
//             })
//     });
// };


export const addMessageToConvo = (conversationID, fromUser, text) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("message")
            .doc(conversationID)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    _id: uuidv4(),
                    from: fromUser,
                    time: firebase.firestore.Timestamp.now(),
                    text: text
                })
            })
            .then(() => resolve("Message successfully sent!"))
            .catch(error => reject(error));
    });
};


export const createConvo = (userOne, userTwo) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("threads")
            .add({
                userOne: userOne,
                userTwo: userTwo,
                // messages: []
            })
            .then(doc => {
                updateConvoUUID(doc.id)
                resolve("Conversation has been created");
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const updateConvoUUID = (conversationID) => {
    firebase.firestore().collection("message")
        .doc(conversationID)
        .update({
            uuid: conversationID
        });
}