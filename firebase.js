import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqJUoOwh5Pyw6qPjgxA0-m5uAOhv4kbKo",
    authDomain: "chatwithme-7d74b.firebaseapp.com",
    projectId: "chatwithme-7d74b",
    storageBucket: "chatwithme-7d74b.appspot.com",
    messagingSenderId: "822978106655",
    appId: "1:822978106655:web:7877949d2f401336e28c2a"
};

// Use this to initialize the firebase App
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db, firebase };

