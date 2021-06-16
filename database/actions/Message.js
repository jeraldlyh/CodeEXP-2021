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
            .catch(error => {
                console.log("Error in addMessageToConv");
                reject(error)
            });
    });
};


export const createConvo = (userOne, userTwo) => {
    return new Promise((resolve, reject) => {
        isConvoExist(userOne, userTwo)
            .then(response => {
                if (!response) {
                    firebase.firestore().collection("threads")
                        .add({
                            userOne: userOne,
                            userTwo: userTwo,
                        })
                        .then(doc => {
                            updateConvoUUID(doc.id)
                            resolve(doc.id);
                        })
                        .catch(error => {
                            console.log("Error in isConvoExist called in createConvo");
                            reject(error);
                        });
                } else {
                    resolve(response._id)
                }
            })
    });
};

export const updateConvoUUID = (conversationID) => {
    firebase.firestore().collection("threads")
        .doc(conversationID)
        .update({
            _id: conversationID
        });
};

export const isConvoExist = (userOne, userTwo) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("threads")
            .get()
            .then(querySnapshot => {
                const convoData = querySnapshot.docs.map(doc => doc.data());
                const parsedData = convoData.filter(function(data) {
                        if (
                            (data.userOne === userOne && data.userTwo === userTwo) || 
                            (data.userOne === userTwo && data.userTwo === userOne)
                        ) {
                            return true;
                        }
                        return false;
                })
                if (parsedData || parsedData.length !== 0) {
                    resolve(parsedData[0]);
                }
            })
            .catch(error => {
                console.log("Error in isConvoExist");
                reject(error);
            });
    });
};