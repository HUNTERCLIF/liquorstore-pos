import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVtA_GumWhYi_nzghSIYS7SLKGeuxC4ds",

  authDomain: "liqourstorepos.firebaseapp.com",

  projectId: "liqourstorepos",

  storageBucket: "liqourstorepos.appspot.com",

  messagingSenderId: "163212280487",

  appId: "1:163212280487:web:298adb811a68c6f14dd182",

  measurementId: "G-XZZR4SB8V5"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
