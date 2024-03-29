/* Here, we'll add custom service worker rules */
if ("function" === typeof importScripts) {
  /* importScripts is part of the WorkerGlobalScope Web API that loads the requested JS file (here, the workbox)*/
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );

  // Global workbox
  if (workbox) {
    console.log("Workbox is loaded");

    /* Once the global workbox is ready for use, custom configurations can be added using workbox.setConfig (such as toggle debug logs depending on environment) */
    // Disable logging
    workbox.setConfig({ debug: false });

    //`generateSW` and `generateSWString` provide the option
    // to force update an exiting service worker.
    // Since we're using `injectManifest` to build SW,
    // manually overriding the skipWaiting();
    /* self is a read-only variable and part of the WorkBoxGlobalScope Web API that may refer to either the global or any specific scope (DedicatedWorkerGlobalScope, ServiceWorkerGlobalScope, etc) */
    self.addEventListener("install", (event) => {
      self.skipWaiting();
      window.location.reload();
    });

    // Manual injection point for manifest files.
    // All assets under build/ and 5MB sizes are precached.
    workbox.precaching.precacheAndRoute([]);

    // Font caching
    workbox.routing.registerRoute(
      new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
      workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 30,
          }),
        ],
      })
    );

    // Image caching
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // JS, CSS caching
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
          }),
        ],
      })
    );

    // Notification event listeners  
    self.addEventListener('notificationclose', event => {
      const notification = event.notification;
      const primaryKey = notification.data.primaryKey;

      console.log('Close notification: ' + primaryKey)
    })

    self.addEventListener('notificationclick', event => {
      const notification = event.notification;
      const action = event.action;

      if (action === 'close') {
        notification.close()
      }
    })

  } else {
    console.error("Workbox could not be loaded. No offline support");
  }
}