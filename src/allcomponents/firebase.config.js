import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBsjuwzXVCXlC_Tv8FgrdkiSwR2iZT68DY",
  authDomain: "myjewelshop-4e0c0.firebaseapp.com",
  projectId: "myjewelshop-4e0c0",
  storageBucket: "myjewelshop-4e0c0.appspot.com",
  messagingSenderId: "835986448256",
  appId: "1:835986448256:web:4d4363481bc3f0082b6b65",
  measurementId: "G-3EM4P2LGZH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);