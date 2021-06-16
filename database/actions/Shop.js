import firebase from "../firebaseDB";
import postalCodeData from "../postalCode.json";
import * as Location from 'expo-location';
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";


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
            .catch(error => {
                console.log("Error in isShopExist");
                reject(error);
            })
    })
}

export const addShop = (body) => {
    if (body.products) {
        body.products = body.products.map(product => {      // Manual insert of id
            return _.merge(product, { _id: uuidv4() })
        })
    }

    if (body.listings) {
        body.listings = body.listings.map(listing => {      // Manual insert of id
            return _.merge(listing, { _id: uuidv4() })
        })
    }

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
                        reviews: body.reviews,
                        _id: uuidv4()
                    });
                    console.log("Shop added");
                    resolve("Shop added");
                } else {
                    console.log("Shop already exist");
                    resolve("Shop already exist");
                }
            })
            .catch(error => {
                console.log("Error in isShopExist called in addShop");
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
                console.log("Error in getShopByName");
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
                            console.log("Error in getNearbyShops");
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
            const products = doc.data().products;
            const productName = products.map(product => product.name);

            if (productName.includes(product)) {
                resolve(true);
            }
            resolve(false);
        })
        .catch(error => {
            console.log("Error in isProdExist");
            reject(error);
        });
    })
}

export const getProductByName = (shopName, productName) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("shop")
        .doc(shopName)
        .get()
        .then(doc => {
            const products = doc.data().products;
            const productData = products.filter(function(product) {
                return product.name === productName;
            });
            resolve(productData[0]);
        })
        .catch(error => {
            console.log("Error in getProdByName");
            reject(error);
        });
    })
}
