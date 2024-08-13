import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD410QCRfnNJCNWCmLg-Tniy9F513bPDr4",
    authDomain: "qr-code-47b43.firebaseapp.com",
    projectId: "qr-code-47b43",
    storageBucket: "qr-code-47b43.appspot.com",
    messagingSenderId: "743075312465",
    appId: "1:743075312465:web:b1bf4441409492fe745970",
    measurementId: "G-WWM6T7E7K3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
