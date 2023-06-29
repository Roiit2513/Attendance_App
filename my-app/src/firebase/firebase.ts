
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDARl347JMj2VGYKd3nGUV2NfbxHyUvHUs",
  authDomain: "attendance-74e9d.firebaseapp.com",
  projectId: "attendance-74e9d",
  storageBucket: "attendance-74e9d.appspot.com",
  messagingSenderId: "915520210743",
  appId: "1:915520210743:web:407bcf0af5275a724c3cb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);