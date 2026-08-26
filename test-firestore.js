const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp({ projectId: "natural-shift-jthv3" });

try {
  const db = getFirestore(app, "ai-studio-rakhigoyal-c0d2fb01-1792-4024-be3d-83e83cb3ebf9");
  console.log("Success with two args");
} catch (e) {
  console.log("Failed with two args", e.message);
  try {
     const { Firestore } = require('@google-cloud/firestore');
     const db2 = new Firestore({
       projectId: 'natural-shift-jthv3',
       databaseId: 'ai-studio-rakhigoyal-c0d2fb01-1792-4024-be3d-83e83cb3ebf9'
     });
     console.log("Success with native Firestore");
  } catch (e2) {
     console.log("Failed with native", e2);
  }
}
