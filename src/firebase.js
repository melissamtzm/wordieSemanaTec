import * as firebase from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDj8ay8gUBeZ_qi7ycKOcfQJNSvvKAGJnM",
    authDomain: "wordie-tc2002s-1.firebaseapp.com",
    projectId: "wordie-tc2002s-1",
    storageBucket: "wordie-tc2002s-1.appspot.com",
    messagingSenderId: "769959249253",
    appId: "1:769959249253:web:4c4f282dec30a1c7b00d8c",
    measurementId: "G-WJSZCY95E1"
  };
  
  firebase.initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const db = getFirestore();
  
  export default {
    login() {
        const auth = getAuth();
        signInWithPopup(auth, provider)
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
        })
    },
    signup(){
      const auth = getAuth();
        signInWithPopup(auth, provider)
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
        })
    },
    logout() {
        const auth = getAuth();
        signOut(auth)
      .then(function() {})
      .catch(function(error) {
        console.log(error)});
    },
    createWord(word,defin,usuario) {
      if (word != "" && defin != "") {
        try {
          const docRef = addDoc(collection(db, "words"), {
            word: word, 
            definition: defin,
            user: usuario

          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      else{
        try {
          const docRef = addDoc(collection(db, "words"), {
            word: word, 
            defin: "",
            user: usuario
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    },
    createUser(name) {
      if (name != "") {
        try {
          const docRef = addDoc(collection(db, "users"), {
            userName: name,
            userStreak: 1
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
}