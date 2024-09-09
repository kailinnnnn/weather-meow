import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1QqGsLX1BnC6gKOuFZ2HmqJMh9LaSTk8",
  authDomain: "weather-always-good.firebaseapp.com",
  projectId: "weather-always-good",
  storageBucket: "weather-always-good.appspot.com",
  messagingSenderId: "86285373530",
  appId: "1:86285373530:web:957b80780cb6accaa48863",
  measurementId: "G-BG13SMLLBP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const firebase = {
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userId = user.uid;
      const userRef = doc(db, "users", userId);
      let docSnap = await getDoc(userRef);
      //if user does not exist, create a new user
      if (!docSnap.exists()) {
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          history: [],
        };
        await setDoc(userRef, newUser);
        docSnap = await getDoc(userRef);
      }
      const userData = docSnap.data();
      return userData;
    } catch (error) {
      throw error;
    }
  },
  async getUser(id) {
    const userRef = doc(db, "users", id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },
  async updateUserData(id, data) {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, data);
  },
};

export default firebase;
