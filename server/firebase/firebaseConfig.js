const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Firebase 인증 키 JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { db };
