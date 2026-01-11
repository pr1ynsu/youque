import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZL4hDdBi1e7nZV9ztO1LKSn1Z-gGYTXs",
  authDomain: "youque-bb884.firebaseapp.com",
  projectId: "youque-bb884",
  storageBucket: "youque-bb884.firebasestorage.app",
  messagingSenderId: "134149738812",
  appId: "1:134149738812:web:c7dbc0b301a67ba006ce39"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
