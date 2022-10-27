importScripts(
  'https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyC9-ojC3iNM9JX9lwzlqqdyNzBspVW9NBY',
  authDomain: 'doit-c5071.firebaseapp.com',
  projectId: 'doit-c5071',
  storageBucket: 'doit-c5071.appspot.com',
  messagingSenderId: '796833290246',
  appId: '1:796833290246:web:2c655d6b1d0d29a206cb87',
  measurementId: 'G-TCTR9KC4BR',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log('Recibiste mensaje mientras estabas ausente');
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
