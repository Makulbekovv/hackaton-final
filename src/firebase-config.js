import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBOKq4eLnvjFtOuhAPgcdOrdpFPC1WBTTk",
  authDomain: "hackaton-auth.firebaseapp.com",
  projectId: "hackaton-auth",
  storageBucket: "hackaton-auth.appspot.com",
  messagingSenderId: "941273523521",
  appId: "1:941273523521:web:ca237ddf84adf3f6b2adc0",
  measurementId: "G-6QYSY7YNJ8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
