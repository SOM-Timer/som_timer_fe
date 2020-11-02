export const enableNotifications = () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!')
    return;
  }

  Notification.requestPermission(status => {
    console.log('Notification permission status:', status)
  })
}

export const displayNotification = () => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      const options = {
        body: 'Return to Som Timer to choose your break content',
        icon: '/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 999
        },
        actions: [
          { action: 'close', title: 'Close the notification', icon: '' }
        ]
      }
      reg.showNotification('Focus Interval Complete', options)
    })
  }
}