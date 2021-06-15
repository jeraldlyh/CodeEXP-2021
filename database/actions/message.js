import firebase from "../firebaseDB";


// export const hasExistingConvo = (userOne, userTwo) => {
//     return new Promise((resolve, reject) => {
//         for (var i = 0; i < 2; i++) {
//             const idQuery = i == 0 ? userOne + userTwo : userTwo + userOne;     // Searches for 2 combinations in collection for conversation ID

//             firebase.firestore().collection("message")
//                 .doc(idQuery)
//                 .get()
//                 .then(doc => {
//                     if (doc.exists) {
//                         resolve(idQuery);
//                     } else {
//                         reject(-1);
//                     }
//                 });
//         }
//     })
// }
export const getConversations = (username) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("message")
            .get()
            .then(querySnapshot => {
                const userConvo = [];
                querySnapshot.forEach(doc => {
                    const message = doc.data();
                    console.log(message)
                    if (message.userOne === username || message.userTwo === username) {
                        userConvo.push(message);
                    }
                })
                resolve(userConvo);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            })

    })
}

export const addMessageToConvo = (conversationID, fromUser, text) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("message")
            .doc(conversationID)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    from: fromUser,
                    time: firebase.firestore.Timestamp.now(),
                    text: text
                })
            })
            .then(() => resolve("Message successfully sent!"))
            .catch(error => reject(error));
    });
};


export const createConvo = async(userOne, userTwo) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("message")
            .add({
                userOne: userOne,
                userTwo: userTwo,
                messages: []
            })
            .then(doc => {
                console.log(doc);
                resolve("Conversation has been created");
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });

};