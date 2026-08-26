const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp({ projectId: "natural-shift-jthv3" });
const db = getFirestore(app, "ai-studio-rakhigoyal-c0d2fb01-1792-4024-be3d-83e83cb3ebf9");

async function test() {
  try {
    await db.collection("settings").doc("global").get();
    console.log("Query success");
  } catch (e) {
    console.error("Query failed", e);
  }
}
test();
