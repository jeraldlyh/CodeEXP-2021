import firebase from "../firebaseDB";
import { getShopByName } from "./Shop";


export const addBookmark = (username, shopName) => {
    return new Promise((resolve, reject) => {
        getShopByName(shopName)
            .then(response => {
                firebase.firestore().collection("user")
                .doc(username)
                .update({
                    bookmarks: firebase.firestore.FieldValue.arrayUnion(shopName)
                });
                resolve();
            })
            .catch(error => {
                console.log("Error in addBookmark");
                if (error === "No data found") {
                    reject("Shop does not exist");
                }
            })
    })
}

export const removeBookmark = (username, shopName) => {
    return new Promise((resolve, reject) => {
        getShopByName(shopName)
            .then(response => {
                firebase.firestore().collection("user")
                .doc(username)
                .update({
                    bookmarks: firebase.firestore.FieldValue.arrayRemove(shopName)
                });
                resolve();
            })
            .catch(error => {
                console.log("Error in removeBookmarks");
                if (error === "No data found") {
                    reject("Shop does not exist");
                }
            })
    })
}

export const getAllBookmarks = (username) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("user")
            .doc(username)
            .get()
            .then(doc => {
                resolve(doc.data().bookmarks);
            })
            .catch(error => {
                console.log("Error in getAllBookmarks");
                reject(error);
            })
    })
}