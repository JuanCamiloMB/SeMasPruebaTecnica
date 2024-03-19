const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const config = require("./config");

// Initialize Firebase
const firebaseApp = initializeApp(config.firebaseConfig);
const db = getFirestore(firebaseApp);
module.exports = firebaseApp;
module.exports = db;
