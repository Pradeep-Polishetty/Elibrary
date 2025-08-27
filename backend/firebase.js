const admin = require("firebase-admin");
const serviceAccount = require("./config/e-library-5e0ac-firebase-adminsdk-fbsvc-491ed6f8f0.json");

// ✅ Prevent duplicate initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "e-library-5e0ac.appspot.com",
  });
}

const auth = admin.auth();
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, auth, db, bucket };
