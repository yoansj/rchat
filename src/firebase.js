import firebase from 'firebase'

const firebaseConfig = {
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebaseApp.firestore();

export default database;