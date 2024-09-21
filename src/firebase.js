import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtQEU3Q_jV2gRg6Zppfjc-GAL9Hmoc0Hw",
  authDomain: "banking-4dd1e.firebaseapp.com",
  projectId: "banking-4dd1e",
  storageBucket: "banking-4dd1e.appspot.com",
  messagingSenderId: "724540620173",
  appId: "1:724540620173:web:83902849ea9a19225791c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;