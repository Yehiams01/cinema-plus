import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcr6uEN8ScGP1YblQf-fUdGqWoFvj0am0",
  authDomain: "cinemaplus-d20cf.firebaseapp.com",
  projectId: "cinemaplus-d20cf",
  storageBucket: "cinemaplus-d20cf.appspot.com",
  messagingSenderId: "71730828093",
  appId: "1:71730828093:web:abe984ce90b952b9daab54"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()