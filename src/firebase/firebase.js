import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyADzK3Y1rSI-tg47CB3_rVg1JyNAyioCQw",
    authDomain: "visual-algorithm.firebaseapp.com",
    databaseURL: "https://visual-algorithm.firebaseio.com",
    projectId: "visual-algorithm",
    storageBucket: "visual-algorithm.appspot.com",
    messagingSenderId: "422609339633",
    appId: "1:422609339633:web:02a19ef7311cdb03ab5550"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();