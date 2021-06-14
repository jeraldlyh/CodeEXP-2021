import firebase from "../firebaseDB";

// Manual cloud function trigger
export const CreateUser = (username) => {
    firebase.firestore().collection("user")
        .doc(username)
        .set({
            ratings: 0,
            enableNotification: false,
            trips: 0,
            listing: {},
            bookmarks: {}
        })
}

export const RegisterUser = async(username, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim())
        .then(userCredential => {
            console.log(userCredential)
            CreateUser(username)
        })
        .catch(error => {
            console.log(error)
            return Promise.reject(error)
        })
}

export const LoginUser = async(email, password) => {
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