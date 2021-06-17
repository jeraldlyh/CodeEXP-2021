import { firebase } from "@firebase/app"
import "firebase/firestore"
import "firebase/auth"
// import firestore from "firebase/firestore"

var firebaseConfig = {
    apiKey: "INSERT API KEY HERE",
    authDomain: "INSERT AUTH DOMAIN HERE",
    projectId: "INSERT PROJECT ID HERE",
    storageBucket: "INSERT STORAGE BUCKET HERE",
    messagingSenderId: "INSERT MESSAGING SENDER ID HERE",
    appId: "INSERT APPLICATION ID HERE",
    measurementId: "INSERT MEASUREMENT ID HERE"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    firebase.firestore()
} else {
    firebase.app()
}

export default firebase
