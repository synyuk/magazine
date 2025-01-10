// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAabRCnuw4NaFoDlzGoN1QssPaLLkosWKM",
    authDomain: "magazine-cbs.firebaseapp.com",
    databaseURL: "https://magazine-cbs-default-rtdb.firebaseio.com/",
    projectId: "magazine-cbs",
    storageBucket: "magazine-cbs.firebasestorage.app",
    messagingSenderId: "727621848913",
    appId: "1:727621848913:web:6e6873b7c47a0687518d70",
    measurementId: "G-7YB5N7636T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, '/products/');

export {app, database, dbRef, get, getAuth, GoogleAuthProvider, signInWithPopup};