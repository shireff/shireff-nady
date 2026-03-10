import { useEffect, useState } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebase";
import { notificationService } from "@/services/notifications";
import type { Messaging } from "firebase/messaging";

const VAPID_KEY = "BGNw1-l--_kGjKU5KM_6J0gXgnTJ71d_8Lrkszy7sUkWbWppAmTCOlMDj39TnesAsEGEDeBgXu2L-zGHRxhcIP4";

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      
      // If permission is already granted, get the token automatically
      if (Notification.permission === "granted" && messaging) {
        console.log("🔔 Permission already granted, getting token...");
        getAndRegisterToken();
      }
    }
  }, []);

  const getAndRegisterToken = async () => {
    if (!messaging) {
      console.error("❌ Messaging not initialized");
      return;
    }

    try {
      console.log("🔑 Getting FCM token...");
      const fcmToken = await getToken(messaging as Messaging, {
        vapidKey: VAPID_KEY,
      });

      console.log("🔑 FCM Token received:", fcmToken ? fcmToken.substring(0, 20) + "..." : "null");

      if (fcmToken) {
        setToken(fcmToken);
        await saveTokenToBackend(fcmToken);
      } else {
        console.error("❌ No FCM token received");
      }
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
    }
  };

  const requestPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.error("❌ Notifications not supported");
      return;
    }

    try {
      console.log("🔔 Requesting notification permission...");
      
      // Register service worker first
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          console.log("✅ Service Worker registered:", registration);
        } catch (swError) {
          console.error("❌ Service Worker registration failed:", swError);
        }
      }

      const status = await Notification.requestPermission();
      console.log("🔔 Permission status:", status);
      setPermission(status);

      if (status === "granted") {
        await getAndRegisterToken();
      }
    } catch (error) {
      console.error("❌ Error requesting notification permission:", error);
    }
  };

  const saveTokenToBackend = async (fcmToken: string) => {
    try {
      const userAgent = window.navigator.userAgent;
      const deviceType = /Mobile|Android|iPhone/i.test(userAgent) ? "mobile" : "desktop";
      const browser = /Chrome/i.test(userAgent) ? "Chrome" : /Firefox/i.test(userAgent) ? "Firefox" : /Safari/i.test(userAgent) ? "Safari" : "unknown";
      const platform = window.navigator.platform;

      console.log("📱 Registering FCM token");
      await notificationService.registerToken({
        token: fcmToken,
        deviceType,
        browser,
        platform,
      });
      console.log("✅ Token registered successfully");
    } catch (error) {
      console.error("❌ Error saving token to backend:", error);
    }
  };

  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging as Messaging, (payload) => {
        console.log("Message received in foreground: ", payload);
        // Handle foreground message (e.g. show a toast)
        if (Notification.permission === "granted") {
           const notification = new Notification(payload.notification?.title || "New Notification", {
             body: payload.notification?.body,
             icon: "/fav/android-icon-192x192.png",
           });
           
           // Open website when notification is clicked
           notification.onclick = () => {
             window.open("https://www.shireff.dev/", "_blank");
             notification.close();
           };
        }
      });
      return () => unsubscribe();
    }
  }, []);

  return { token, permission, requestPermission };
};
