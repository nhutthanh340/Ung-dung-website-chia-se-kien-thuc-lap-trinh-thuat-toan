// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
// Set the configuration for your app
// TODO: Replace with your project's config object
const config = {
    apiKey: "AIzaSyBShZH0WDjegf2pWYLwbxzO3pdqjWmaP60",
    authDomain: "object-detection-241600.firebaseapp.com",
    databaseURL: "https://object-detection-241600.firebaseio.com",
    projectId: "object-detection-241600",
    storageBucket: "object-detection-241600.appspot.com",
    messagingSenderId: "884720925609",
    appId: "1:884720925609:web:a0c237d4c2a820d9"
};
firebase.initializeApp(config);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage;
// Create a reference to 'mountains.jpg'
const mountainsRef = storageRef.child('../apiKey.json');
/*

const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("../apiKey");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://object-detection-241600.firebaseio.com",
    storageBucket: 'object-detection-241600.appspot.com'
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.storage();
const ref = db.bucket();
const file = ref.file('+.png');
console.log(ref);
*/
