import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnrZXMzIde-vM3L0lv95YyJkyEIIHZRqU",
  authDomain: "assignment-5809f.firebaseapp.com",
  projectId: "assignment-5809f",
  storageBucket: "assignment-5809f.appspot.com",
  messagingSenderId: "43678051336",
  appId: "1:43678051336:ios:1c5370d16125dfa86f35bd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);