import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
  
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_APP_FIREBASE_MEASUMENT_ID
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;