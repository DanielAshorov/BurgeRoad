import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "EnterFirebaseKey",
  authDomain: "borgeroad2.firebaseapp.com",
  projectId: "borgeroad2",
  storageBucket: "borgeroad2.appspot.com",
  messagingSenderId: "244263997791",
  appId: "1:244263997791:web:cd3062d41adcd1a69e66ea",
  measurementId: "G-8VG1FXEHG0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
