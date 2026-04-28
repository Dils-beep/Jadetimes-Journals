import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBcjjf0Q8s-BUyoY7nwqNmd050x2Kds93k",
    authDomain: "jadetimes-journal.firebaseapp.com",
    projectId: "jadetimes-journal",
    storageBucket: "jadetimes-journal.firebasestorage.app",
    messagingSenderId: "59945092600",
    appId: "1:59945092600:web:f8b3ce0e344e4abf51420d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Set persistence to local storage
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Auth persistence error:", error);
    });

export const googleProvider = new GoogleAuthProvider();
