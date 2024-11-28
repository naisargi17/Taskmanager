// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi2h_wkqjZ0fadcMNQCofaJ9mEICu3Ax0",
  authDomain: "task-manager-a6e82.firebaseapp.com",
  projectId: "task-manager-a6e82",
  storageBucket: "task-manager-a6e82.appspot.com",
  messagingSenderId: "1072572685195",
  appId: "1:1072572685195:web:1c88008e9c87da50c8ad8e",
  measurementId: "G-BYQZPT65PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);