// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GOOGLE_FIREBASE_API,
  authDomain: "teatempo-ecommerce.firebaseapp.com",
  projectId: "teatempo-ecommerce",
  storageBucket: "teatempo-ecommerce.appspot.com",
  messagingSenderId: "84014691121",
  appId: "1:84014691121:web:fb6b18e7f774fe72de7610",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
