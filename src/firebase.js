// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7pF5FnlwMDIMEafJpxTPBt0u9ks2CVD4",
  authDomain: "simpletodo-9a156.firebaseapp.com",
  projectId: "simpletodo-9a156",
  storageBucket: "simpletodo-9a156.appspot.com",
  messagingSenderId: "136259385035",
  appId: "1:136259385035:web:334c77ac8e3bc083868d4e",
  measurementId: "G-RRTNHQ2FHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//access the database
export const db = getFirestore(app);
