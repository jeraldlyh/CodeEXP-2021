import firebase from "../firebaseDB";
import { getProductByName, isProductExist } from "./Shop";
import _ from "lodash";

export const addListing = (username, shopName, product, quantity) => {
    return new Promise((resolve, reject) => {
        var newListing = {
            quantity: quantity,
            listAt: new Date().getTime()
        };

        isProductExist(shopName, product)
            .then(response => {
                if (response) {
                    getProductByName(shopName, product)
                        .then(data => {
                            newListing = _.merge(newListing, data)
                            firebase.firestore().collection("user")
                                .doc(username)
                                .update({
                                    listing: firebase.firestore.FieldValue.arrayUnion(newListing)
                                });
                            firebase.firestore().collection("shop")
                                .doc(shopName)
                                .update({
                                    listing: firebase.firestore.FieldValue.arrayUnion(_.merge(newListing, { username: username }))
                                })
                                resolve("Successfully added listing");
                    })
                } else {
                    reject("Product does not exist");
                }
            })
            .catch(error => reject(error));
    })
}

export const removeListing = (username, productListing) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("user")
            .doc(username)
            .update({
                listing: firebase.firestore.FieldValue.arrayRemove(productListing)
            })
            .then(() => resolve("Successfully removed listing"))
            .catch(error => {
                reject("Error removing listing");
            })
            
    })
}