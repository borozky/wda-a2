// src/client.js
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCmrNkejKzWjQ4iQ--wHKTxiDXqzdqXGNg",
    authDomain: "wda-its-admin.firebaseapp.com",
    databaseURL: "https://wda-its-admin.firebaseio.com",
    projectId: "wda-its-admin",
    storageBucket: "wda-its-admin.appspot.com",
    messagingSenderId: "461145377485"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const auth = firebase.auth
export const provider = new firebase.auth.FacebookAuthProvider();