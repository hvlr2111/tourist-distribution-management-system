// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "sri-lanka-tourism-intelligence.firebaseapp.com",
    projectId: "sri-lanka-tourism-intelligence",
    storageBucket: "sri-lanka-tourism-intelligence.firebasestorage.app",
    messagingSenderId: "143687169480",
    appId: "1:143687169480:web:d2a1cd88ce9b3203027cfd",
    measurementId: "G-E2FWYNXCXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
