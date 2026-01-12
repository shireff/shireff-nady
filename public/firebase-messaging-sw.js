importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB3JVlONP0Ct26T9lmHMnez_Py5tfI606Y",
  authDomain: "portfolio-57433.firebaseapp.com",
  projectId: "portfolio-57433",
  storageBucket: "portfolio-57433.firebasestorage.app",
  messagingSenderId: "20248006402",
  appId: "1:20248006402:web:ea5debc6d90440c1473c1b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/fav/android-icon-192x192.png", // Ensure this exists or use a default
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
