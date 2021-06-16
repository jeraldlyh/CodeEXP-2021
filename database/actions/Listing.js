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
                            console.log(error);
                        });
                } else {
                    reject("Product does not exist");
                };
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const removeListing = (username, productListing) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("user")
            .doc(username)
            .update({
                listings: firebase.firestore.FieldValue.arrayRemove(productListing)
            })
            .then(() => resolve("Successfully removed listing"))
            .catch(error => {
                reject("Error removing listing");
            })
            
    })
}