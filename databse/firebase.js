import firebase from 'firebase'
import '@firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBlK9ZsEyErji_dlYZ8JKucGGv-7mw-o3A",
    authDomain: "chatinger-14f9a.firebaseapp.com",
    databaseURL: "https://chatinger-14f9a.firebaseio.com",
    projectId: "chatinger-14f9a",
    storageBucket: "chatinger-14f9a.appspot.com",
    messagingSenderId: "773422714266",
    appId: "1:773422714266:web:d2a2d1c6f252a2f02e3e23",
    measurementId: "G-ZVGBZ5M3JY"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();


db.collection('users').doc("SF").get().then(doc=> { console.log(doc)})
console.log("adsds")
export default firebase;