import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB3JVlONP0Ct26T9lmHMnez_Py5tfI606Y",
  authDomain: "portfolio-57433.firebaseapp.com",
  projectId: "portfolio-57433",
  storageBucket: "portfolio-57433.firebasestorage.app",
  messagingSenderId: "20248006402",
  appId: "1:20248006402:web:ea5debc6d90440c1473c1b",
  measurementId: "G-STRCM5HXFD"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  try {
    messaging = getMessaging(app);
    console.log("✅ Firebase Messaging initialized");
  } catch (error) {
    console.error("❌ Error initializing Firebase Messaging:", error);
  }
}

export { app, messaging, getToken, onMessage };
