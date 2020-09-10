import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAS7uVDH446MnmaojebV1qMmEc7NETr_Fc",
  authDomain: "todoapp-82748.firebaseapp.com",
  databaseURL: "https://todoapp-82748.firebaseio.com",
  projectId: "todoapp-82748",
  storageBucket: "todoapp-82748.appspot.com",
  messagingSenderId: "1004592812542",
  appId: "1:1004592812542:web:e37e3496dce876c5a530af",
  measurementId: "G-ELJ0T6ZVDH"
});

const db = firebaseApp.firestore();

export default db;
