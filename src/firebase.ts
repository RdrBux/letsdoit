import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

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

export const db = getFirestore(app);

export const messaging = getMessaging();
export function obtainToken() {
  getToken(messaging, {
    vapidKey:
      'BIOaiMumkfQq9niOePmpYvuhX5-VvPEVGbsyHQoZjNQIVC0O1zr6QQZr_LMbiBNzVtPf3Wxt1IID9gGDsc5Wqbc',
  })
    .then((currentToken) => {
      if (currentToken) {
        /* console.log('currentToken', currentToken); */
      } else {
        console.log('no token');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}

export function requestPermision() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('granted');
      obtainToken();
    } else {
      console.log('Do not have permission');
    }
  });
}
