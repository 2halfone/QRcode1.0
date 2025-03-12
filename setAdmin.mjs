import { createRequire } from "module";
const require = createRequire(import.meta.url);

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Inizializza Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();

async function setAdminRole(uid) {
  try {
    await auth.setCustomUserClaims(uid, { admin: true });
    console.log(`✅ L'utente ${uid} ora è un amministratore.`);
  } catch (error) {
    console.error("❌ Errore nel settare l'amministratore:", error);
  }
}

// Sostituisci con l'UID corretto
const userId = "gFlbjXyDGxgt1q1DBQH0xa6Ythx1";
setAdminRole(userId);
