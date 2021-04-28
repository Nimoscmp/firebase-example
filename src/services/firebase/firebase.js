  import firebase from 'firebase/app';
  import 'firebase/firestore'
  import fbConfig from './fbConfig';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: fbConfig.apiKey,
    authDomain: fbConfig.authDomain,
    projectId: fbConfig.projectId,
    storageBucket: fbConfig.storageBucket,
    messagingSenderId: fbConfig.messagingSenderId,
    appId: fbConfig.appId
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const dataBase = fb.firestore();