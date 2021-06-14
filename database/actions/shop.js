import firebase from "../firebaseDB";
import estateData from "../estate.json";

export const isShopExist = (shopName) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("shop")
            .doc(shopName)
            .get()
            .then(doc => {
                if (doc.exists) {
                    resolve(true)
                }
                resolve(false)
            })
    })
}

export const addShop = (body) => {
    return new Promise((resolve, reject) => {
        isShopExist(body.name)
            .then(response => {
                if (!response) {
                    firebase.firestore().collection("shop").doc(body.name).set({
                        name: body.name,
                        description: body.description,
                        type: body.type,
                        location: body.location,
                        listings: body.listings,
                        rating: body.rating,
                        products: body.products,
                        reviews: body.reviews
                    });
                    console.log("Shop added");
                    resolve("Shop added");
                } else {
                    console.log("Shop already exist");
                    resolve("Shop already exist");
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    })
}

export const getAllShops = () => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("shop").onSnapshot((collection => {
            const shopData = collection.docs.map(doc => doc.data())
            resolve(shopData);
        }))
    })
}

export const updateShop = (body, shopName) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("shop")
            .doc(shopName)
            .update(body);
        });
}

export const getShopByName = (shopName) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("shop").doc(shopName)
            .get()
            .then(doc => {
                if (doc.exists) {
                    resolve(doc.data());
                }
                reject("No data found");
            })
            .catch(error => {
                console.log("An error occured while retrieving shop data");
                reject("An error occured while retrieving shop data");
            });
    })
}

export const getNearbyShops = (location) => {
    console.log(location.toString())
    const sectorCode = location.toString().substr(location.length - 6, location.length - 4);
    console.log(sectorCode);
}