import firebase from "../firebaseDB";

export const hasExistingConvo = (userOne, userTwo) => {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < 2; i++) {
            const idQuery = i == 0 ? userOne + userTwo : userTwo + userOne;     // Searches for 2 combinations in collection for conversation ID

            firebase.firestore().collection("message")
                .doc(idQuery)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        i == 0 ? resolve(0) : resolve(1)
                    } else {
                        reject(-1)
                    }
                })
        }
    })
    // return new Promise((resolve, reject) => {
    //     firebase.firestore().collection("message")
    //         .where("userOne", "==", userOne)
    //         .where("userTwo", "==", userTwo)
    //         .get()
    //         .then(querySnapshot => {
    //             if (querySnapshot.empty) {
    //                 reject(false)
    //             } else {
    //                 const docs = querySnapshot.docs.map(doc => doc.data())
    //                 // console.log(docs)
    //                 resolve(docs[0])
    //             }
    //         })
    // })
}


export const createMessage = async(userOne, userTwo, text) => {
    // UserOne will be considered as from
    hasExistingConvo(userOne, userTwo)
        .then(response => {
            if (response >= 0) {
                firebase.firestore().collection("message")
                    .doc(userOne + userTwo)
                    .update({
                        userOne: userOne,
                        userTwo: userTwo,
                        messages: firebase.firestore.FieldValue.arrayUnion({
                            from: userOne,
                            time: firebase.firestore.Timestamp.now(),
                            text: text
                        })
                    })
            } else {
                firebase.firestore().collection("message")
                    .doc(userOne + userTwo)
                    .set({
                        userOne: userOne,
                        userTwo: userTwo,
                        messages: firebase.firestore.FieldValue.arrayUnion({
                            from: userOne,
                            time: firebase.firestore.Timestamp.now(),
                            text: text
                        })
                    })
            }
        })
    
}