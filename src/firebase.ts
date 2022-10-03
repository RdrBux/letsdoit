import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC9-ojC3iNM9JX9lwzlqqdyNzBspVW9NBY',
  authDomain: 'doit-c5071.firebaseapp.com',
  projectId: 'doit-c5071',
  storageBucket: 'doit-c5071.appspot.com',
  messagingSenderId: '796833290246',
  appId: '1:796833290246:web:2c655d6b1d0d29a206cb87',
  measurementId: 'G-TCTR9KC4BR',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
