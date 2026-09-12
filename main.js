import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyCzUeCKkIi-nu3IL0qNN0NsV8uh_GgZPsY",

  authDomain: "mini-game-website-b4fcf.firebaseapp.com",

  databaseURL: "https://mini-game-website-b4fcf-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "mini-game-website-b4fcf",

  storageBucket: "mini-game-website-b4fcf.firebasestorage.app",

  messagingSenderId: "913517522804",

  appId: "1:913517522804:web:6cc6a4124ba2b05cbe0621",

  measurementId: "G-6MECRRKENQ"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);