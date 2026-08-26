const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp({ projectId: "natural-shift-jthv3" });

try {
  // getFirestore in firebase-admin/firestore doesn't support databaseId directly in all versions.
  // Actually, wait, the Firebase Admin SDK docs say: 
  // const db = getFirestore(app, "databaseId"); 
  const db = getFirestore(app, "ai-studio-rakhigoyal-c0d2fb01-1792-4024-be3d-83e83cb3ebf9");
  console.log("Success with two args!");
} catch (e) {
  console.log("Failed with two args", e.message);
}
