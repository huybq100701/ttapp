// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRzoSI3fFwatVO2OIZISnifJUe2TNQGA4",
  authDomain: "ttapp-24fa7.firebaseapp.com",
  projectId: "ttapp-24fa7",
  storageBucket: "ttapp-24fa7.appspot.com",
  messagingSenderId: "651200276326",
  appId: "1:651200276326:web:ab49fde3e37b70ab258aa7"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(FirebaseApp);

export { FirebaseApp, storage };