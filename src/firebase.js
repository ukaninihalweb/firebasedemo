// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase ,ref, set } from "firebase/database"; // Import getDatabase function

const firebaseConfig = {
  apiKey: "AIzaSyBGatx9RwnfmEXBDWFGa7BkEIW-wGsv650",
  authDomain: "reacthotel-4da83.firebaseapp.com",
  projectId: "reacthotel-4da83",
  storageBucket: "reacthotel-4da83.appspot.com",
  messagingSenderId: "512055385461",
  appId: "1:512055385461:web:aa95467ade1416a724c73c",
  measurementId: "G-MEGQPVS6PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize and export the Realtime Database
export { app, auth, database, set, ref };