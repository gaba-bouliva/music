// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv3s2heR2raLcQz8Lqdw_0Zhz4leSImgs",
  authDomain: "music-dac2d.firebaseapp.com",
  projectId: "music-dac2d",
  storageBucket: "music-dac2d.appspot.com",
  messagingSenderId: "490256196258",
  appId: "1:490256196258:web:a97a5156a881bae9f3edfb",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
