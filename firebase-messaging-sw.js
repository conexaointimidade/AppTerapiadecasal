importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyADaWVvsll3Oqi0zM-RcUByWB8535WC184",
  authDomain: "casamento-em-graca.firebaseapp.com",
  projectId: "casamento-em-graca",
  storageBucket: "casamento-em-graca.firebasestorage.app",
  messagingSenderId: "421639161730",
  appId: "1:421639161730:web:7c01a8365236d5fb5ef19b"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Casamento em Graça', {
    body: body || 'Você tem um lembrete!',
    icon: icon || '/AppTerapiadecasal/icone-192.png',
    badge: '/AppTerapiadecasal/icone-72.png',
    vibrate: [200, 100, 200],
    data: { url: '/AppTerapiadecasal/' }
  });
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || '/AppTerapiadecasal/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(self.location.origin));
      if (existing) { existing.focus(); existing.navigate(url); }
      else { clients.openWindow(url); }
    })
  );
});
