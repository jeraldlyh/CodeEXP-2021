import firebase from "../firebaseDB";

// Manual cloud function trigger
export const createUser = (username) => {
    firebase.firestore().collection("user")
        .doc(username)
        .set({
            registeredAt: new Date().getTime(),
            ratings: 0,
            enableNotification: false,
            trips: 0,
            listing: [],
            review: [],
            bookmarks: []
        });
}

export const registerUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim())
            .then(userCredential => {
                userCredential.user.updateProfile({
                    displayName: username
                }).then(() => {
                    createUser(username);
                    resolve(username);
                })
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    })
}

export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email.trim(), password.trim())
            .then(userCredential => {
                resolve(userCredential.user.displayName);
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

export const getUserProfile = (username) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("user")
            .doc(username)
            .get()
            .then(doc => {
                resolve(doc.data());
            })
            .catch(error => {
                console.log(error);
                reject(error);
            })
    })
}