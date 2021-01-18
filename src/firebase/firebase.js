import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
  apiKey: "AIzaSyDAQtgANL13sJGwONLs3H-BB_aOI3DCIpY",
  authDomain: "react-trello-clone-42c7f.firebaseapp.com",
  projectId: "react-trello-clone-42c7f",
  storageBucket: "react-trello-clone-42c7f.appspot.com",
  messagingSenderId: "652768543378",
  appId: "1:652768543378:web:56a191aca122cf4e495c4b",
  databaseURL:
    "https://react-trello-clone-42c7f-default-rtdb.europe-west1.firebasedatabase.app/",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
