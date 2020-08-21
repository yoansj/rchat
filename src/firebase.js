import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAAJQ6cSdyEOg6Jmtu0kLte2wn4VqsTCrM",
    authDomain: "rchat-87159.firebaseapp.com",
    databaseURL: "https://rchat-87159.firebaseio.com",
    projectId: "rchat-87159",
    storageBucket: "rchat-87159.appspot.com",
    messagingSenderId: "298820429100",
    appId: "1:298820429100:web:79e2ff175c526737423889",
    measurementId: "G-6DK77K31E2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebaseApp.firestore();

export default database;