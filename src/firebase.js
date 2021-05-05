// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  import firebase from 'firebase'
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCr98WjOtmGBK9kXuiwB31gDd-RsM3I58g",
    authDomain: "yashsplash-8e181.firebaseapp.com",
    projectId: "yashsplash-8e181",
    storageBucket: "yashsplash-8e181.appspot.com",
    messagingSenderId: "906648405558",
    appId: "1:906648405558:web:d0e4626b3d9d525da97a97",
    measurementId: "G-9CMK3MMY31"
  })
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db, auth,storage , firebase};