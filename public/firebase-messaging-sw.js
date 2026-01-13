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
    icon: "/fav/android-icon-192x192.png",
    data: {
      url: "https://shireff-nady.vercel.app/"
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked');
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "https://shireff-nady.vercel.app/";

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open with this URL
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
