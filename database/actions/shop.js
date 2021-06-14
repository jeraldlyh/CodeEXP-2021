import firebase from "../firebaseDB";

export const isShopExist = async(shopName) => {
    const shop = firebase.firestore().collection("shop").doc(shopName);
    const doc = await shop.get();

    if (doc.exists) {
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

export const addShop = async(body) => {
    isShopExist(body.name)
        .then(response => {
            if (!response) {
                firebase.firestore().collection("shop").doc(body.name).set({
                    name: body.name,
                    description: body.description,
                    location: body.location,
                    rating: body.rating,
                    products: body.products,
                    reviews: body.reviews
                });
                console.log("Shop added");
                return Promise.resolve("Shop added");
            } else {
                console.log("Shop already exist");
                return Promise.resolve("Shop already exist");
            }
        })
        .catch(error => {
            console.log(error);
            console.log("An error occured while adding a new shop");
            return Promise.reject(error);
        })
}

export const updateShop = async(body, shopName) => {
    try {
        const shop = firebase.firestore().collection("shop").doc(shopName);
        const res = await shop.update(body);
    } catch (error) {
        console.log("Shop not found", shopName);
        return Promise.reject("Shop not found");
    }
}

export const getShopByName = async(shopName) => {
    try {
        const shop = await firebase.firestore().collection("shop").doc(shopName);
        const doc = await shop.get();

        if (doc.exists) {
            console.log("here", doc.data());
            return Promise.resolve(doc.data());
        }
        return Promise.reject("No data found");
    } catch (error) {
        console.log("An error occured while retrieving shop data");
        return Promise.reject("An error occured while retrieving shop data");
    }
}