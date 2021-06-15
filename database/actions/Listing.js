import firebase from "../firebaseDB";

export const addListing = (username, shopName, product, quantity) => {
    return new Promise((resolve, reject) => {
        const newListing = {
            product: product,
            quantity: quantity,
            listAt: firebase.firestore.Timestamp.now()
        };
    
        isProductExist(shopName, product)
            .then(response => {
                if (response) {
                    firebase.firestore().collection("user")
                        .doc(username)
                        .update({
                            listing: firebase.firestore.FieldValue.arrayUnion(newListing)
                        });
                        resolve("Successfully added listing");
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