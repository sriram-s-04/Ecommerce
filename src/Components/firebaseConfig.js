// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCAiTnSh1PlyJJbfv8nscs-eiNEPSC2NM",
  authDomain: "react-d97d8.firebaseapp.com",
  projectId: "react-d97d8",
  storageBucket: "react-d97d8.firebasestorage.app",
  messagingSenderId: "697455384974",
  appId: "1:697455384974:web:c79f7e099b9a9c34032cdf",
  measurementId: "G-9VD2C4H4RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export { app, auth, provider, db };