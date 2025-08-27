
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIz5-bkuIU9Z5M4Y7uVkk4qfZYHidz6Co",
  authDomain: "e-library-5e0ac.firebaseapp.com",
  projectId: "e-library-5e0ac",
  storageBucket: "e-library-5e0ac.appspot.com",
  messagingSenderId: "74261279515",
  appId: "1:74261279515:web:3f02090d7f7387953e59be",
  measurementId: "G-KJ0PNRSRH9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
