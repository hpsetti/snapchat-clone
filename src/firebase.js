// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXFdHU3BLo8p_bCrTXLWSUkhV6Z-ILhJs",
  authDomain: "snapchat-clone-c0874.firebaseapp.com",
  projectId: "snapchat-clone-c0874",
  storageBucket: "snapchat-clone-c0874.appspot.com",
  messagingSenderId: "265378079297",
  appId: "1:265378079297:web:47290b9fbcd5723a875cc0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp);
// const storageRef = ref(storage)
const provider = new GoogleAuthProvider();

export {db, auth, storage, provider};