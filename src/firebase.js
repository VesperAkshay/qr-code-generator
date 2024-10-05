import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
      apiKey: "AIzaSyAeokJU87mygt98ssZK2bI90fXhDQuqkjU",
      authDomain: "ciphersafe-b94a5.firebaseapp.com",
      projectId: "ciphersafe-b94a5",
      storageBucket: "ciphersafe-b94a5.appspot.com",
      messagingSenderId: "173234055063",
      appId: "1:173234055063:web:5268b279581bd5e87246d2",
      measurementId: "G-X3561QHDSC"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAeokJU87mygt98ssZK2bI90fXhDQuqkjU",
//   authDomain: "ciphersafe-b94a5.firebaseapp.com",
//   projectId: "ciphersafe-b94a5",
//   storageBucket: "ciphersafe-b94a5.appspot.com",
//   messagingSenderId: "173234055063",
//   appId: "1:173234055063:web:5268b279581bd5e87246d2",
//   measurementId: "G-X3561QHDSC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
