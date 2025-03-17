require("dotenv").config();
const admin = require("firebase-admin");

// console.log(process.env.MY_FIREBASE_SERVICE_ACCOUNT, "serviceAccount");

const serviceAccount = JSON.parse(process.env.MY_FIREBASE_SERVICE_ACCOUNT);

if (!serviceAccount) {
  console.error(
    "MY_FIREBASE_SERVICE_ACCOUNT is not set in the environment or is invalid."
  );
  process.exit(1); // Exit the process if the service account is not set
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET_NAME, // Ensure this matches your Firebase storage bucket
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = { bucket };
