// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClu9Fz4eMeA-Cdag1dPd5p_7zSYjZ47HI",
  authDomain: "news71-68096.firebaseapp.com",
  projectId: "news71-68096",
  storageBucket: "news71-68096.appspot.com",
  messagingSenderId: "440220334261",
  appId: "1:440220334261:web:86c4db348ca753047266fc",
  measurementId: "G-2G4C4L7KW8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
