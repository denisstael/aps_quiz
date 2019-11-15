import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD87yPDCp_AnOcqzLK5c9fUcBV-jL88Adc",
    authDomain: "aps-quiz.firebaseapp.com",
    databaseURL: "https://aps-quiz.firebaseio.com",
    projectId: "aps-quiz",
    storageBucket: "aps-quiz.appspot.com",
    messagingSenderId: "250155312545",
    appId: "1:250155312545:web:4b9aa03ada1853f05857e0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase