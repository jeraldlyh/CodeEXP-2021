import firebase from "../firebaseDB";
import { getProductByName, isProductExist } from "./Shop";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export const addListing = (username, shopName, product, quantity, price) => {
    return new Promise((resolve, reject) => {
        var newListing = {
            _id: uuidv4(),
            order: product,
            quantity: quantity,
            price: price,
            listAt: new Date().getTime()
        };

        isProductExist(shopName, product)
            .then(response => {
                if (response) {
                    getProductByName(shopName, product)
                        .then(data => {
                            const productAttribute = {
                                url: data.url
                            };
                            newListing = _.merge(newListing, productAttribute);
                            firebase.firestore().collection("user")
                                .doc(username)
                                .update({
                                    listings: firebase.firestore.FieldValue.arrayUnion(newListing)
                                });
                            firebase.firestore().collection("shop")
                                .doc(shopName)
                                .update({
                                    listings: firebase.firestore.FieldValue.arrayUnion(_.merge(newListing, { username: username }))
                                })
                                resolve(newListing);
                        })
                        .catch(error => {
                            console.log("Error in getProductByName called in addListing");
                        });
                } else {
                    reject("Product does not exist");
                };
            })
            .catch(error => {
                console.log("Error in isProdExist called in addListing");
                reject(error);
            });
    });
};

export const getUserListing = (buyer, productId) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("user")
            .doc(buyer)
            .get()
            .then(doc => {
                const userData = doc.data();
                const product = userData.listings.filter(function(listing) {
                    return listing._id === productId;
                })
                if (product) {              // Prevent user that do not has listing permission to remove
                    console.log(product)
                    resolve(product[0]);
                } else {
                    reject("Listing does not belong to user");
                }
            })
            .catch(error => {
                console.log("Error in getUserListing");
                reject(error);
            })
    });
};

export const removeListing = (buyer, productId) => {
    console.log(buyer, productId)
    return new Promise((resolve, reject) => {
        getUserListing(buyer, productId)
            .then(response => {
                console.log(response)
                firebase.firestore().collection("user")
                    .doc(buyer)
                    .update({
                        listings: firebase.firestore.FieldValue.arrayRemove(response)
                    })
                    .then(() => resolve(true))
                    .catch(error => {
                        console.log("Error in removeListing");
                        reject("Error removing listing");
                    })
            })
            
    })
}