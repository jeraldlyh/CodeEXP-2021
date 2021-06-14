import firebase from "../firebaseDB";

// Manual cloud function trigger
export const createUser = (username) => {
    firebase.firestore().collection("user")
        .doc(username)
        .set({
            ratings: 0,
            enableNotification: false,
            trips: 0,
            listing: [],
            bookmarks: []
        });
}

export const registerUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim())
            .then(userCredential => {
                console.log(userCredential);
                createUser(username);
                resolve(true);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    })
}

export const loginUser = async(email, password) => {
    firebase.auth().signInWithEmailAndPassword(email.trim(), password.trim())
        .then(userCredential => {
            console.log(userCredential)
            // Navigate to home screen
        })
        .catch(error => {
            console.log(error)
            return Promise.reject(error)
        })
}