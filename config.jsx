// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import {getAnalytics} from 'firebase/analytics';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4-6cwEPuLs3ORvK6ekfhKey8hUDcmcgQ",
  authDomain: "location-fb0c4.firebaseapp.com",
  databaseURL: "https://location-fb0c4-default-rtdb.firebaseio.com",
  projectId: "location-fb0c4",
  storageBucket: "location-fb0c4.appspot.com",
  messagingSenderId: "503951675041",
  appId: "1:503951675041:web:f8516fb9b340a6f486aae0",
  measurementId: "G-Y738B9RL47"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getDatabase(app);
