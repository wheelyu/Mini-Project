// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, set, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:"AIzaSyDlgaxCtMxL8jgwSVmQsOZueJfyOX09T0I",
    authDomain: "indexuv-2bbb8.firebaseapp.com",
    databaseURL: "https://indexuv-2bbb8-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "indexuv-2bbb8",
    storageBucket: "indexuv-2bbb8.firebasestorage.app",
    messagingSenderId: "496294560268",
    appId: "1:496294560268:web:2b9c42acccfedbd6bb6429",
    measurementId: "G-Z9H87CNE5S"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);