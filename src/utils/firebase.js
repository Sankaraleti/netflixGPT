// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpuMRqUUm0S8Yn6cBreeI9QUSMkq3-iOQ",
  authDomain: "netflixgpt-661d3.firebaseapp.com",
  projectId: "netflixgpt-661d3",
  storageBucket: "netflixgpt-661d3.appspot.com",
  messagingSenderId: "314832093864",
  appId: "1:314832093864:web:a660025fb21d846788b89d",
  measurementId: "G-KNE7JF0P3K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
