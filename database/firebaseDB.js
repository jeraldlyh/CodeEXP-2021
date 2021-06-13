import { firebase } from "@firebase/app"
import "firebase/firestore"
// import firestore from "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBIyZ_0jJu2anJLKg6pE8KBg7SSYkui3CQ",
    authDomain: "codeexp-2021.firebaseapp.com",
    projectId: "codeexp-2021",
    storageBucket: "codeexp-2021.appspot.com",
    messagingSenderId: "648673159373",
    appId: "1:648673159373:web:76719a23dfed170adfa184",
    measurementId: "G-FFFF4BXD18"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase