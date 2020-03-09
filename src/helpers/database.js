import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB7lqJeGmkO5g9Tc_AamJWR7szGUidjiVg',
  authDomain: 'notifyme-1ea61.firebaseapp.com',
  databaseURL: 'https://notifyme-1ea61.firebaseio.com',
  projectId: 'notifyme-1ea61',
  storageBucket: 'notifyme-1ea61.appspot.com',
  messagingSenderId: '957779434702',
  appId: '1:957779434702:web:99c474eea1e5b777fd849f',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const addItem = (token, date, message) => {
  firebase
    .database()
    .ref('users/')
    .push({
      token,
      performAt: date,
      status: 'scheduled',
      text: message,
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
};
