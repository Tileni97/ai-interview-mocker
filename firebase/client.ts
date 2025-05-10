// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDpXu_5_8yRFef-WX7EXpfz_WFPngilm54",
    authDomain: "aiinterviewer-34ee4.firebaseapp.com",
    projectId: "aiinterviewer-34ee4",
    storageBucket: "aiinterviewer-34ee4.firebasestorage.app",
    messagingSenderId: "302456265050",
    appId: "1:302456265050:web:eda5882817ad9b9b527b63",
    measurementId: "G-S26KXPVGJH"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);


