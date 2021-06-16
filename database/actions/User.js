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
            avatar: "https://placeimg.com/140/140/any",
            listing: [],
            reviews: [],
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
                console.log("Error in registerUser");
                reject(error);
            });
    })
}

export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        if (!email) {
            reject("Error: Email is not specified.");
        } else if (!password) {
            reject("Error: Password is not specified.");
        }
        firebase.auth().signInWithEmailAndPassword(email.trim(), password.trim())
            .then(userCredential => {
                resolve(userCredential.user.displayName);
            })
            .catch(error => {
                console.log("Error in loginUser");
                reject(error);
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

export const addReview = (data) => {
    return new Promise((resolve, reject) => {
        console.log("here,", data);

        firebase.firestore().collection("user")
            .doc(data.ratedUser)
            .update({
                reviews: firebase.firestore.FieldValue.arrayUnion(data.review)
            })
            .then(() => resolve(true))
            .catch(error => {
                console.log("Error in addReview");
                reject();
            })
    })
}