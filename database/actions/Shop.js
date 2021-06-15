import firebase from "../firebaseDB";
import postalCodeData from "../postalCode.json";
import * as Location from 'expo-location';


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
                        img: body.img,
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

export const getNearbyShops = async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status) {
            let { coords } = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
        
            if (coords) {
                const { latitude, longitude } = coords;
                let response = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude
                })

                const sectorCode = response[0].postalCode.toString().substr(response[0].postalCode.length - 6, response[0].postalCode.length - 4);
                var nearbyPostal = [];
                
                for (var key in postalCodeData) {
                    if (postalCodeData[key].includes(sectorCode)) {
                        nearbyPostal = postalCodeData[key];
                        break;
                    }
                }
                return new Promise((resolve, reject) => {
                    firebase.firestore().collection("shop")
                        .get()
                        .then(querySnapshot => {
                            const nearbyShops = [];
                
                            querySnapshot.forEach(doc => {
                                const shop = doc.data();
                                const shopArray = shop.location.split(" ")
                                const shopPostalCode = shopArray[shopArray.length - 1].substr(0, 2);
    
                                if (nearbyPostal.includes(shopPostalCode)) {
                                    nearbyShops.push(shop);
                                };
                            });
    
                            if (nearbyShops !== 0) {        // Nearby shops exist in database
                                resolve(nearbyShops);
                            } else {
                                reject("No nearby shops found");
                            };
                        })
                        .catch(error => {
                            console.log(error);
                            reject(error);
                        });

                })
            } else {
                return Promise.reject("Permission not granted");
            }
        }
}

export const isProductExist = (shopName, product) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("shop")
        .doc(shopName)
        .get()
        .then(doc => {
            const listing = doc.data().listings;
            for (var key in listing) {
                if (listing[key].order === product) {
                    resolve(true);
                }
            }
            resolve(false);
        })
        .catch(error => reject(error));
    })
}
